import pandas as pd
from backend.etl.data_profiler import DataProfiler


def test_data_profiler_basic():
    data = {
        "user_id": [1, 2, 3, 3],
        "category": ["Electronics", "Apparel", "Apparel", "Apparel"],
        "sales": [100.5, 50.0, 75.25, 75.25],
    }
    df = pd.DataFrame(data)
    profile = DataProfiler.profile_dataframe(df, "sample.csv", 500)

    assert profile.summary.total_rows == 4
    assert profile.summary.total_columns == 3
    assert profile.summary.duplicate_rows_count == 1
    assert profile.quality_score < 100.0

    validation = DataProfiler.validate_dataframe(profile)
    assert validation.issue_count > 0
