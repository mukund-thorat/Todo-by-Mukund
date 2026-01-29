from pydantic import BaseModel, EmailStr


class UserCredentials(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    accessToken: str
    tokenType: str

