# Enterprise Architecture Overview - IntelliCommerce Analytics

## Architecture Diagram

```
 +-----------------------------------------------------------------------+
 |                            CLIENT LAYER                               |
 |   Next.js 15 (App Router) + TypeScript + Framer Motion + Tailwind CSS |
 |   - Animated Landing Page                                             |
 |   - Interactive Feature Highlights                                    |
 |   - Real-time Cursor & Glow Motion System                             |
 +----------------------------------+------------------------------------+
                                    |
                                HTTP / REST
                                    |
 +----------------------------------v------------------------------------+
 |                            BACKEND API LAYER                          |
 |   FastAPI Application (Python 3.11)                                   |
 |   - Structured CORS & Logging Middleware                              |
 |   - System /health & /version Monitoring                              |
 |   - Exception Handling Middleware                                     |
 +----------------------------------+------------------------------------+
                                    |
                                    v
 +-----------------------------------------------------------------------+
 |                     DATA PIPELINE FOUNDATION (ETL)                    |
 |   - CSVLoader: Multi-encoding & Delimiter Auto-detection               |
 |   - SchemaDetector: Type Inference & Null Rate Profiling              |
 |   - DataProfiler: Statistical Summaries & Duplication Checker         |
 |   - ReportGenerator: Structured Validation Reporting                  |
 +-----------------------------------------------------------------------+
```

## Clean Architecture & SOLID Principles

1. **Single Responsibility Principle (SRP)**: Each module (`CSVLoader`, `SchemaDetector`, `DataProfiler`, `ReportGenerator`) possesses a single isolated task.
2. **Open/Closed Principle (OCP)**: Schema detection and statistical analysis engines are open for extension via custom data types without modifying core loader code.
3. **Interface Segregation (ISP)**: Pydantic schemas separate ingested dataset representations (`DataProfileReport`) from validation outputs (`DataValidationResult`).
4. **Dependency Inversion (DIP)**: High-level API routes depend on abstract loader/profiler contracts rather than monolithic script procedures.
