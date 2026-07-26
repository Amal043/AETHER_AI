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

def purge_legacy_seed_data(db: Session):
    try:
        # Check if legacy synthetic orders exist in database
        legacy_orders = db.query(Order).filter(Order.order_key.like("ORD-1%")).all()
        if legacy_orders:
            for o in legacy_orders:
                db.query(OrderItem).filter(OrderItem.order_id == o.id).delete(synchronize_session=False)
                db.query(Shipment).filter(Shipment.order_id == o.id).delete(synchronize_session=False)
                db.delete(o)
            db.query(Customer).filter(Customer.customer_key.like("CUST-5%")).delete(synchronize_session=False)
            db.query(Product).filter(Product.product_key.like("PROD-1%")).delete(synchronize_session=False)
            db.query(Warehouse).filter(Warehouse.warehouse_key.like("WH-%")).delete(synchronize_session=False)
            db.query(UserSession).filter(UserSession.session_key.like("SESS-3%")).delete(synchronize_session=False)
            db.commit()
    except Exception as e:
        db.rollback()

def seed_database(db: Session):
    purge_legacy_seed_data(db)
    log_entry = SystemLog(
        level="INFO",
        message="Database schema initialized cleanly. Operating strictly on user-uploaded datasets.",
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
