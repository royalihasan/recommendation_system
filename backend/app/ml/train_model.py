"""SVD model training script."""
import pickle
from surprise import Dataset, Reader, SVD
from surprise.model_selection import cross_validate, train_test_split
import sqlite3
import pandas as pd
from pathlib import Path
import sys

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent.parent))


def train_svd_model(db_path='data/database.db', model_path='data/trained_model.pkl'):
    """
    Train SVD collaborative filtering model.
    
    Args:
        db_path: Path to SQLite database
        model_path: Path to save trained model
        
    Returns:
        Trained SVD algorithm
    """
    print("🤖 Training SVD Recommendation Model...")
    print("=" * 60)
    
    # Load ratings from database
    print("\n1. Loading rating data...")
    base_dir = Path(__file__).parent.parent.parent
    db_full_path = base_dir / db_path
    
    if not db_full_path.exists():
        print(f"❌ Error: Database not found at {db_full_path}")
        print("Please run 'python scripts/load_movielens.py' first")
        return None
    
    conn = sqlite3.connect(db_full_path)
    ratings_df = pd.read_sql_query("SELECT user_id, movie_id, rating FROM ratings", conn)
    conn.close()
    
    print(f"   ✓ Loaded {len(ratings_df):,} ratings")
    print(f"   ✓ {ratings_df['user_id'].nunique():,} unique users")
    print(f"   ✓ {ratings_df['movie_id'].nunique():,} unique movies")
    
    # Define rating scale for Surprise
    print("\n2. Preparing data for Surprise library...")
    reader = Reader(rating_scale=(1, 5))
    data = Dataset.load_from_df(ratings_df[['user_id', 'movie_id', 'rating']], reader)
    
    # Split data for evaluation
    trainset, testset = train_test_split(data, test_size=0.2, random_state=42)
    print(f"   ✓ Training set: {trainset.n_ratings:,} ratings")
    print(f"   ✓ Test set: {len(testset):,} ratings")
    
    # Initialize SVD algorithm
    print("\n3. Initializing SVD algorithm...")
    print("   Parameters:")
    print("   - Latent factors: 100")
    print("   - Epochs: 20")
    print("   - Learning rate: 0.005")
    print("   - Regularization: 0.02")
    
    algo = SVD(
        n_factors=100,      # Number of latent factors
        n_epochs=20,        # Number of iterations
        lr_all=0.005,       # Learning rate
        reg_all=0.02,       # Regularization term
        random_state=42
    )
    
    # Train the model
    print("\n4. Training model...")
    algo.fit(trainset)
    print("   ✓ Training complete")
    
    # Cross-validate
    print("\n5. Running 5-fold cross-validation...")
    results = cross_validate(algo, data, measures=['RMSE', 'MAE'], cv=5, verbose=True)
    
    avg_rmse = results['test_rmse'].mean()
    avg_mae = results['test_mae'].mean()
    
    print(f"\n📊 Model Performance:")
    print(f"   RMSE: {avg_rmse:.4f}")
    print(f"   MAE:  {avg_mae:.4f}")
    
    # Train on full dataset for production
    print("\n6. Training on full dataset for production...")
    full_trainset = data.build_full_trainset()
    algo.fit(full_trainset)
    
    # Save model
    print(f"\n7. Saving model to {model_path}...")
    model_full_path = base_dir / model_path
    model_full_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(model_full_path, 'wb') as f:
        pickle.dump(algo, f)
    
    print(f"   ✓ Model saved ({model_full_path.stat().st_size / 1024 / 1024:.2f} MB)")
    
    print("\n" + "=" * 60)
    print("✅ Model training complete!")
    print("=" * 60)
    
    return algo


if __name__ == "__main__":
    model = train_svd_model()
    sys.exit(0 if model is not None else 1)
