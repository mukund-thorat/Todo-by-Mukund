from motor.motor_asyncio import AsyncIOMotorDatabase
from starlette.responses import RedirectResponse

from backend.routers.auth.service import is_user_already_logged_in


async def redirect_logged_in_user(refresh_token: str, db: AsyncIOMotorDatabase):
    is_user = await is_user_already_logged_in(refresh_token, db)

    if is_user:
        return RedirectResponse(url="/app")
    return None
