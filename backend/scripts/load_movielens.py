"""Utility script to load MovieLens 100k dataset into SQLite database."""
import pandas as pd
import sqlite3
from pathlib import Path
import sys

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))


def load_movielens_data():
    """Load MovieLens 100k dataset into SQLite database."""
    
    # Paths
    base_dir = Path(__file__).parent.parent
    data_dir = base_dir / "data" / "ml-100k"
    db_path = base_dir / "data" / "database.db"
    
    if not data_dir.exists():
        print(f"❌ Error: MovieLens data directory not found at {data_dir}")
        print("Please download the dataset first:")
        print("  wget http://files.grouplens.org/datasets/movielens/ml-100k.zip")
        print(f"  unzip ml-100k.zip -d {base_dir / 'data'}")
        return False
    
    print("📊 Loading MovieLens 100k dataset...")
    
    # Connect to database
    conn = sqlite3.connect(db_path)
    
    try:
        # Load ratings (u.data: user_id, movie_id, rating, timestamp)
        print("  Loading ratings...")
        ratings_columns = ['user_id', 'movie_id', 'rating', 'timestamp']
        ratings_df = pd.read_csv(
            data_dir / 'u.data',
            sep='\t',
            names=ratings_columns,
            encoding='latin-1'
        )
        # Clear existing data and insert
        conn.execute('DELETE FROM ratings')
        ratings_df.to_sql('ratings', conn, if_exists='append', index=False)
        print(f"  ✓ Loaded {len(ratings_df):,} ratings")
        
        # Load movies (u.item)
        print("  Loading movies...")
        movies_columns = ['movie_id', 'title', 'release_date', 'video_release_date',
                         'imdb_url', 'unknown', 'Action', 'Adventure', 'Animation',
                         'Children', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Fantasy',
                         'Film-Noir', 'Horror', 'Musical', 'Mystery', 'Romance', 'Sci-Fi',
                         'Thriller', 'War', 'Western']
        movies_df = pd.read_csv(
            data_dir / 'u.item',
            sep='|',
            names=movies_columns,
            encoding='latin-1'
        )
        
        # Convert genre columns to comma-separated string
        genre_cols = movies_columns[5:]  # Genre columns
        movies_df['genres'] = movies_df[genre_cols].apply(
            lambda row: ','.join([genre for genre, val in zip(genre_cols, row) if val == 1]),
            axis=1
        )
        
        # Calculate average ratings and counts
        rating_stats = ratings_df.groupby('movie_id').agg({
            'rating': ['mean', 'count']
        }).reset_index()
        rating_stats.columns = ['movie_id', 'avg_rating', 'rating_count']
        
        # Merge with movies
        movies_df = movies_df.merge(rating_stats, on='movie_id', how='left')
        movies_df['avg_rating'] = movies_df['avg_rating'].fillna(0)
        movies_df['rating_count'] = movies_df['rating_count'].fillna(0).astype(int)
        
        # Keep only needed columns
        movies_df = movies_df[['movie_id', 'title', 'release_date', 'genres', 'avg_rating', 'rating_count']]
        # Clear existing data and insert
        conn.execute('DELETE FROM movies')
        movies_df.to_sql('movies', conn, if_exists='append', index=False)
        print(f"  ✓ Loaded {len(movies_df):,} movies")
        
        # Load users (u.user: user_id, age, gender, occupation, zip_code)
        print("  Loading users...")
        users_columns = ['user_id', 'age', 'gender', 'occupation', 'zip_code']
        users_df = pd.read_csv(
            data_dir / 'u.user',
            sep='|',
            names=users_columns,
            encoding='latin-1'
        )
        
        # Add default credentials (username = user{id}, hashed password)
        from passlib.context import CryptContext
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        users_df['username'] = users_df['user_id'].apply(lambda x: f"user{x}")
        users_df['email'] = users_df['user_id'].apply(lambda x: f"user{x}@example.com")
        users_df['hashed_password'] = pwd_context.hash("pass123")
        
        # Clear existing data and insert without user_id (let it auto-generate)
        conn.execute('DELETE FROM users')
        # Don't include user_id - let SQLAlchemy auto-generate it
        users_insert_df = users_df[['age', 'gender', 'occupation', 'zip_code', 'username', 'email', 'hashed_password']]
        users_insert_df.to_sql('users', conn, if_exists='append', index=False)
        print(f"  ✓ Loaded {len(users_df):,} users")
        
        print("\n✅ Dataset loaded successfully!")
        print(f"   Database: {db_path}")
        print(f"   Users: {len(users_df):,}")
        print(f"   Movies: {len(movies_df):,}")
        print(f"   Ratings: {len(ratings_df):,}")
        return True
        
    except Exception as e:
        print(f"❌ Error loading data: {e}")
        return False
    finally:
        conn.close()


if __name__ == "__main__":
    success = load_movielens_data()
    sys.exit(0 if success else 1)
