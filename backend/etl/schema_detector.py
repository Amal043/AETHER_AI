import pandas as pd
from typing import Dict, Any, List
from backend.models.dataset import ColumnMetadata
from backend.utils.logger import get_logger

logger = get_logger("schema_detector")


class SchemaDetector:
    """Detects and infers data types, missing statistics, and column features."""

    @staticmethod
    def infer_column_type(series: pd.Series) -> str:
        """Infer granular column type (numeric, datetime, boolean, categorical, text)."""
        non_null = series.dropna()
        if non_null.empty:
            return "unknown"

        if pd.api.types.is_numeric_dtype(series):
            return "numeric"
        
        if pd.api.types.is_bool_dtype(series):
            return "boolean"

        if pd.api.types.is_datetime64_any_dtype(series):
            return "datetime"

        # Try parsing strings as datetime
        if series.dtype == "object":
            sample = non_null.astype(str).head(50)
            try:
                pd.to_datetime(sample, errors="raise", format="mixed")
                return "datetime"
            except Exception:
                pass

            # Check if boolean strings
            unique_lower = set(sample.str.lower().unique())
            if unique_lower.issubset({"true", "false", "yes", "no", "0", "1", "t", "f"}):
                return "boolean"

            # Check ratio of unique items for categorical vs text
            unique_ratio = len(non_null.unique()) / len(non_null)
            if unique_ratio < 0.2 or len(non_null.unique()) <= 50:
                return "categorical"

            return "text"

        return str(series.dtype)

    @classmethod
    def analyze_columns(cls, df: pd.DataFrame) -> List[ColumnMetadata]:
        """Analyzes all columns in a pandas DataFrame and returns ColumnMetadata list."""
        columns_meta: List[ColumnMetadata] = []
        total_rows = len(df)

        for col in df.columns:
            series = df[col]
            missing_count = int(series.isna().sum())
            missing_pct = round((missing_count / total_rows) * 100, 2) if total_rows > 0 else 0.0
            unique_count = int(series.nunique(dropna=True))
            inferred_type = cls.infer_column_type(series)

            # Clean sample values for JSON serialization
            sample = series.dropna().unique()[:5].tolist()
            clean_samples = []
            for item in sample:
                if isinstance(item, (pd.Timestamp, pd.Timedelta)):
                    clean_samples.append(str(item))
                elif pd.isna(item):
                    continue
                else:
                    clean_samples.append(item)

            columns_meta.append(
                ColumnMetadata(
                    name=str(col),
                    dtype=str(series.dtype),
                    inferred_type=inferred_type,
                    missing_count=missing_count,
                    missing_percentage=missing_pct,
                    unique_count=unique_count,
                    sample_values=clean_samples,
                )
            )

        return columns_meta
