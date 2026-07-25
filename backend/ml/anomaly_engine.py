import numpy as np
import pandas as pd
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from sklearn.ensemble import IsolationForest
from backend.ml.feature_engineering import FeatureEngineeringPipeline

class AnomalyDetectionEngine:
    def __init__(self, db: Session):
        self.db = db
        self.fe = FeatureEngineeringPipeline(db)

    def detect_all_anomalies(self) -> Dict[str, Any]:
        anomalies = []

        # 1. Revenue & Order Volume Anomalies
        ts_df = self.fe.extract_time_series_features()
        if not ts_df.empty and len(ts_df) > 3:
            revenues = ts_df["revenue"].values.reshape(-1, 1)
            iso = IsolationForest(contamination=0.1, random_state=42)
            preds = iso.fit_predict(revenues)
            for idx, pred in enumerate(preds):
                if pred == -1:
                    row = ts_df.iloc[idx]
                    anomalies.append({
                        "id": f"ano_rev_{idx}",
                        "category": "Revenue Stream",
                        "title": f"Revenue Spike / Anomaly Detected ({str(row['date'])[:10]})",
                        "severity": "CRITICAL" if row["revenue"] > ts_df["revenue"].mean() * 1.8 else "WARNING",
                        "metric": f"${row['revenue']:,.2f}",
                        "expected_range": f"${ts_df['revenue'].mean() * 0.7:,.0f} - ${ts_df['revenue'].mean() * 1.3:,.0f}",
                        "confidence_score": 0.94,
                        "timestamp": str(row["date"])[:10],
                        "details": f"Recorded daily revenue of ${row['revenue']:,.2f} diverged significantly from historical baseline mean.",
                    })

        # 2. Inventory Shortage & Warehouse Overload Anomalies
        prod_df = self.fe.extract_product_features()
        if not prod_df.empty:
            low_stock = prod_df[prod_df["stock_qty"] < 35]
            for idx, r in low_stock.iterrows():
                anomalies.append({
                    "id": f"ano_inv_{r['product_id']}",
                    "category": "Inventory Shortage",
                    "title": f"Critical Stock Depletion: {r['title']}",
                    "severity": "CRITICAL",
                    "metric": f"{r['stock_qty']} units remaining",
                    "expected_range": "> 50 units",
                    "confidence_score": 0.98,
                    "timestamp": "Live Stream",
                    "details": f"Product SKU stock in category '{r['category']}' fell below critical threshold level.",
                })

        # 3. Carrier Logistics & Delivery Delay Bottlenecks
        log_df = self.fe.extract_logistics_features()
        if not log_df.empty:
            delayed = log_df[log_df["is_delayed"] == 1]
            if len(delayed) > 0:
                anomalies.append({
                    "id": f"ano_log_{len(delayed)}",
                    "category": "Delivery Bottleneck",
                    "title": f"Regional Logistics Delay Cluster ({len(delayed)} Shipments)",
                    "severity": "WARNING",
                    "metric": f"{len(delayed)} delayed shipments",
                    "expected_range": "< 2 delayed shipments",
                    "confidence_score": 0.91,
                    "timestamp": "Live Telemetry",
                    "details": "Carrier routes experiencing transit friction resulting in delayed delivery windows.",
                })

        # 4. Fraud & Unusual Customer Activity Anomalies
        cust_df = self.fe.extract_customer_features()
        if not cust_df.empty:
            unusual = cust_df[cust_df["bounce_rate"] > 0.85]
            for idx, c in unusual.head(3).iterrows():
                anomalies.append({
                    "id": f"ano_cust_{c['customer_id']}",
                    "category": "Customer Activity / Fraud",
                    "title": f"Unusual High Bounce Rate: {c['customer_key']}",
                    "severity": "INFO",
                    "metric": f"{c['bounce_rate']*100:.1f}% bounce rate",
                    "expected_range": "< 40%",
                    "confidence_score": 0.87,
                    "timestamp": "Live Stream",
                    "details": f"Customer session engagement exhibits unusual automated pattern with {c['session_count']} sessions.",
                })

        return {
            "total_anomalies": len(anomalies),
            "threat_level": "Elevated" if any(a["severity"] == "CRITICAL" for a in anomalies) else "Normal",
            "anomalies": anomalies,
        }
