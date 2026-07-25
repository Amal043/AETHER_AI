import pandas as pd
import numpy as np
from datetime import datetime
from typing import Dict, Any
from backend.models.dataset import DataProfileReport, DataQualitySummary
from backend.models.validation import DataValidationResult, ValidationIssue
from backend.etl.schema_detector import SchemaDetector
from backend.utils.logger import get_logger

logger = get_logger("data_profiler")


class DataProfiler:
    """Profiles ingested DataFrame, calculates quality score and statistics."""

    @classmethod
    def profile_dataframe(cls, df: pd.DataFrame, filename: str, file_size_bytes: int) -> DataProfileReport:
        total_rows = len(df)
        total_columns = len(df.columns)

        if total_rows == 0 or total_columns == 0:
            summary = DataQualitySummary(
                total_rows=total_rows,
                total_columns=total_columns,
                total_missing_cells=0,
                overall_completeness_pct=0.0,
                duplicate_rows_count=0,
                duplicate_rows_pct=0.0,
                memory_usage_bytes=0,
                memory_usage_mb=0.0,
            )
            return DataProfileReport(
                filename=filename,
                file_size_bytes=file_size_bytes,
                summary=summary,
                columns=[],
                quality_score=0.0,
            )

        # Missing cells analysis
        missing_cells = int(df.isna().sum().sum())
        total_cells = total_rows * total_columns
        completeness_pct = round(((total_cells - missing_cells) / total_cells) * 100, 2)

        # Duplicate row analysis
        duplicate_rows = int(df.duplicated().sum())
        duplicate_pct = round((duplicate_rows / total_rows) * 100, 2)

        # Memory usage
        mem_bytes = int(df.memory_usage(deep=True).sum())
        mem_mb = round(mem_bytes / (1024 * 1024), 2)

        summary = DataQualitySummary(
            total_rows=total_rows,
            total_columns=total_columns,
            total_missing_cells=missing_cells,
            overall_completeness_pct=completeness_pct,
            duplicate_rows_count=duplicate_rows,
            duplicate_rows_pct=duplicate_pct,
            memory_usage_bytes=mem_bytes,
            memory_usage_mb=mem_mb,
        )

        columns_meta = SchemaDetector.analyze_columns(df)

        # Numerical statistics
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        numeric_stats: Dict[str, Dict[str, Any]] = {}
        for col in numeric_cols:
            s = df[col].dropna()
            if not s.empty:
                numeric_stats[str(col)] = {
                    "mean": float(s.mean()),
                    "std": float(s.std()) if len(s) > 1 else 0.0,
                    "min": float(s.min()),
                    "max": float(s.max()),
                    "median": float(s.median()),
                    "q25": float(s.quantile(0.25)),
                    "q75": float(s.quantile(0.75)),
                }

        # Categorical top distribution
        cat_cols = [c.name for c in columns_meta if c.inferred_type == "categorical"]
        categorical_distribution: Dict[str, Dict[str, int]] = {}
        for col in cat_cols[:10]:  # Limit to top 10 categorical columns
            top_counts = df[col].astype(str).value_counts().head(5).to_dict()
            categorical_distribution[str(col)] = {str(k): int(v) for k, v in top_counts.items()}

        # Quality score calculation (0 to 100)
        # Deduct points for missingness & duplicate rows
        missing_penalty = (100.0 - completeness_pct) * 0.5
        duplicate_penalty = duplicate_pct * 0.5
        quality_score = max(0.0, round(100.0 - missing_penalty - duplicate_penalty, 1))

        return DataProfileReport(
            filename=filename,
            file_size_bytes=file_size_bytes,
            summary=summary,
            columns=columns_meta,
            numeric_stats=numeric_stats,
            categorical_distribution=categorical_distribution,
            quality_score=quality_score,
        )

    @classmethod
    def validate_dataframe(cls, profile: DataProfileReport) -> DataValidationResult:
        issues: list[ValidationIssue] = []
        recommendations: list[str] = []

        # Missing values check
        for col in profile.columns:
            if col.missing_percentage > 20.0:
                issues.append(
                    ValidationIssue(
                        issue_type="high_missing_rate",
                        severity="error" if col.missing_percentage > 50.0 else "warning",
                        column_name=col.name,
                        description=f"Column '{col.name}' has {col.missing_percentage}% missing values.",
                        affected_rows=col.missing_count,
                    )
                )
                recommendations.append(f"Impute or handle missing values in column '{col.name}'.")

        # Duplicate rows check
        if profile.summary.duplicate_rows_count > 0:
            issues.append(
                ValidationIssue(
                    issue_type="duplicate_rows",
                    severity="warning",
                    description=f"Dataset contains {profile.summary.duplicate_rows_count} ({profile.summary.duplicate_rows_pct}%) duplicate rows.",
                    affected_rows=profile.summary.duplicate_rows_count,
                )
            )
            recommendations.append("Deduplicate identical rows to prevent biased analytics.")

        if not issues:
            status = "PASSED"
            is_valid = True
        elif any(i.severity == "error" for i in issues):
            status = "FAILED"
            is_valid = False
        else:
            status = "PASSED_WITH_WARNINGS"
            is_valid = True

        return DataValidationResult(
            is_valid=is_valid,
            status=status,
            issue_count=len(issues),
            issues=issues,
            recommendations=recommendations,
        )
