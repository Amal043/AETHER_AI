import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.config.database import Base
from backend.config.seed import seed_database
from backend.analytics.kpi_engine import KPIEngine
from backend.analytics.eda_engine import EDAEngine

@pytest.fixture
def db_session():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    seed_database(session)
    yield session
    session.close()

def test_kpi_computation(db_session):
    engine = KPIEngine(db_session)
    kpis = engine.compute_all_kpis()

    assert "financial" in kpis
    assert kpis["financial"]["total_revenue"] > 0
    assert kpis["financial"]["total_orders"] == 150
    assert kpis["conversion"]["total_sessions"] >= 290

def test_eda_report_generation(db_session):
    eda_engine = EDAEngine(db_session)
    report = eda_engine.generate_eda_report()

    assert "correlation" in report
    assert "segments" in report
    assert "price_histogram" in report
