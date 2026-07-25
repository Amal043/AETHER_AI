from typing import Dict, Any
from backend.models.dataset import DataProfileReport
from backend.models.validation import DataValidationResult


class ReportGenerator:
    """Generates structured JSON quality and validation reports."""

    @staticmethod
    def generate_summary_report(profile: DataProfileReport, validation: DataValidationResult) -> Dict[str, Any]:
        return {
            "platform": "IntelliCommerce Analytics Engine",
            "phase": "Phase 1 Data Foundation",
            "filename": profile.filename,
            "quality_score": profile.quality_score,
            "status": validation.status,
            "summary": profile.summary.model_dump(),
            "columns_count": len(profile.columns),
            "columns": [c.model_dump() for c in profile.columns],
            "validation": validation.model_dump(),
        }
