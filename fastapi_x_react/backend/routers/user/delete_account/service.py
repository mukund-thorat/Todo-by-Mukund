from datetime import datetime
from pydantic import EmailStr
from sqlalchemy.ext.asyncio import AsyncSession

from routers.auth.repo_user import set_user_timestamp, delete_user


async def remove_user(email: EmailStr, db: AsyncSession):
    response = await delete_user(email, db)
    await set_user_timestamp(email, "deletedAt", datetime.now(), db)
    return response
