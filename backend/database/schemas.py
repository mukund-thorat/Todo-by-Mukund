from datetime import datetime

from pydantic import BaseModel


class TodoSchema(BaseModel):
    id: str
    title: str
    description: str
    priority: int
    isCompleted: bool
    dueDate: datetime
    createdAt: datetime
