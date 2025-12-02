"""Recommendation API routes."""
from fastapi import APIRouter, HTTPException, Query
from app.ml.recommender import get_recommender
from app.schemas.movie import MovieRecommendation
from typing import List

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


@router.get("/{user_id}", response_model=List[MovieRecommendation])
async def get_user_recommendations(
    user_id: int,
    limit: int = Query(10, ge=1, le=50, description="Number of recommendations")
):
    """
    Get personalized movie recommendations for a user using SVD collaborative filtering.
    
    - **user_id**: User ID
    - **limit**: Number of recommendations (1-50)
    """
    try:
        recommender = get_recommender()
        recommendations = recommender.get_recommendations(user_id, n=limit)
        
        if not recommendations:
            # Return popular movies if no personalized recommendations available
            recommendations = recommender.get_popular_movies(n=limit)
            # Convert to recommendation format
            recommendations = [
                {
                    **rec,
                    "predicted_rating": rec.get("avg_rating", 0.0)
                }
                for rec in recommendations
            ]
        
        return recommendations
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating recommendations: {str(e)}"
        )


@router.get("/similar/{movie_id}", response_model=List[MovieRecommendation])
async def get_similar_movies(
    movie_id: int,
    limit: int = Query(10, ge=1, le=50)
):
    """
    Get movies similar to a given movie based on latent factors.
    
    - **movie_id**: Movie ID
    - **limit**: Number of similar movies
    """
    try:
        recommender = get_recommender()
        similar = recommender.get_similar_movies(movie_id, n=limit)
        
        if not similar:
            raise HTTPException(
                status_code=404,
                detail="No similar movies found or movie not in training set"
            )
        
        # Convert to recommendation format
        similar_formatted = [
            {
                **movie,
                "predicted_rating": movie.get("avg_rating", 0.0)
            }
            for movie in similar
        ]
        
        return similar_formatted
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
