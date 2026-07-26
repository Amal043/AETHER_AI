import random
import datetime
from sqlalchemy.orm import Session
from backend.config.database import SessionLocal, init_db
from backend.models.schema import (
    Customer,
    Warehouse,
    Product,
    Order,
    OrderItem,
    UserSession,
    Shipment,
    DeliveryEvent,
    MarketingCampaign,
    TrafficSource,
    SystemLog,
)

def seed_database(db: Session):
    # No synthetic mock data seeding - database starts clean and operates strictly on user-uploaded datasets
    log_entry = SystemLog(
        level="INFO",
        message="Database schema initialized. Awaiting user dataset upload via ETL Pipeline.",
        component="SEED_SERVICE",
    )
    db.add(log_entry)
    db.commit()

if __name__ == "__main__":
    init_db()
    db = SessionLocal()
    seed_database(db)
    db.close()
    print("Database initialization and seeding complete.")
