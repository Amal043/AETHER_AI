# AETHER AI — Commerce Intelligence & Logistics Command Center

> **AI-Powered E-Commerce Funnel & Supply Chain Intelligence Platform**  
> *Phase 1, 2, and 3 Enterprise Foundation, Telemetry Engine & Machine Learning Decision Platform*

---

## Executive Summary

**AETHER AI** is an enterprise-grade decision platform engineered to process high-throughput e-commerce transactional data, profile supply chain metrics, assess data quality, and execute automated machine learning inference across 10 production models.

### Phase 3 Deliverables (Completed)
- **Reusable ML Pipeline Framework** (`backend/ml/pipeline.py`):
  - Preprocessing, feature engineering, standard scaling, train/test splitting, cross-validation, hyperparameter tuning, model persistence (`joblib`), and version control.
- **10 Production Machine Learning Models** (`backend/ml/models_engine.py`):
  1. *Customer Purchase Likelihood Predictor* (Random Forest Classifier)
  2. *Customer Churn Risk Classifier* (Gradient Boosting Classifier)
  3. *Product Demand Spike Forecaster* (Random Forest Regressor)
  4. *Gross Revenue Trajectory Forecaster* (Ridge Regression)
  5. *Warehouse Stock Depletion Forecaster* (Extra Trees Regressor)
  6. *Carrier Shipping Delay Predictor* (Random Forest Classifier)
  7. *Order Cancellation Risk Engine* (Logistic Regression)
  8. *Distribution Node Capacity Forecaster* (Ridge Regression)
  9. *Customer Lifetime Value (LTV) Estimator* (Random Forest Regressor)
  10. *Product Return Probability Classifier* (Gradient Boosting Classifier)
- **Model Evaluation Suite**: Automated metric generation for Accuracy, Precision, Recall, F1 Score, ROC Curves, Confusion Matrices, MAE, MSE, RMSE, R² Score, and Feature Importance rankings.
- **Anomaly Detection Matrix** (`backend/ml/anomaly_engine.py`): Isolation Forest & statistical Z-Score detector tracking Revenue Anomalies, Traffic Spikes, Inventory Shortages, Delivery Bottlenecks, and Fraud Patterns.
- **Multi-Horizon Forecasting Engine** (`backend/ml/forecasting_engine.py`): Interactive 7-day, 30-day, 90-day, and 365-day projections across Revenue, Orders, Inventory, Demand, Warehouse Capacity, and Delivery Volume.
- **Customer Behavioral Segmentation Engine** (`backend/ml/segmentation_engine.py`): K-Means behavioral clustering (RFM + engagement metrics) categorizing accounts into *High Value, Loyal, At Risk, New, Price Sensitive*.
- **Prescriptive Recommendation Engine** (`backend/ml/recommendation_engine.py`): Dynamic data-driven business recommendations (inventory reallocation, churn retargeting, markdown optimization, route shifts).
- **Executive AI Insights Synthesizer** (`backend/ai/insights_engine.py`): Natural language executive briefing generator summarizing multi-source telemetry.
- **8 New Futuristic Command-Center Pages**:
  - `/ai-insights` — AI Executive Insights & Briefings
  - `/ml-models` — Machine Learning Model Registry Directory
  - `/forecast` — Multi-Horizon Forecast Command Hub (7/30/90/365 Days)
  - `/segmentation` — Customer Behavioral Clusters & RFM Projection
  - `/anomalies` — Pipeline Threat & Anomaly Matrix
  - `/recommendations` — AI Action Recommendation Console
  - `/model-performance` — Evaluation Suite (ROC, Confusion Matrix, Feature Importance)
  - `/prediction-center` — Real-Time Inference Vector Sandbox
- **Automated Pipeline Retraining**: CSV uploads automatically trigger ETL, database update, model retraining, anomaly scan, forecast recalculation, and executive insight refresh.


---

## Tech Stack Overview

| Layer | Technologies |
| :--- | :--- |
| **Frontend Core** | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS |
| **Motion & FX** | Framer Motion, GSAP, Custom Glassmorphism, Cursor Glow |
| **Backend Core** | Python 3.11, FastAPI, Pydantic v2, uvicorn |
| **ETL & Data Engine** | Pandas, NumPy, SQLAlchemy 2.0 (PostgreSQL Configuration) |
| **Testing** | Pytest, HTTPX, ESLint |
| **DevOps** | Docker, Docker Compose, GitHub Actions |

---

## Directory Breakdown

```
DA1/
├── frontend/             # Next.js 15 App Router Frontend
│   ├── src/
│   │   ├── app/          # App Router Pages & Layout
│   │   ├── components/   # UI Library & Landing Sections
│   │   ├── hooks/        # Mouse & Scroll Position Hooks
│   │   ├── lib/          # API Client & Utility Functions
│   │   ├── animations/   # Motion & GSAP Animation Variants
│   │   └── styles/       # Global CSS & Tailwind Setup
│   ├── package.json
│   └── tsconfig.json
├── backend/              # FastAPI Analytics Engine
│   ├── config/           # Pydantic Settings & Logging Config
│   ├── etl/              # CSV Loader, Schema Detector, Profiler
│   ├── models/           # Pydantic Data & Validation Schemas
│   ├── reports/          # Report Generator
│   ├── utils/            # Custom Logger & Error Handlers
│   ├── tests/            # Pytest Unit Test Suite
│   ├── main.py           # FastAPI Entrypoint
│   ├── requirements.txt  # Python Dependencies
│   └── pytest.ini        # Pytest Configuration
├── docs/                 # System Architecture & Setup Guides
│   ├── architecture.md
│   ├── installation.md
│   ├── development.md
│   ├── contributing.md
│   └── setup.md
├── docker/               # Docker & Container Infrastructure
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
├── .github/workflows/    # CI/CD Workflows
├── scripts/              # Data Seeding Utility
└── config/               # Environment Templates
```

---

## Quick Start Guide

### 1. Backend Startup
```bash
cd backend
python -m venv venv
# Activate virtual environment
# On Windows: venv\Scripts\activate | On Linux/macOS: source venv/bin/activate
pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000
```
Backend API will run at `http://localhost:8000` (Swagger UI at `/docs`).

### 2. Frontend Startup
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```
Frontend will run at `http://localhost:3000`.

### 3. Running Backend Unit Tests
```bash
cd backend
pytest
```

---

## Phase 1 Verification Checklist
- [x] Next.js 15 App Router + TypeScript compilation cleanly passes.
- [x] All 11 landing page sections rendered with smooth Framer Motion & glassmorphism visuals.
- [x] FastAPI `/health` and `/version` endpoints respond with status 200.
- [x] CSV Ingestion Pipeline parses datasets, infers column schemas, and profiles quality.
- [x] Pytest suite passes all backend unit tests.
- [x] Docker compose infrastructure ready.
