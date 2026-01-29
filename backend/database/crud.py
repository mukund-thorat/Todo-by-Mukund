from motor.motor_asyncio import AsyncIOMotorDatabase
from pymongo.errors import PyMongoError

from ..database.schemas import TodoSchema

TODO_COLL = "todos"

async def create_todo(todo: TodoSchema, db: AsyncIOMotorDatabase):
    try:
        await db.get_collection(TODO_COLL).insert_one(todo.model_dump())
        return True
    except PyMongoError as pe:
        print(f"Error at Inserting Todo:\n{pe}")
        return False

async def get_todos(limit: int, sort_by: tuple[str, int], db: AsyncIOMotorDatabase) -> list[TodoSchema]:
    todos = await db.get_collection(TODO_COLL).find({}).limit(limit).sort(*sort_by).to_list(length=limit)
    return [TodoSchema(**todo) for todo in todos]

async def get_todo(todo_id: str, db: AsyncIOMotorDatabase) -> TodoSchema:
    todo = await db.get_collection(TODO_COLL).find_one({"id": todo_id})
    return TodoSchema(**todo)

async def update(todo_id: str, new_todo: TodoSchema, db: AsyncIOMotorDatabase) -> bool:
    try:
        await db.get_collection(TODO_COLL).update_one({"id": todo_id}, {"$set": new_todo.model_dump()})
        return True
    except PyMongoError:
        return False

async def delete(todo_id: str, db: AsyncIOMotorDatabase) -> bool:
    await db.get_collection(TODO_COLL).delete_one({"id": todo_id})
