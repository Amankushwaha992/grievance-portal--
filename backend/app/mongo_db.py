import os
from typing import Optional

from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.database import Database
from pymongo.errors import PyMongoError

load_dotenv()

_mongo_client: Optional[MongoClient] = None
_mongo_db: Optional[Database] = None


def connect_mongo() -> Database:
    """
    Connect to MongoDB and return active database.
    If an old Mongo client is open, close it first.
    """
    global _mongo_client, _mongo_db

    mongo_uri = os.getenv("MONGODB_URI", "mongodb://127.0.0.1:27017")
    db_name = os.getenv("MONGODB_DB_NAME", "grievance_portal")

    if _mongo_client is not None:
        _mongo_client.close()
        _mongo_client = None
        _mongo_db = None

    _mongo_client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
    _mongo_db = _mongo_client[db_name]
    _mongo_client.admin.command("ping")
    return _mongo_db


def show_databases() -> list[str]:
    """List all MongoDB databases from active connection."""
    global _mongo_client
    if _mongo_client is None:
        connect_mongo()
    if not _mongo_client:
        return []
    try:
        return _mongo_client.list_database_names()
    except PyMongoError:
        return []


def delete_database(db_name: str) -> bool:
    """
    Delete a MongoDB database by name.
    Returns True when deletion command is issued.
    """
    global _mongo_client
    if _mongo_client is None:
        connect_mongo()
    if not _mongo_client:
        return False
    try:
        _mongo_client.drop_database(db_name)
        return True
    except PyMongoError:
        return False
