from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class ColumnMetadata(BaseModel):
    name: str
    dtype: str
    inferred_type: str  # numeric, datetime, categorical, boolean, text
    missing_count: int
    missing_percentage: float
    unique_count: int
    sample_values: List[Any] = Field(default_factory=list)


class DataQualitySummary(BaseModel):
    total_rows: int
    total_columns: int
    total_missing_cells: int
    overall_completeness_pct: float
    duplicate_rows_count: int
    duplicate_rows_pct: float
    memory_usage_bytes: int
    memory_usage_mb: float


class DataProfileReport(BaseModel):
    filename: str
    file_size_bytes: int
    ingested_at: datetime = Field(default_factory=datetime.now)
    summary: DataQualitySummary
    columns: List[ColumnMetadata]
    numeric_stats: Dict[str, Dict[str, Optional[float]]] = Field(default_factory=dict)
    categorical_distribution: Dict[str, Dict[str, int]] = Field(default_factory=dict)
    quality_score: float  # 0.0 to 100.0 score based on completeness & duplicates
