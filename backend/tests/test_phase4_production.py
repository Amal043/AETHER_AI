import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"

def test_version_endpoint():
    response = client.get("/version")
    assert response.status_code == 200
    assert "version" in response.json()

def test_get_ml_models_registry():
    response = client.get("/api/v1/ml/models")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["count"] >= 10

def test_ml_predict_endpoint():
    payload = {
        "total_orders": 5,
        "total_spent": 450.0,
        "recency_days": 12,
        "session_count": 14,
        "bounce_rate": 0.2
    }
    response = client.post("/api/v1/ml/predict/customer_purchase", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "prediction" in data
    assert "confidence_score" in data

def test_forecast_summary_endpoint():
    response = client.get("/api/v1/forecast/summary?horizon=30")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["data"]["horizon_days"] == 30

def test_anomalies_detect_endpoint():
    response = client.get("/api/v1/anomalies/detect")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "anomalies" in data["data"]

def test_segmentation_clusters_endpoint():
    response = client.get("/api/v1/segmentation/clusters?clusters=5")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["data"]["n_clusters"] == 5

def test_recommendations_endpoint():
    response = client.get("/api/v1/recommendations/latest")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "recommendations" in data["data"]

def test_executive_insights_endpoint():
    response = client.get("/api/v1/insights/executive")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "narrative_summary" in data["data"]
