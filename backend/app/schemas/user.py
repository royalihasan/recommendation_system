"""User Pydantic schemas for API requests/responses."""
from pydantic import BaseModel, EmailStr
from typing import Optional


class UserBase(BaseModel):
    """Base user schema."""
    username: str
    email: Optional[EmailStr] = None


class UserCreate(UserBase):
    """Schema for user registration."""
    password: str


class UserLogin(BaseModel):
    """Schema for user login."""
    username: str
    password: str


class UserResponse(UserBase):
    """Schema for user API responses."""
    user_id: int
    age: Optional[int] = None
    gender: Optional[str] = None
    occupation: Optional[str] = None
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    """Schema for JWT token."""
    access_token: str
    token_type: str
    user_id: int
    username: str


class TokenData(BaseModel):
    """Token payload schema."""
    user_id: Optional[int] = None
