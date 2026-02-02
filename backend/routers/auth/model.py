from pydantic import BaseModel, EmailStr

class SignUpModel(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    password: str

class UserCredentials(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    accessToken: str
    tokenType: str

class LoginOTPVerificationModel(BaseModel):
    email: EmailStr
    otp: str
    avatar: str

class OTPVerificationModel(BaseModel):
    otp: str

class PasswordRecoveryModel(BaseModel):
    newPassword: str
    recoveryToken: str

class RecoveryOTPModel(BaseModel):
    email: EmailStr
    otp: str

class PasswordChangeModel(BaseModel):
    newPassword: str
    otp: str
