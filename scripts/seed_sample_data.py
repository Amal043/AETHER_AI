"""
Script to generate sample e-commerce & supply chain CSV data for Phase 1 data ingestion testing.
"""
import pandas as pd
import numpy as np
import os

def generate_sample_csv(output_path: str = "artifacts/sample_orders.csv"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    np.random.seed(42)
    n_rows = 500

    order_ids = [f"ORD-{1000 + i}" for i in range(n_rows)]
    customers = [f"CUST-{np.random.randint(100, 999)}" for _ in range(n_rows)]
    categories = np.random.choice(["Electronics", "Apparel", "Home & Kitchen", "Beauty", "Sports"], size=n_rows)
    sales = np.round(np.random.uniform(15.0, 1200.0, size=n_rows), 2)
    quantity = np.random.randint(1, 10, size=n_rows)
    discounts = np.random.choice([0.0, 0.05, 0.10, 0.15, 0.20], size=n_rows)
    dates = pd.date_range(start="2026-01-01", periods=n_rows, freq="h").strftime("%Y-%m-%d %H:%M:%S")
    
    # Introduce some nulls for testing quality profiler
    sales_with_nulls = [s if np.random.rand() > 0.05 else None for s in sales]

    df = pd.DataFrame({
        "order_id": order_ids,
        "customer_id": customers,
        "category": categories,
        "sales_amount": sales_with_nulls,
        "quantity": quantity,
        "discount": discounts,
        "order_date": dates,
    })

    # Introduce duplicate row
    df = pd.concat([df, df.iloc[[0]]], ignore_index=True)
    
    df.to_csv(output_path, index=False)
    print(f"Generated sample CSV dataset at '{output_path}' ({len(df)} rows)")

if __name__ == "__main__":
    generate_sample_csv()
