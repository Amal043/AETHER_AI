import datetime
import pandas as pd
import numpy as np
from sqlalchemy.orm import Session
from backend.models.schema import (
    Customer,
    Order,
    OrderItem,
    Product,
    Warehouse,
    Shipment,
    UserSession,
)

class FeatureEngineeringPipeline:
    def __init__(self, db: Session):
        self.db = db

    def extract_customer_features(self) -> pd.DataFrame:
        customers = self.db.query(Customer).filter(Customer.is_deleted == False).all()
        data = []
        now = datetime.datetime.utcnow()

        for c in customers:
            orders = [o for o in c.orders if not o.is_deleted]
            sessions = c.sessions or []

            total_orders = len(orders)
            total_spent = sum(o.total_amount for o in orders) if orders else 0.0
            avg_order_val = total_spent / total_orders if total_orders > 0 else 0.0

            if orders:
                last_order_date = max(o.created_at for o in orders)
                recency_days = (now - last_order_date).days
            else:
                recency_days = 180

            session_count = len(sessions)
            bounces = sum(1 for s in sessions if s.bounce)
            bounce_rate = bounces / session_count if session_count > 0 else 0.0
            cart_additions = sum(1 for s in sessions if s.cart_added)

            # Churn proxy: no order in > 60 days
            is_churned = 1 if recency_days > 60 else 0
            # Purchase proxy: high session activity or recent purchase
            will_purchase = 1 if (session_count > 2 and recency_days <= 30) or total_orders > 3 else 0

            data.append({
                "customer_id": c.id,
                "customer_key": c.customer_key,
                "segment": c.segment,
                "total_orders": total_orders,
                "total_spent": total_spent,
                "avg_order_value": avg_order_val,
                "recency_days": recency_days,
                "session_count": session_count,
                "bounce_rate": bounce_rate,
                "cart_additions": cart_additions,
                "is_churned": is_churned,
                "will_purchase": will_purchase,
                "ltv": total_spent * 1.35 + (session_count * 12.5),
            })

        df = pd.DataFrame(data)
        if df.empty:
            df = pd.DataFrame(columns=[
                "customer_id", "customer_key", "segment", "total_orders",
                "total_spent", "avg_order_value", "recency_days", "session_count",
                "bounce_rate", "cart_additions", "is_churned", "will_purchase", "ltv"
            ])
        return df

    def extract_time_series_features(self) -> pd.DataFrame:
        orders = self.db.query(Order).filter(Order.is_deleted == False).order_by(Order.created_at.asc()).all()
        if not orders:
            return pd.DataFrame()

        records = []
        for o in orders:
            item_count = len(o.items)
            records.append({
                "order_id": o.id,
                "date": o.created_at.date(),
                "total_amount": o.total_amount,
                "discount": o.discount,
                "item_count": item_count,
                "status": o.status,
                "device": o.device,
                "traffic_source": o.traffic_source,
                "is_cancelled": 1 if o.status == "Cancelled" else 0,
            })

        df = pd.DataFrame(records)
        df["date"] = pd.to_datetime(df["date"])
        
        # Group by date for time-series analytics
        daily = df.groupby("date").agg(
            revenue=("total_amount", "sum"),
            order_count=("order_id", "count"),
            avg_discount=("discount", "mean"),
            cancellation_count=("is_cancelled", "sum")
        ).reset_index()

        daily["day_of_week"] = daily["date"].dt.dayofweek
        daily["is_weekend"] = daily["day_of_week"].apply(lambda x: 1 if x >= 5 else 0)
        daily["lag_1_revenue"] = daily["revenue"].shift(1).bfill().fillna(0)
        daily["lag_7_revenue"] = daily["revenue"].shift(7).bfill().fillna(0)
        daily["rolling_7_mean"] = daily["revenue"].rolling(window=7, min_periods=1).mean()

        return daily

    def extract_product_features(self) -> pd.DataFrame:
        products = self.db.query(Product).filter(Product.is_deleted == False).all()
        data = []

        for p in products:
            items = p.order_items or []
            total_units_sold = sum(i.quantity for i in items)
            total_revenue = sum(i.total_price for i in items)
            margin = (p.price - p.cost) / p.price if p.price > 0 else 0.0

            # Stockout risk proxy: stock_qty < 40 or sales velocity > stock_qty
            stockout_risk = 1 if p.stock_qty < 40 or (total_units_sold > p.stock_qty * 0.8) else 0

            data.append({
                "product_id": p.id,
                "product_key": p.product_key,
                "title": p.title,
                "category": p.category,
                "price": p.price,
                "cost": p.cost,
                "margin": margin,
                "stock_qty": p.stock_qty,
                "total_units_sold": total_units_sold,
                "total_revenue": total_revenue,
                "stockout_risk": stockout_risk,
                "return_probability": round(min(0.25, max(0.01, (p.price / 1000.0) * 0.05 + (1.0 - margin) * 0.04)), 4),
            })

        return pd.DataFrame(data)

    def extract_logistics_features(self) -> pd.DataFrame:
        shipments = self.db.query(Shipment).all()
        data = []

        for s in shipments:
            if s.estimated_delivery and s.actual_delivery:
                delay_hours = (s.actual_delivery - s.estimated_delivery).total_seconds() / 3600.0
                is_delayed = 1 if delay_hours > 2.0 else 0
            else:
                delay_hours = 0.0
                is_delayed = 1 if s.status in ["Delayed", "Pending"] else 0

            data.append({
                "shipment_id": s.id,
                "carrier": s.carrier,
                "status": s.status,
                "warehouse_id": s.warehouse_id,
                "delay_hours": max(0.0, delay_hours),
                "is_delayed": is_delayed,
            })

        return pd.DataFrame(data)
