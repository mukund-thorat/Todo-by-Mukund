from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from fastapi.security import OAuth2PasswordRequestForm
from motor.motor_asyncio import AsyncIOMotorDatabase
from starlette.status import HTTP_201_CREATED, HTTP_406_NOT_ACCEPTABLE, HTTP_202_ACCEPTED, HTTP_401_UNAUTHORIZED, \
    HTTP_404_NOT_FOUND

from backend.database.core import get_db
from backend.database.crud import get_user_by_refresh_token, update_refresh_token
from backend.routers.auth.model import UserCredentials, Token
from backend.routers.auth.service import create_user, authenticate_user, create_access_token, get_current_user, \
    create_refresh_token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup", status_code=HTTP_201_CREATED)
async def signup(credentials: UserCredentials, db: AsyncIOMotorDatabase = Depends(get_db)):
    if credentials.email is None or credentials.password is None:
        raise HTTPException(status_code=HTTP_406_NOT_ACCEPTABLE, detail="Email or password is required")

    await create_user(email=credentials.email, password=credentials.password, db=db)
    return {"status_code": HTTP_201_CREATED, "message": "User created successfully!"}

@router.post("/login", status_code=HTTP_202_ACCEPTED)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: AsyncIOMotorDatabase = Depends(get_db)):
    if form_data.username is None or form_data.password is None:
        raise HTTPException(status_code=HTTP_406_NOT_ACCEPTABLE, detail="Email or password is required")

    credentials = UserCredentials(email=form_data.username, password=form_data.password)
    user = await authenticate_user(credentials=credentials, db=db)

    if not user:
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Authentication Failed!")

    return {
        "access_token": create_access_token(email=user.email, user_id=user.userId, delta_expires=timedelta(minutes=15)),
        "refresh_token": create_refresh_token(user_id=user.userId),
        "token_type": "bearer"
    }

@router.get("/refresh")
async def token_refresher(refresh_token: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    user = await get_user_by_refresh_token(refresh_token=refresh_token, db=db)

    if user is None:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND, detail="Invalid refresh token!")

    new_refresh_token = create_refresh_token(user_id=user['userId'])
    access_token = create_access_token(email=user['email'], user_id=user['userId'], delta_expires=timedelta(minutes=15))

    await update_refresh_token(email=user['email'], new_refresh_token=new_refresh_token, db=db)

    return {
        "access_token": access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer"
    }

@router.get("/me")
async def get_me(user: dict = Depends(get_current_user), db: AsyncIOMotorDatabase = Depends(get_db)):
    if user is None:
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED, detail="Authentication Failed!")
    return user