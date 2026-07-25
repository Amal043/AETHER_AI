import numpy as np
import pandas as pd
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from backend.models.schema import Order, OrderItem, Product, Customer

class EDAEngine:
    def __init__(self, db: Session):
        self.db = db

    def generate_eda_report(self) -> Dict[str, Any]:
        # Pull Order Items Join DataFrame
        items = (
            self.db.query(
                OrderItem.quantity,
                OrderItem.unit_price,
                OrderItem.total_price,
                Order.discount,
                Order.device,
                Product.category,
                Customer.segment,
            )
            .join(OrderItem.order)
            .join(OrderItem.product)
            .join(Order.customer)
            .all()
        )

        if not items:
            return {"correlation": {}, "outliers": [], "segments": [], "price_histogram": []}

        df = pd.DataFrame(items, columns=["quantity", "unit_price", "total_price", "discount", "device", "category", "segment"])

        # 1. Correlation Matrix
        num_cols = ["quantity", "unit_price", "total_price", "discount"]
        corr_df = df[num_cols].corr().round(3)
        corr_matrix = corr_df.to_dict()

        # 2. Outlier Detection (IQR Method on total_price)
        q1 = df["total_price"].quantile(0.25)
        q3 = df["total_price"].quantile(0.75)
        iqr = q3 - q1
        upper_bound = q3 + 1.5 * iqr

        outliers_df = df[df["total_price"] > upper_bound]
        outliers_summary = [
            {
                "category": row["category"],
                "unit_price": row["unit_price"],
                "total_price": row["total_price"],
                "segment": row["segment"],
            }
            for _, row in outliers_df.head(10).iterrows()
        ]

        # 3. Customer Segment RFM Breakdown
        segment_summary = (
            df.groupby("segment")
            .agg(
                total_sales=("total_price", "sum"),
                avg_order_value=("total_price", "mean"),
                order_count=("total_price", "count"),
            )
            .round(2)
            .reset_index()
            .to_dict(orient="records")
        )

        # 4. Price Distribution Histogram
        counts, bin_edges = np.histogram(df["unit_price"], bins=6)
        histogram = [
            {
                "bin_range": f"${int(bin_edges[i])}-${int(bin_edges[i+1])}",
                "count": int(counts[i]),
            }
            for i in range(len(counts))
        ]

        return {
            "correlation": corr_matrix,
            "outliers_count": len(outliers_df),
            "outliers_sample": outliers_summary,
            "segments": segment_summary,
            "price_histogram": histogram,
        }
