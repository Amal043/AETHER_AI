from typing import List, Optional
from pydantic import BaseModel, Field


class ValidationIssue(BaseModel):
    issue_type: str  # e.g., missing_values, duplicate_rows, invalid_type, high_cardinality
    severity: str  # warning, error, info
    column_name: Optional[str] = None
    description: str
    affected_rows: int = 0


class DataValidationResult(BaseModel):
    is_valid: bool
    status: str  # PASSED, PASSED_WITH_WARNINGS, FAILED
    issue_count: int
    issues: List[ValidationIssue] = Field(default_factory=list)
    recommendations: List[str] = Field(default_factory=list)
