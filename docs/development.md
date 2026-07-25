# Development & Testing Guide

## Running Tests

### Backend Unit Tests
```bash
cd backend
pytest
```

### Frontend Type Checking & Linting
```bash
cd frontend
npm run lint
npm run build
```

## Seed Sample Data
To generate a mock e-commerce order dataset for testing the pipeline ingestion endpoints:
```bash
python scripts/seed_sample_data.py
```
This generates `artifacts/sample_orders.csv`.
