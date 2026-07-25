import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.config.database import Base
from backend.models.schema import Customer, Product, Order, OrderItem, Warehouse

@pytest.fixture
def db_session():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    yield session
    session.close()

def test_create_customer_and_order(db_session):
    cust = Customer(customer_key="CUST-TEST-1", name="Test Alice", email="alice@test.com")
    db_session.add(cust)
    db_session.commit()

    order = Order(order_key="ORD-TEST-1", customer_id=cust.id, total_amount=199.99, status="Completed")
    db_session.add(order)
    db_session.commit()

    saved_cust = db_session.query(Customer).filter_by(customer_key="CUST-TEST-1").first()
    assert saved_cust is not None
    assert len(saved_cust.orders) == 1
    assert saved_cust.orders[0].total_amount == 199.99
