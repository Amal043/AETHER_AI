from fastapi import Request, status
from fastapi.responses import JSONResponse
from backend.utils.logger import get_logger

logger = get_logger("error_handler")


class PipelineException(Exception):
    """Custom exception raised during ETL and Data Pipeline processing."""

    def __init__(self, message: str, status_code: int = 400, details: dict | None = None):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.details = details or {}


async def pipeline_exception_handler(request: Request, exc: PipelineException) -> JSONResponse:
    logger.error(f"PipelineException on {request.url.path}: {exc.message}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "type": "PipelineException",
            "message": exc.message,
            "details": exc.details,
            "path": request.url.path,
        },
    )


async def generic_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.error(f"Unhandled Exception on {request.url.path}: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": True,
            "type": "InternalServerError",
            "message": "An internal server error occurred.",
            "path": request.url.path,
        },
    )
