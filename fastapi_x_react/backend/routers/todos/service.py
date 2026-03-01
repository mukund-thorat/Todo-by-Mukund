import uuid
from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from data.schemas import Todo
from routers.todos.repo import insert_todo
from utils.pydantic_cm import TodoModel


async def add_new_todo(user_id: uuid.UUID, todo_model: TodoModel, db: AsyncSession) -> Todo:
    todo_schema = Todo(
        userId=user_id,
        id=uuid.uuid4(),
        title=todo_model.title,
        isActive=todo_model.isActive,
        priority=todo_model.priority,
        dueDate=todo_model.dueDate,
        createdAt=datetime.now(),
    )

    return await insert_todo(todo_schema, db)
