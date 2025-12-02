"""Rating Pydantic schemas for API requests/responses."""
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class RatingCreate(BaseModel):
    """Schema for creating a rating."""
    user_id: int
    movie_id: int
    rating: float = Field(..., ge=1, le=5, description="Rating from 1 to 5")


class RatingUpdate(BaseModel):
    """Schema for updating a rating."""
    rating: float = Field(..., ge=1, le=5, description="Rating from 1 to 5")


class RatingResponse(BaseModel):
    """Schema for rating API responses."""
    rating_id: int
    user_id: int
    movie_id: int
    rating: float
    timestamp: datetime
    
    class Config:
        from_attributes = True


class UserRatingResponse(BaseModel):
    """Schema for user's rating with movie details."""
    rating_id: int
    movie_id: int
    title: str
    rating: float
    timestamp: datetime


class RatingListResponse(BaseModel):
    """Schema for paginated rating list."""
    ratings: List[UserRatingResponse]
    total: int
    page: int
