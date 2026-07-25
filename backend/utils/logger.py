import logging

logger = logging.getLogger("intellicommerce.app")


def get_logger(name: str) -> logging.Logger:
    return logging.getLogger(f"intellicommerce.{name}")
