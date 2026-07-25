# Installation Guide

## Prerequisites

- Node.js >= 20.x
- Python >= 3.11
- npm >= 10.x
- Docker & Docker Compose (optional for containerized runtime)

## Local Development Setup

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will be accessible at `http://localhost:3000`.

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000
```
Backend API will be accessible at `http://localhost:8000` with Swagger docs at `http://localhost:8000/docs`.

### 3. Docker Containerized Run
```bash
cd docker
docker-compose up --build
```
