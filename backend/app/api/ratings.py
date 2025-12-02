"""Rating API routes."""
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.rating import Rating
from app.models.movie import Movie
from app.models.user import User
from app.schemas.rating import (
    RatingCreate, RatingUpdate, RatingResponse,
    UserRatingResponse, RatingListResponse
)
from typing import List
from datetime import datetime, timezone

router = APIRouter(prefix="/ratings", tags=["ratings"])


@router.post("", response_model=RatingResponse, status_code=status.HTTP_201_CREATED)
async def create_rating(rating_data: RatingCreate, db: Session = Depends(get_db)):
    """
    Create a new rating for a movie.
    
    - **user_id**: User ID
    - **movie_id**: Movie ID
    - **rating**: Rating value (1-5)
    """
    # Check if user exists
    user = db.query(User).filter(User.user_id == rating_data.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check if movie exists
    movie = db.query(Movie).filter(Movie.movie_id == rating_data.movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    # Check if rating already exists
    existing_rating = db.query(Rating).filter(
        Rating.user_id == rating_data.user_id,
        Rating.movie_id == rating_data.movie_id
    ).first()
    
    if existing_rating:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Rating already exists. Use PUT to update."
        )
    
    # Create new rating
    new_rating = Rating(
        user_id=rating_data.user_id,
        movie_id=rating_data.movie_id,
        rating=rating_data.rating,
        timestamp=datetime.now(timezone.utc)
    )
    
    db.add(new_rating)
    db.commit()
    db.refresh(new_rating)
    
    # Update movie statistics
    _update_movie_stats(db, rating_data.movie_id)
    
    return new_rating


@router.get("/user/{user_id}", response_model=RatingListResponse)
async def get_user_ratings(
    user_id: int,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get all ratings by a specific user.
    
    - **user_id**: User ID
    - **page**: Page number
    - **limit**: Items per page
    """
    # Check if user exists
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get total count
    total = db.query(Rating).filter(Rating.user_id == user_id).count()
    
    # Get ratings with movie details
    offset = (page - 1) * limit
    ratings = db.query(Rating, Movie)\
        .join(Movie, Rating.movie_id == Movie.movie_id)\
        .filter(Rating.user_id == user_id)\
        .order_by(Rating.timestamp.desc())\
        .offset(offset)\
        .limit(limit)\
        .all()
    
    ratings_data = [
        UserRatingResponse(
            rating_id=rating.rating_id,
            movie_id=rating.movie_id,
            title=movie.title,
            rating=rating.rating,
            timestamp=rating.timestamp
        )
        for rating, movie in ratings
    ]
    
    return {
        "ratings": ratings_data,
        "total": total,
        "page": page
    }


@router.put("/{rating_id}", response_model=RatingResponse)
async def update_rating(
    rating_id: int,
    rating_data: RatingUpdate,
    db: Session = Depends(get_db)
):
    """
    Update an existing rating.
    
    - **rating_id**: Rating ID
    - **rating**: New rating value (1-5)
    """
    rating = db.query(Rating).filter(Rating.rating_id == rating_id).first()
    
    if not rating:
        raise HTTPException(status_code=404, detail="Rating not found")
    
    rating.rating = rating_data.rating
    db.commit()
    db.refresh(rating)
    
    # Update movie statistics
    _update_movie_stats(db, rating.movie_id)
    
    return rating


@router.delete("/{rating_id}", status_code=status.HTTP_200_OK)
async def delete_rating(rating_id: int, db: Session = Depends(get_db)):
    """
    Delete a rating.
    
    - **rating_id**: Rating ID
    """
    rating = db.query(Rating).filter(Rating.rating_id == rating_id).first()
    
    if not rating:
        raise HTTPException(status_code=404, detail="Rating not found")
    
    movie_id = rating.movie_id
    db.delete(rating)
    db.commit()
    
    # Update movie statistics
    _update_movie_stats(db, movie_id)
    
    return {"success": True, "message": "Rating deleted successfully"}


def _update_movie_stats(db: Session, movie_id: int):
    """Update average rating and rating count for a movie."""
    stats = db.query(
        func.avg(Rating.rating).label('avg_rating'),
        func.count(Rating.rating_id).label('count')
    ).filter(Rating.movie_id == movie_id).first()
    
    movie = db.query(Movie).filter(Movie.movie_id == movie_id).first()
    if movie:
        movie.avg_rating = stats.avg_rating if stats.avg_rating else 0.0
        movie.rating_count = stats.count if stats.count else 0
        db.commit()
