"""Recommendation engine using trained SVD model."""
import pickle
import sqlite3
import pandas as pd
import numpy as np
from pathlib import Path
from typing import List, Dict, Optional


class RecommendationEngine:
    """Handles movie recommendations using trained SVD model."""
    
    def __init__(self, model_path='data/trained_model.pkl', db_path='data/database.db'):
        """
        Initialize recommendation engine.
        
        Args:
            model_path: Path to trained model file
            db_path: Path to SQLite database
        """
        self.base_dir = Path(__file__).parent.parent.parent
        self.model_path = self.base_dir / model_path
        self.db_path = self.base_dir / db_path
        self.model = self._load_model()
        
    def _load_model(self):
        """Load the trained SVD model."""
        if not self.model_path.exists():
            raise FileNotFoundError(
                f"Model not found at {self.model_path}. "
                "Please run 'python app/ml/train_model.py' first."
            )
        
        with open(self.model_path, 'rb') as f:
            model = pickle.load(f)
        
        print(f"✓ Model loaded from {self.model_path}")
        return model
    
    def get_recommendations(self, user_id: int, n: int = 10) -> List[Dict]:
        """
        Get top N movie recommendations for a user.
        
        Args:
            user_id: User ID
            n: Number of recommendations
            
        Returns:
            List of dictionaries with movie details and predicted ratings
        """
        conn = sqlite3.connect(self.db_path)
        
        # Get movies the user hasn't rated
        # Get movies the user hasn't rated
        # Filter out movies without images for better UI
        query = """
        SELECT m.movie_id, m.title, m.genres, m.avg_rating, m.image_url
        FROM movies m
        WHERE m.movie_id NOT IN (
            SELECT movie_id FROM ratings WHERE user_id = ?
        )
        AND m.image_url IS NOT NULL
        """
        unrated_movies = pd.read_sql_query(query, conn, params=(user_id,))
        
        if unrated_movies.empty:
            conn.close()
            return []
        
        # Get user's recent positive ratings to boost genres
        # This makes the system feel "live" even without retraining SVD
        genre_boost = {}
        try:
            recent_ratings_query = """
            SELECT m.genres, r.rating
            FROM ratings r
            JOIN movies m ON r.movie_id = m.movie_id
            WHERE r.user_id = ? AND r.rating >= 4.0
            ORDER BY r.timestamp DESC
            LIMIT 5
            """
            recent_ratings = pd.read_sql_query(recent_ratings_query, conn, params=(user_id,))
            
            for _, row in recent_ratings.iterrows():
                if row['genres']:
                    for genre in row['genres'].split(','):
                        genre = genre.strip()
                        genre_boost[genre] = genre_boost.get(genre, 0) + 0.2
        except Exception as e:
            print(f"Warning: Could not calculate genre boost: {e}")

        # Predict ratings for all unrated movies
        predictions = []
        for _, movie in unrated_movies.iterrows():
            try:
                pred = self.model.predict(user_id, movie['movie_id'])
                base_score = float(pred.est)
                
                # Apply genre boost
                boost = 0
                if movie['genres']:
                    for genre in movie['genres'].split(','):
                        if genre.strip() in genre_boost:
                            boost += genre_boost[genre.strip()]
                
                # Cap boost to avoid over-inflation
                final_score = min(5.0, base_score + boost)
                
                predictions.append({
                    'movie_id': int(movie['movie_id']),
                    'title': movie['title'],
                    'genres': movie['genres'].split(',') if movie['genres'] else [],
                    'predicted_rating': round(final_score, 2),
                    'avg_rating': round(float(movie['avg_rating']), 2) if movie['avg_rating'] else 0.0,
                    'image_url': movie['image_url']
                })
            except Exception as e:
                print(f"Warning: Could not predict for movie {movie['movie_id']}: {e}")
                continue
        
        # Sort by predicted rating and return top N
        predictions.sort(key=lambda x: x['predicted_rating'], reverse=True)
        
        conn.close()
        return predictions[:n]
    
    def get_popular_movies(self, n: int = 10, min_ratings: int = 50) -> List[Dict]:
        """
        Get popular movies based on average rating and rating count.
        
        Args:
            n: Number of movies to return
            min_ratings: Minimum number of ratings required
            
        Returns:
            List of popular movies
        """
        conn = sqlite3.connect(self.db_path)
        
        query = f"""
        SELECT movie_id, title, genres, avg_rating, rating_count, image_url
        FROM movies
        WHERE rating_count >= ?
        AND image_url IS NOT NULL
        ORDER BY avg_rating DESC, rating_count DESC
        LIMIT ?
        """
        
        movies = pd.read_sql_query(query, conn, params=(min_ratings, n))
        conn.close()
        
        return [
            {
                'movie_id': int(row['movie_id']),
                'title': row['title'],
                'genres': row['genres'].split(',') if row['genres'] else [],
                'avg_rating': round(float(row['avg_rating']), 2),
                'rating_count': int(row['rating_count']),
                'image_url': row['image_url']
            }
            for _, row in movies.iterrows()
        ]
    
    def get_similar_movies(self, movie_id: int, n: int = 10) -> List[Dict]:
        """
        Get similar movies based on latent factors.
        
        Args:
            movie_id: Movie ID
            n: Number of similar movies
            
        Returns:
            List of similar movies
        """
        try:
            # Get the latent factor vector for the movie
            movie_inner_id = self.model.trainset.to_inner_iid(movie_id)
            movie_factors = self.model.qi[movie_inner_id]
            
            # Calculate similarity with all other movies
            similarities = []
            for iid in range(self.model.trainset.n_items):
                if iid != movie_inner_id:
                    other_movie_id = self.model.trainset.to_raw_iid(iid)
                    other_factors = self.model.qi[iid]
                    
                    # Cosine similarity
                    similarity = np.dot(movie_factors, other_factors) / (
                        np.linalg.norm(movie_factors) * np.linalg.norm(other_factors)
                    )
                    similarities.append((int(other_movie_id), float(similarity)))
            
            # Sort by similarity
            similarities.sort(key=lambda x: x[1], reverse=True)
            
            # Get movie details
            conn = sqlite3.connect(self.db_path)
            similar_movie_ids = [mid for mid, _ in similarities[:n]]
            placeholders = ','.join('?' * len(similar_movie_ids))
            query = f"SELECT movie_id, title, genres, avg_rating, image_url FROM movies WHERE movie_id IN ({placeholders}) AND image_url IS NOT NULL"
            similar_movies = pd.read_sql_query(query, conn, params=similar_movie_ids)
            conn.close()
            
            return [
                {
                    'movie_id': int(row['movie_id']),
                    'title': row['title'],
                    'genres': row['genres'].split(',') if row['genres'] else [],
                    'avg_rating': round(float(row['avg_rating']), 2),
                    'image_url': row['image_url']
                }
                for _, row in similar_movies.iterrows()
            ]
        
        except ValueError:
            # Movie not in training set
            return []


# Singleton instance
_recommender_instance: Optional[RecommendationEngine] = None


def get_recommender() -> RecommendationEngine:
    """Get or create recommender instance (singleton pattern)."""
    global _recommender_instance
    if _recommender_instance is None:
        _recommender_instance = RecommendationEngine()
    return _recommender_instance
