from contextlib import asynccontextmanager

from fastapi import FastAPI

from .database.core import connect_to_db, close_db
from .routers.todos.controller import router as todo_router


@asynccontextmanager
async def lifespan(app_ref: FastAPI):
    await connect_to_db()
    yield
    await close_db()

app = FastAPI(lifespan=lifespan)

app.include_router(router=todo_router)


# if __name__ == "__main__":
#     uvicorn.run("main:app", host="localhost", port=4343, reload=True)