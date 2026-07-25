import pandas as pd
import datetime
from typing import Dict, Any, Tuple
from sqlalchemy.orm import Session
from backend.etl.csv_loader import CSVLoader
from backend.etl.schema_detector import SchemaDetector
from backend.etl.data_profiler import DataProfiler
from backend.models.schema import Customer, Product, Order, OrderItem, Warehouse, SystemLog

class ETLPipelineEngine:
    def __init__(self, db: Session):
        self.db = db

    def process_csv_stream(self, file_content: bytes, filename: str) -> Dict[str, Any]:
        start_time = datetime.datetime.utcnow()
        
        # 1. Load CSV via classmethod
        df, delimiter = CSVLoader.load_from_bytes(file_content, filename)

        # 2. Schema Detection via classmethod
        columns_schema = [col.model_dump() for col in SchemaDetector.analyze_columns(df)]

        # 3. Data Profiling via classmethod
        profile_report = DataProfiler.profile_dataframe(df, filename, len(file_content))

        # 4. Clean & Transform & Bulk Store
        imported_rows, rejected_rows, errors = self._ingest_dataframe(df)

        execution_duration = (datetime.datetime.utcnow() - start_time).total_seconds()

        # 5. System Log Audit
        log_entry = SystemLog(
            level="INFO" if rejected_rows == 0 else "WARNING",
            message=f"ETL Execution '{filename}': {imported_rows} rows imported, {rejected_rows} rejected in {execution_duration:.3f}s.",
            component="ETL_PIPELINE",
        )
        self.db.add(log_entry)
        self.db.commit()

        return {
            "status": "SUCCESS" if errors == 0 else "COMPLETED_WITH_WARNINGS",
            "filename": filename,
            "execution_time_seconds": round(execution_duration, 4),
            "quality_score": profile_report.quality_score,
            "summary": {
                "total_rows": profile_report.summary.total_rows,
                "imported_rows": imported_rows,
                "rejected_rows": rejected_rows,
                "overall_completeness_pct": profile_report.summary.overall_completeness_pct,
                "duplicate_rows_count": profile_report.summary.duplicate_rows_count,
            },
            "columns": columns_schema,
            "log": log_entry.message,
        }

    def _ingest_dataframe(self, df: pd.DataFrame) -> Tuple[int, int, int]:
        imported = 0
        rejected = 0
        errors = 0

        # Get default warehouse
        default_wh = self.db.query(Warehouse).first()
        if not default_wh:
            default_wh = Warehouse(warehouse_key="WH-DEFAULT", name="Main Warehouse", location="Central", capacity=50000)
            self.db.add(default_wh)
            self.db.flush()

        for idx, row in df.iterrows():
            try:
                order_id_raw = str(row.get("order_id", f"ORD-GEN-{idx}")).strip()
                cust_id_raw = str(row.get("customer_id", f"CUST-GEN-{idx}")).strip()
                category_raw = str(row.get("category", "General")).strip()
                sales_amount = float(row.get("sales_amount", 0.0) or 0.0)
                quantity = int(row.get("quantity", 1) or 1)
                
                if sales_amount <= 0:
                    rejected += 1
                    continue

                # Customer Upsert
                customer = self.db.query(Customer).filter_by(customer_key=cust_id_raw).first()
                if not customer:
                    customer = Customer(customer_key=cust_id_raw, name=f"Customer {cust_id_raw}", email=f"{cust_id_raw.lower()}@mail.com")
                    self.db.add(customer)
                    self.db.flush()

                # Product Upsert
                product_key = f"PROD-CAT-{category_raw.upper()}"
                product = self.db.query(Product).filter_by(product_key=product_key).first()
                if not product:
                    product = Product(
                        product_key=product_key,
                        title=f"{category_raw} Standard Item",
                        category=category_raw,
                        price=round(sales_amount / quantity, 2),
                        cost=round((sales_amount / quantity) * 0.6, 2),
                        sku=f"SKU-{category_raw[:3].upper()}-99",
                        warehouse_id=default_wh.id,
                    )
                    self.db.add(product)
                    self.db.flush()

                # Order Upsert
                existing_order = self.db.query(Order).filter_by(order_key=order_id_raw).first()
                if not existing_order:
                    order = Order(
                        order_key=order_id_raw,
                        customer_id=customer.id,
                        total_amount=sales_amount,
                        status="Completed",
                    )
                    self.db.add(order)
                    self.db.flush()

                    db_item = OrderItem(
                        order_id=order.id,
                        product_id=product.id,
                        quantity=quantity,
                        unit_price=round(sales_amount / quantity, 2),
                        total_price=sales_amount,
                    )
                    self.db.add(db_item)

                imported += 1
            except Exception:
                rejected += 1
                errors += 1

        self.db.commit()
        return imported, rejected, errors
