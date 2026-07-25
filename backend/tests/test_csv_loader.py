import pytest
from backend.etl.csv_loader import CSVLoader
from backend.utils.error_handlers import PipelineException


def test_csv_loader_valid():
    csv_bytes = b"id,product,price,quantity\n1,Widget A,19.99,5\n2,Widget B,29.99,10\n"
    df, delim = CSVLoader.load_from_bytes(csv_bytes, "test.csv")
    assert delim == ","
    assert len(df) == 2
    assert list(df.columns) == ["id", "product", "price", "quantity"]


def test_csv_loader_empty():
    with pytest.raises(PipelineException):
        CSVLoader.load_from_bytes(b"", "empty.csv")
