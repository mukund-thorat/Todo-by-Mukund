import os

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorDatabase, AsyncIOMotorClient

load_dotenv()
db: AsyncIOMotorDatabase = None

async def connect_to_db():
    global db
    db = AsyncIOMotorClient(os.getenv("MONGO_URI")).get_database("todoapp")

async def close_db():
    global db
    db.client.close()

async def get_db() -> AsyncIOMotorDatabase:
    return db
