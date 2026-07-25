import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.config.database import Base
from backend.etl.pipeline import ETLPipelineEngine

@pytest.fixture
def db_session():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    yield session
    session.close()

def test_etl_csv_stream_processing(db_session):
    csv_bytes = (
        b"order_id,customer_id,category,sales_amount,quantity\n"
        b"ORD-101,CUST-201,Electronics,299.99,1\n"
        b"ORD-102,CUST-202,Apparel,49.50,2\n"
        b"ORD-103,CUST-203,Beauty,-10.00,1\n"  # Rejected negative sale
    )

    pipeline = ETLPipelineEngine(db_session)
    report = pipeline.process_csv_stream(csv_bytes, "sample_orders.csv")

    assert report["status"] in ["SUCCESS", "COMPLETED_WITH_WARNINGS"]
    assert report["summary"]["total_rows"] == 3
    assert report["summary"]["imported_rows"] == 2
    assert report["summary"]["rejected_rows"] == 1
