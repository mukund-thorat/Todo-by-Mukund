from datetime import datetime

from pydantic import BaseModel


class TodoModel(BaseModel):
    title: str
    priority: int = 4
    isActive: bool = True
    dueDate: datetime | None = None
