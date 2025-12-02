"""Generate synthetic ratings for training the recommendation model."""
import sqlite3
import random
import numpy as np
from pathlib import Path

def generate_synthetic_ratings(n_users=100, ratings_per_user=50):
    """
    Generate synthetic ratings based on IMDb scores.
    
    Args:
        n_users: Number of synthetic users to create
        ratings_per_user: Average number of ratings per user
    """
    print("🎲 Generating synthetic ratings for ML training...")
    print("=" * 60)
    
    base_dir = Path(__file__).parent.parent
    db_path = base_dir / 'data' / 'database.db'
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Get all movies with IMDb scores
    cursor.execute("SELECT movie_id, imdb_score FROM movies WHERE imdb_score IS NOT NULL")
    movies = cursor.fetchall()
    
    print(f"📊 Found {len(movies)} movies with IMDb scores")
    print(f"👥 Creating {n_users} synthetic users")
    print(f"⭐ Generating ~{ratings_per_user} ratings per user")
    
    # Generate ratings
    ratings = []
    total_ratings = 0
    
    for user_id in range(1, n_users + 1):
        # Each user rates a random subset of movies
        n_ratings = random.randint(ratings_per_user - 20, ratings_per_user + 20)
        user_movies = random.sample(movies, min(n_ratings, len(movies)))
        
        for movie_id, imdb_score in user_movies:
            if imdb_score:
                # Generate rating based on IMDb score with some randomness
                # IMDb: 0-10 -> Our scale: 1-5
                base_rating = (imdb_score / 10) * 5
                # Add some noise to make it realistic
                noise = np.random.normal(0, 0.5)
                rating = max(1.0, min(5.0, base_rating + noise))
                
                from datetime import datetime
                ratings.append((user_id, movie_id, round(rating, 1), datetime.now().isoformat()))
                total_ratings += 1
    
    # Insert ratings
    print(f"\n💾 Inserting {total_ratings:,} ratings into database...")
    cursor.executemany(
        "INSERT INTO ratings (user_id, movie_id, rating, timestamp) VALUES (?, ?, ?, ?)",
        ratings
    )
    
    conn.commit()
    
    # Show statistics
    cursor.execute("SELECT COUNT(*) FROM ratings")
    total = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(DISTINCT user_id) FROM ratings")
    users = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(DISTINCT movie_id) FROM ratings")
    rated_movies = cursor.fetchone()[0]
    
    cursor.execute("SELECT AVG(rating) FROM ratings")
    avg_rating = cursor.fetchone()[0]
    
    print(f"\n✅ Ratings generated successfully!")
    print(f"   Total ratings: {total:,}")
    print(f"   Unique users: {users}")
    print(f"   Movies rated: {rated_movies}")
    print(f"   Average rating: {avg_rating:.2f}")
    
    conn.close()
    print("\n" + "=" * 60)
    print("🎉 Ready for model training!")

if __name__ == "__main__":
    generate_synthetic_ratings(n_users=100, ratings_per_user=100)
