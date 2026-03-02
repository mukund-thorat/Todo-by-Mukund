from datetime import datetime

from pydantic import BaseModel


class TodoCreateModel(BaseModel):
    title: str
    priority: int = 4
    isActive: bool
    dueDate: datetime

class TodoSetModel(BaseModel):
    id: str
    title: str
    priority: int = 4
    isActive: bool
    dueDate: datetime
