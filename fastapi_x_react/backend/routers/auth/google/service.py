from datetime import timedelta
from urllib.parse import urlencode

from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import RedirectResponse

from data.schemas import AuthServiceProvider
from routers.auth.google.repo import fetch_user_by_email
from routers.auth.models import SignUpModel
from routers.auth.service import store_pend_user
from utils.security.tokens import create_access_token


async def login_or_create_user(first_name: str, last_name: str, email: str, db: AsyncSession):
    user = await fetch_user_by_email(email, db)
    if user:
        redirect = RedirectResponse("http://localhost:5173/oauth/callback", status_code=302)
        token = create_access_token(user.email, str(user.id), delta_expires=timedelta(minutes=2))
        redirect.headers["location"] = f"http://localhost:5173/oauth/callback#token={token}"
        return redirect


    signup_model = SignUpModel(
        firstName = first_name,
        lastName = last_name,
        email = email,
        password = None,
    )

    await store_pend_user(signup_model, AuthServiceProvider.GOOGLE, db)
    query = urlencode({"email": email})
    return RedirectResponse(f"http://localhost:5173/pick_avatar?{query}")
