from fastapi import APIRouter
from fastapi.params import Depends
from motor.motor_asyncio import AsyncIOMotorDatabase

from ...database.core import get_db
from ...database.crud import get_todos, create_todo, update, delete
from ...database.schemas import TodoSchema

router = APIRouter(prefix="/todos", tags=["todos"])

@router.get("/")
async def fetch_all_todos(limit: int = 15, sort_field: str = "createdAt", sort_direction: int = 1, db: AsyncIOMotorDatabase = Depends(get_db)) -> list[TodoSchema]:
    return await get_todos(limit=limit, sort_by=(sort_field, sort_direction), db=db)

@router.post("/create")
async def fetch_all_todos(todo: TodoSchema, db: AsyncIOMotorDatabase = Depends(get_db)) -> dict:
    response = await create_todo(todo, db)

    return {"message": "Todo created successfully."} if response else {"message": "Failed to create todo."}

@router.put("/update/{todo_id}")
async def update_todo(todo_id: str, todo: TodoSchema, db: AsyncIOMotorDatabase = Depends(get_db)) -> dict:
    response = await update(todo_id=todo_id, new_todo=todo, db=db)
    return {"message": "Todo updated successfully."} if response else {"message": "Failed to update todo."}

@router.delete("/delete/{todo_id}")
async def delete_todo(todo_id: str, db: AsyncIOMotorDatabase = Depends(get_db)) -> dict:
    response = await delete(todo_id=todo_id, db=db)
    return {"message": "Todo deleted successfully."} if response is None else {"message": "Failed to delete todo."}
