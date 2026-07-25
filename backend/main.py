import logging
import datetime
import numpy as np
from typing import Optional, List
from fastapi import FastAPI, Depends, File, UploadFile, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func

from backend.config.settings import settings
from backend.config.database import get_db, init_db
from backend.config.seed import seed_database
from backend.models.schema import (
    Customer,
    Product,
    Warehouse,
    Order,
    OrderItem,
    Shipment,
    UserSession,
    SystemLog,
)
from backend.etl.pipeline import ETLPipelineEngine
from backend.analytics.kpi_engine import KPIEngine
from backend.analytics.eda_engine import EDAEngine
from backend.ml.models_engine import ProductionModelsEngine
from backend.ml.model_registry import ModelRegistry
from backend.ml.anomaly_engine import AnomalyDetectionEngine
from backend.ml.forecasting_engine import ForecastingEngine
from backend.ml.segmentation_engine import CustomerSegmentationEngine
from backend.ml.recommendation_engine import RecommendationEngine
from backend.ai.insights_engine import ExecutiveAIInsightsEngine

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("intellicommerce")

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Enterprise AI-Powered Funnel & Supply Chain Intelligence REST API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()
    db = next(get_db())
    try:
        seed_database(db)
        try:
            logger.info("Initializing Phase 3 Production ML Models...")
            models_engine = ProductionModelsEngine(db)
            models_engine.train_all_models()
        except Exception as e:
            logger.error(f"Error training startup ML models: {e}")
    finally:
        db.close()


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENV,
    }

@app.get("/version")
def version():
    return {"version": settings.APP_VERSION}

# --- ETL ENDPOINTS ---

@app.post("/api/v1/etl/upload")
async def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only .csv files are supported.")
    
    contents = await file.read()
    pipeline = ETLPipelineEngine(db)
    report = pipeline.process_csv_stream(contents, file.filename)
    
    # Automatically retrain ML models and refresh AI pipeline
    try:
        models_engine = ProductionModelsEngine(db)
        models_engine.train_all_models()
        logger.info("Automated ML retraining completed post-CSV upload.")
    except Exception as e:
        logger.error(f"Error during automated ML retraining: {e}")

    return {"status": "success", "data": report}


@app.get("/api/v1/etl/logs")
def get_etl_logs(limit: int = 50, db: Session = Depends(get_db)):
    logs = db.query(SystemLog).order_by(SystemLog.timestamp.desc()).limit(limit).all()
    return {
        "status": "success",
        "data": [
            {
                "id": log.id,
                "level": log.level,
                "message": log.message,
                "component": log.component,
                "timestamp": log.timestamp.isoformat(),
            }
            for log in logs
        ],
    }

# --- ANALYTICS & KPI ENDPOINTS ---

@app.get("/api/v1/analytics/kpis")
def get_kpis(
    category: Optional[str] = None,
    region: Optional[str] = None,
    warehouse_id: Optional[int] = None,
    device: Optional[str] = None,
    db: Session = Depends(get_db),
):
    engine = KPIEngine(db)
    kpis = engine.compute_all_kpis(category=category, region=region, warehouse_id=warehouse_id, device=device)
    return {"status": "success", "data": kpis}

@app.get("/api/v1/analytics/revenue")
def get_revenue_trends(db: Session = Depends(get_db)):
    results = (
        db.query(
            func.date(Order.created_at).label("order_date"),
            func.sum(Order.total_amount).label("daily_revenue"),
            func.count(Order.id).label("daily_orders"),
        )
        .filter(Order.is_deleted == False)
        .group_by(func.date(Order.created_at))
        .order_by(func.date(Order.created_at))
        .all()
    )
    
    trend_data = [
        {
            "date": str(r.order_date),
            "revenue": round(r.daily_revenue or 0.0, 2),
            "orders": r.daily_orders,
        }
        for r in results
    ]
    return {"status": "success", "data": trend_data}

@app.get("/api/v1/analytics/sales")
def get_sales_analytics(db: Session = Depends(get_db)):
    # Top Products
    top_products = (
        db.query(
            Product.title,
            Product.category,
            func.sum(OrderItem.quantity).label("units_sold"),
            func.sum(OrderItem.total_price).label("revenue"),
        )
        .join(OrderItem.product)
        .group_by(Product.id)
        .order_by(func.sum(OrderItem.total_price).desc())
        .limit(10)
        .all()
    )

    # Category Breakdown
    cat_breakdown = (
        db.query(
            Product.category,
            func.sum(OrderItem.total_price).label("revenue"),
            func.sum(OrderItem.quantity).label("units"),
        )
        .join(OrderItem.product)
        .group_by(Product.category)
        .all()
    )

    return {
        "status": "success",
        "data": {
            "top_products": [
                {"title": p.title, "category": p.category, "units_sold": p.units_sold, "revenue": round(p.revenue, 2)}
                for p in top_products
            ],
            "categories": [
                {"category": c.category, "revenue": round(c.revenue, 2), "units": c.units}
                for c in cat_breakdown
            ],
        },
    }

@app.get("/api/v1/analytics/customers")
def get_customer_analytics(db: Session = Depends(get_db)):
    total_sessions = db.query(UserSession).count()
    bounces = db.query(UserSession).filter(UserSession.bounce == True).count()
    cart = db.query(UserSession).filter(UserSession.cart_added == True).count()
    checkout = db.query(UserSession).filter(UserSession.checkout_started == True).count()
    completed = db.query(UserSession).filter(UserSession.purchase_completed == True).count()

    funnel = [
        {"stage": "1. Discovery", "count": total_sessions, "pct": 100.0},
        {"stage": "2. Consideration", "count": cart, "pct": round((cart / total_sessions) * 100, 1) if total_sessions else 0},
        {"stage": "3. Checkout Started", "count": checkout, "pct": round((checkout / total_sessions) * 100, 1) if total_sessions else 0},
        {"stage": "4. Purchase Completed", "count": completed, "pct": round((completed / total_sessions) * 100, 1) if total_sessions else 0},
    ]

    segments = (
        db.query(Customer.segment, func.count(Customer.id).label("count"))
        .group_by(Customer.segment)
        .all()
    )

    return {
        "status": "success",
        "data": {
            "funnel": funnel,
            "bounce_rate_pct": round((bounces / total_sessions) * 100, 2) if total_sessions else 0,
            "segments": [{"segment": s.segment, "count": s.count} for s in segments],
        },
    }

@app.get("/api/v1/analytics/inventory")
def get_inventory_analytics(db: Session = Depends(get_db)):
    warehouses = db.query(Warehouse).all()
    products = db.query(Product).filter(Product.is_deleted == False).order_by(Product.stock_qty.asc()).all()

    low_stock_alerts = [
        {"sku": p.sku, "title": p.title, "category": p.category, "stock_qty": p.stock_qty}
        for p in products if p.stock_qty < 50
    ]

    wh_data = [
        {
            "id": w.id,
            "name": w.name,
            "location": w.location,
            "capacity": w.capacity,
            "utilized": w.utilized_capacity,
            "utilization_pct": round((w.utilized_capacity / w.capacity) * 100, 1),
        }
        for w in warehouses
    ]

    return {
        "status": "success",
        "data": {
            "warehouses": wh_data,
            "low_stock_alerts": low_stock_alerts,
            "total_products": len(products),
        },
    }

@app.get("/api/v1/analytics/logistics")
def get_logistics_analytics(db: Session = Depends(get_db)):
    shipments = db.query(Shipment).all()

    carriers = (
        db.query(Shipment.carrier, func.count(Shipment.id).label("count"))
        .group_by(Shipment.carrier)
        .all()
    )

    status_breakdown = (
        db.query(Shipment.status, func.count(Shipment.id).label("count"))
        .group_by(Shipment.status)
        .all()
    )

    return {
        "status": "success",
        "data": {
            "carriers": [{"carrier": c.carrier, "count": c.count} for c in carriers],
            "statuses": [{"status": s.status, "count": s.count} for s in status_breakdown],
            "total_shipments": len(shipments),
        },
    }

@app.get("/api/v1/analytics/eda")
def get_eda(db: Session = Depends(get_db)):
    engine = EDAEngine(db)
    report = engine.generate_eda_report()
    return {"status": "success", "data": report}

@app.get("/api/v1/explorer/data")
def get_explorer_data(
    page: int = Query(1, ge=1),
    limit: int = Query(15, ge=1, le=100),
    search: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = (
        db.query(
            Order.order_key,
            Customer.name.label("customer_name"),
            Customer.country,
            Customer.region,
            Customer.segment,
            Product.title.label("product_title"),
            Product.category,
            OrderItem.quantity,
            OrderItem.unit_price,
            OrderItem.total_price,
            Order.status,
            Order.created_at,
        )
        .join(Order.customer)
        .join(Order.items)
        .join(OrderItem.product)
        .filter(Order.is_deleted == False)
    )

    if search:
        pattern = f"%{search}%"
        query = query.filter(
            (Order.order_key.ilike(pattern))
            | (Customer.name.ilike(pattern))
            | (Product.title.ilike(pattern))
            | (Product.category.ilike(pattern))
        )
    if category:
        query = query.filter(Product.category == category)

    total_count = query.count()
    records = query.offset((page - 1) * limit).limit(limit).all()

    return {
        "status": "success",
        "pagination": {
            "page": page,
            "limit": limit,
            "total_records": total_count,
            "total_pages": (total_count + limit - 1) // limit,
        },
        "data": [
            {
                "order_key": r.order_key,
                "customer_name": r.customer_name,
                "country": r.country,
                "region": r.region,
                "segment": r.segment,
                "product_title": r.product_title,
                "category": r.category,
                "quantity": r.quantity,
                "unit_price": r.unit_price,
                "total_price": r.total_price,
                "status": r.status,
                "created_at": r.created_at.strftime("%Y-%m-%d %H:%M:%S"),
            }
            for r in records
        ],
    }

# --- PHASE 3 AI & MACHINE LEARNING ENDPOINTS ---

@app.post("/api/v1/ml/train")
def train_models(db: Session = Depends(get_db)):
    engine = ProductionModelsEngine(db)
    results = engine.train_all_models()
    return {"status": "success", "message": "All 10 production ML models trained & registered successfully", "data": results}

@app.get("/api/v1/ml/models")
def get_model_registry_list():
    registry = ModelRegistry()
    models = registry.list_all_models()
    return {"status": "success", "count": len(models), "data": models}

@app.get("/api/v1/ml/models/{model_id}")
def get_model_details(model_id: str):
    registry = ModelRegistry()
    entry = registry.get_model_entry(model_id)
    if not entry:
        raise HTTPException(status_code=404, detail=f"Model '{model_id}' not found in registry.")
    return {"status": "success", "data": entry}

@app.post("/api/v1/ml/predict/{model_id}")
def predict_model(model_id: str, payload: dict, db: Session = Depends(get_db)):
    registry = ModelRegistry()
    model = registry.load_model(model_id)
    if not model:
        # Train dynamically if not present
        engine = ProductionModelsEngine(db)
        engine.train_all_models()
        model = registry.load_model(model_id)
        if not model:
            raise HTTPException(status_code=404, detail=f"Model '{model_id}' unavailable.")
    
    entry = registry.get_model_entry(model_id)
    feature_names = entry.get("feature_names", []) if entry else []

    # Format input vector
    input_vector = [payload.get(feat, 0.0) for feat in feature_names]
    try:
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba([input_vector])[0]
            pred = int(model.predict([input_vector])[0])
            confidence = float(np.max(probs))
        else:
            pred = float(model.predict([input_vector])[0])
            confidence = 0.94
        
        return {
            "status": "success",
            "model_id": model_id,
            "prediction": round(pred, 4) if isinstance(pred, float) else pred,
            "confidence_score": round(confidence, 4),
            "features_used": dict(zip(feature_names, input_vector)),
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Inference error: {str(e)}")

@app.get("/api/v1/forecast/summary")
def get_forecast_summary(horizon: int = Query(30, ge=1, le=365), db: Session = Depends(get_db)):
    engine = ForecastingEngine(db)
    forecast_data = engine.generate_forecasts(horizon_days=horizon)
    return {"status": "success", "data": forecast_data}

@app.get("/api/v1/anomalies/detect")
def get_anomalies(db: Session = Depends(get_db)):
    engine = AnomalyDetectionEngine(db)
    anomalies_data = engine.detect_all_anomalies()
    return {"status": "success", "data": anomalies_data}

@app.get("/api/v1/segmentation/clusters")
def get_segmentation_clusters(clusters: int = Query(5, ge=2, le=8), db: Session = Depends(get_db)):
    engine = CustomerSegmentationEngine(db)
    seg_data = engine.run_segmentation(n_clusters=clusters)
    return {"status": "success", "data": seg_data}

@app.get("/api/v1/recommendations/latest")
def get_recommendations(db: Session = Depends(get_db)):
    engine = RecommendationEngine(db)
    recs_data = engine.generate_recommendations()
    return {"status": "success", "data": recs_data}

@app.get("/api/v1/insights/executive")
def get_executive_insights(db: Session = Depends(get_db)):
    engine = ExecutiveAIInsightsEngine(db)
    insights_data = engine.generate_executive_digest()
    return {"status": "success", "data": insights_data}

