import os
import json
import datetime
import joblib
from typing import Dict, Any, List, Optional

SAVED_MODELS_DIR = os.path.join(os.path.dirname(__file__), "saved_models")
METADATA_FILE = os.path.join(SAVED_MODELS_DIR, "registry_metadata.json")

class ModelRegistry:
    def __init__(self):
        os.makedirs(SAVED_MODELS_DIR, exist_ok=True)
        self.metadata = self._load_metadata()

    def _load_metadata(self) -> Dict[str, Any]:
        if os.path.exists(METADATA_FILE):
            try:
                with open(METADATA_FILE, "r") as f:
                    return json.load(f)
            except Exception:
                return {}
        return {}

    def _save_metadata(self):
        with open(METADATA_FILE, "w") as f:
            json.dump(self.metadata, f, indent=2, default=str)

    def register_model(
        self,
        model_id: str,
        name: str,
        category: str,
        algorithm: str,
        metrics: Dict[str, Any],
        model_object: Any,
        feature_names: List[str],
    ) -> str:
        version = self.metadata.get(model_id, {}).get("version", 0) + 1
        filename = f"{model_id}_v{version}.joblib"
        filepath = os.path.join(SAVED_MODELS_DIR, filename)

        joblib.dump(model_object, filepath)

        model_entry = {
            "model_id": model_id,
            "name": name,
            "category": category,
            "algorithm": algorithm,
            "version": version,
            "filename": filename,
            "updated_at": datetime.datetime.utcnow().isoformat(),
            "metrics": metrics,
            "feature_names": feature_names,
            "status": "Active",
        }

        self.metadata[model_id] = model_entry
        self._save_metadata()
        return filename

    def get_model_entry(self, model_id: str) -> Optional[Dict[str, Any]]:
        return self.metadata.get(model_id)

    def load_model(self, model_id: str) -> Optional[Any]:
        entry = self.get_model_entry(model_id)
        if not entry:
            return None
        filepath = os.path.join(SAVED_MODELS_DIR, entry["filename"])
        if os.path.exists(filepath):
            return joblib.load(filepath)
        return None

    def list_all_models(self) -> List[Dict[str, Any]]:
        return list(self.metadata.values())
