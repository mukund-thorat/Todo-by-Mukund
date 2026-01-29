from contextlib import asynccontextmanager

from fastapi import FastAPI

from .database.core import connect_to_db, close_db
from .routers.todos.controller import router as todo_router
from .routers.auth.controller import router as auth_router


@asynccontextmanager
async def lifespan(app_ref: FastAPI):
    await connect_to_db()
    yield
    await close_db()

app = FastAPI(lifespan=lifespan)

app.include_router(router=todo_router)
app.include_router(router=auth_router)
