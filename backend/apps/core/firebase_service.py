"""
Firebase Service helper for Django.
Bridges Django REST Framework services with Google Cloud Firestore.
"""
import os
import json
from pathlib import Path

class FirebaseService:
    """Encapsulates Firestore reads and writes."""
    
    _instance = None
    _config = None

    @classmethod
    def get_config(cls):
        if cls._config is None:
            config_path = Path(__file__).resolve().parent.parent.parent.parent / 'firebase-applet-config.json'
            if config_path.exists():
                with open(config_path, 'r') as f:
                    cls._config = json.load(f)
            else:
                cls._config = {}
        return cls._config

    @classmethod
    def get_project_id(cls):
        config = cls.get_config()
        return config.get('projectId', 'solewise-dev')

    @classmethod
    def get_database_id(cls):
        config = cls.get_config()
        return config.get('firestoreDatabaseId', '(default)')
