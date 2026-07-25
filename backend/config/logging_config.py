import logging
import sys


def setup_logging(log_level: str = "INFO") -> None:
    """Configures structured enterprise logging for FastAPI backend."""
    logging_format = (
        "[%(asctime)s] [%(levelname)s] [%(name)s:%(lineno)d] - %(message)s"
    )

    logging.basicConfig(
        level=log_level,
        format=logging_format,
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )

    # Silence overly verbose third-party loggers
    logging.getLogger("urllib3").setLevel(logging.WARNING)
    logging.getLogger("uvicorn.access").setLevel(logging.INFO)


logger = logging.getLogger("intellicommerce")
