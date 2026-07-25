import io
import pandas as pd
from typing import Tuple, Union
from backend.utils.error_handlers import PipelineException
from backend.utils.logger import get_logger

logger = get_logger("csv_loader")


class CSVLoader:
    """Enterprise CSV Ingestion Loader with format & delimiter detection."""

    @staticmethod
    def detect_delimiter(file_content: bytes) -> str:
        """Detect CSV delimiter from first line bytes."""
        sample = file_content[:4096].decode("utf-8", errors="ignore")
        for delim in [",", ";", "\t", "|"]:
            if delim in sample:
                first_line_count = sample.split("\n")[0].count(delim)
                if first_line_count > 0:
                    return delim
        return ","

    @classmethod
    def load_from_bytes(cls, file_content: bytes, filename: str) -> Tuple[pd.DataFrame, str]:
        """Loads a pandas DataFrame from raw bytes with auto-encoding detection."""
        if not file_content:
            raise PipelineException(f"Uploaded file '{filename}' is empty.", status_code=400)

        delimiter = cls.detect_delimiter(file_content)
        encodings_to_try = ["utf-8", "latin-1", "iso-8859-1", "cp1252"]

        df = None
        used_encoding = None

        for encoding in encodings_to_try:
            try:
                buffer = io.BytesIO(file_content)
                df = pd.read_csv(buffer, sep=delimiter, encoding=encoding, low_memory=False)
                used_encoding = encoding
                break
            except Exception as e:
                logger.warning(f"Failed to read CSV with encoding {encoding}: {e}")
                continue

        if df is None:
            raise PipelineException(
                f"Could not parse CSV file '{filename}'. Unsupported format or encoding.",
                status_code=422
            )

        logger.info(f"Successfully loaded '{filename}' ({len(df)} rows, {len(df.columns)} cols) using encoding '{used_encoding}'")
        return df, delimiter
