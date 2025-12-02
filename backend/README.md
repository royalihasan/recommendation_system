# Netflix-Style Movie Recommendation System - Backend

A FastAPI-based backend for a movie recommendation system using collaborative filtering (SVD algorithm).

## Features

- 🎬 Movie catalog with search and filtering
- ⭐ User rating system (1-5 stars)
- 🤖 Personalized recommendations using SVD collaborative filtering
- 🔐 JWT-based authentication
- 📊 Popular movies and similar movie suggestions
- 🗄️ SQLite database with MovieLens 100k dataset

## Tech Stack

- **Framework**: FastAPI
- **ML**: Surprise library (SVD algorithm)
- **Database**: SQLite + SQLAlchemy
- **Auth**: JWT (python-jose)
- **Data**: MovieLens 100k dataset

## Project Structure

```
backend/
├── app/
│   ├── api/              # API routes
│   ├── ml/               # Machine learning components
│   ├── models/           # SQLAlchemy models
│   ├── schemas/          # Pydantic schemas
│   ├── utils/            # Utility functions
│   ├── config.py         # Configuration
│   ├── database.py       # Database setup
│   └── main.py           # FastAPI app
├── data/                 # Data storage
├── scripts/              # Utility scripts
└── requirements.txt      # Dependencies
```

## Setup Instructions

### 1. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Download MovieLens Dataset

```bash
cd data
wget http://files.grouplens.org/datasets/movielens/ml-100k.zip
unzip ml-100k.zip
cd ..
```

### 4. Load Dataset into Database

```bash
python scripts/load_movielens.py
```

This will:
- Load 100,000 ratings from 943 users on 1,682 movies
- Create users with credentials (username: `user1`, password: `password123`)
- Calculate movie statistics

### 5. Train Recommendation Model

```bash
python app/ml/train_model.py
```

This will:
- Train SVD model with 100 latent factors
- Run 5-fold cross-validation
- Save trained model to `data/trained_model.pkl`

Expected performance: RMSE ~0.93, MAE ~0.73

### 6. Configure Environment

```bash
cp .env.example .env
# Edit .env and set SECRET_KEY (generate with: openssl rand -hex 32)
```

### 7. Run the Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get JWT token
- `GET /api/v1/auth/me` - Get current user

### Movies
- `GET /api/v1/movies` - List movies (with pagination, search, filters)
- `GET /api/v1/movies/{movie_id}` - Get movie details
- `GET /api/v1/movies/popular/list` - Get popular movies

### Ratings
- `POST /api/v1/ratings` - Create rating
- `GET /api/v1/ratings/user/{user_id}` - Get user ratings
- `PUT /api/v1/ratings/{rating_id}` - Update rating
- `DELETE /api/v1/ratings/{rating_id}` - Delete rating

### Recommendations
- `GET /api/v1/recommendations/{user_id}` - Get personalized recommendations
- `GET /api/v1/recommendations/similar/{movie_id}` - Get similar movies

## Usage Examples

### Register a User

```bash
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "email": "john@example.com", "password": "secure123"}'
```

### Login

```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "password": "secure123"}'
```

### Get Recommendations

```bash
curl "http://localhost:8000/api/v1/recommendations/1?limit=10"
```

### Rate a Movie

```bash
curl -X POST "http://localhost:8000/api/v1/ratings" \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "movie_id": 50, "rating": 5}'
```

## Model Information

The recommendation system uses **SVD (Singular Value Decomposition)** collaborative filtering:

- **Algorithm**: Matrix factorization
- **Latent Factors**: 100
- **Training Epochs**: 20
- **Learning Rate**: 0.005
- **Regularization**: 0.02

The model predicts how users will rate unwatched movies based on their rating history and patterns from similar users.

## Development

### Run Tests

```bash
pytest tests/
```

### Format Code

```bash
black app/
```

### Lint Code

```bash
flake8 app/
```

## Notes

- Default users from MovieLens dataset have username `user{id}` and password `password123`
- Model should be retrained periodically as new ratings are added
- For production, use PostgreSQL instead of SQLite
- Set a strong SECRET_KEY in production

## License

MIT License - Feel free to use for learning and projects
