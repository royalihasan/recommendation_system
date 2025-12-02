"""Movie API routes."""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from app.database import get_db
from app.models.movie import Movie
from app.schemas.movie import MovieResponse, MovieListResponse
from typing import List, Optional

router = APIRouter(prefix="/movies", tags=["movies"])


@router.get("", response_model=MovieListResponse)
async def get_movies(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(20, ge=1, le=100, description="Items per page"),
    search: Optional[str] = Query(None, description="Search query"),
    genre: Optional[str] = Query(None, description="Filter by genre"),
    db: Session = Depends(get_db)
):
    """
    Get paginated list of movies with optional search and filters.
    
    - **page**: Page number (default: 1)
    - **limit**: Items per page (default: 20, max: 100)
    - **search**: Search in movie title
    - **genre**: Filter by genre
    """
    query = db.query(Movie)
    
    # Apply search filter
    if search:
        query = query.filter(Movie.title.ilike(f"%{search}%"))
    
    # Apply genre filter
    if genre:
        query = query.filter(Movie.genres.like(f"%{genre}%"))
    
    # Get total count
    total = query.count()
    
    # Apply pagination
    offset = (page - 1) * limit
    movies = query.order_by(Movie.avg_rating.desc()).offset(offset).limit(limit).all()
    
    # Format genres as lists and use local image_url
    movies_data = []
    for movie in movies:
        movie_dict = {
            "movie_id": movie.movie_id,
            "title": movie.title,
            "release_date": movie.release_date,
            "genres": movie.genres.split(',') if movie.genres else [],
            "avg_rating": round(movie.avg_rating, 2) if movie.avg_rating else 0.0,
            "rating_count": movie.rating_count or 0,
            "poster_url": movie.image_url, # Use local Netflix image
            "image_url": movie.image_url,
            "summary": movie.summary,
            "imdb_score": movie.imdb_score
        }
        movies_data.append(MovieResponse(**movie_dict))
    
    return {
        "movies": movies_data,
        "total": total,
        "page": page,
        "limit": limit
    }


@router.get("/{movie_id}", response_model=MovieResponse)
async def get_movie(movie_id: int, db: Session = Depends(get_db)):
    """
    Get detailed information about a specific movie.
    
    - **movie_id**: Movie ID
    """
    movie = db.query(Movie).filter(Movie.movie_id == movie_id).first()
    
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    return MovieResponse(
        movie_id=movie.movie_id,
        title=movie.title,
        release_date=movie.release_date,
        genres=movie.genres.split(',') if movie.genres else [],
        avg_rating=round(movie.avg_rating, 2) if movie.avg_rating else 0.0,
        rating_count=movie.rating_count or 0,
        image_url=movie.image_url,
        summary=movie.summary,
        director=movie.director,
        actors=movie.actors,
        imdb_score=movie.imdb_score,
        runtime=movie.runtime,
        type=movie.type,
        tags=movie.tags,
        languages=movie.languages,
        view_rating=movie.view_rating
    )


@router.get("/popular/list", response_model=List[MovieResponse])
async def get_popular_movies(
    limit: int = Query(10, ge=1, le=50, description="Number of movies"),
    min_ratings: int = Query(50, ge=1, description="Minimum number of ratings"),
    db: Session = Depends(get_db)
):
    """
    Get popular movies based on average rating and rating count.
    
    - **limit**: Number of movies to return
    - **min_ratings**: Minimum number of ratings required
    """
    movies = db.query(Movie)\
        .filter(Movie.rating_count >= min_ratings)\
        .order_by(Movie.avg_rating.desc(), Movie.rating_count.desc())\
        .limit(limit)\
        .all()
    
    return [
        MovieResponse(
            movie_id=movie.movie_id,
            title=movie.title,
            release_date=movie.release_date,
            genres=movie.genres.split(',') if movie.genres else [],
            avg_rating=round(movie.avg_rating, 2) if movie.avg_rating else 0.0,
            rating_count=movie.rating_count or 0
        )
        for movie in movies
    ]
