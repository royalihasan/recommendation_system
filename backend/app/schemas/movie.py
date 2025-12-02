"""Movie Pydantic schemas for API requests/responses."""
from pydantic import BaseModel
from typing import List, Optional


class MovieBase(BaseModel):
    """Base movie schema."""
    title: str
    release_date: Optional[str] = None
    genres: Optional[List[str]] = []


class MovieResponse(MovieBase):
    """Schema for movie API responses."""
    movie_id: int
    avg_rating: float
    rating_count: int
    poster_url: Optional[str] = None
    
    # Netflix dataset fields
    image_url: Optional[str] = None
    summary: Optional[str] = None
    director: Optional[str] = None
    actors: Optional[str] = None
    imdb_score: Optional[float] = None
    runtime: Optional[str] = None
    type: Optional[str] = None
    tags: Optional[str] = None
    languages: Optional[str] = None
    view_rating: Optional[str] = None
    
    class Config:
        from_attributes = True


class MovieListResponse(BaseModel):
    """Schema for paginated movie list."""
    movies: List[MovieResponse]
    total: int
    page: int
    limit: int


class MovieRecommendation(BaseModel):
    """Schema for movie recommendations."""
    movie_id: int
    title: str
    genres: List[str]
    predicted_rating: float
    avg_rating: Optional[float] = None
    image_url: Optional[str] = None
    summary: Optional[str] = None
    type: Optional[str] = None
    imdb_score: Optional[float] = None
