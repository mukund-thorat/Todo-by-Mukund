import json
from urllib.parse import urlencode

from sqlalchemy.ext.asyncio import AsyncSession
from starlette.responses import HTMLResponse, RedirectResponse, Response

from data.schemas import AuthServiceProvider
from routers.auth.google.repo import fetch_user_by_email
from routers.auth.models import SignUpModel
from routers.auth.service import tokens_generator, store_pend_user


async def login_or_create_user(first_name: str, last_name: str, email: str, db: AsyncSession):
    user = await fetch_user_by_email(email, db)
    if user:
        temp_response = Response()
        token = await tokens_generator(temp_response, user, db)
        access_token_json = json.dumps(token.access_token)

        html = (
            "<!DOCTYPE html><html><head><meta charset='UTF-8'>"
            "<title>Signing in...</title></head><body>"
            "<script>"
            f"const token = {access_token_json};"
            "if (token) { sessionStorage.setItem('access_token', token); }"
            "window.location.href = '/app';"
            "</script></body></html>"
        )
        html_response = HTMLResponse(content=html, status_code=200)
        for header, value in temp_response.raw_headers:
            if header.lower() == b"set-cookie":
                html_response.raw_headers.append((header, value))
        return html_response

    signup_model = SignUpModel(
        firstName = first_name,
        lastName = last_name,
        email = email,
        password = None,
    )

    await store_pend_user(signup_model, AuthServiceProvider.GOOGLE, db)
    query = urlencode({"email": email})
    return RedirectResponse(f"http://localhost:5173/pick_avatar?{query}")
