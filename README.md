# Netflix-Style Movie Recommendation System

A complete movie recommendation system built with collaborative filtering (SVD algorithm), featuring a FastAPI backend and React frontend.

## 🎯 Features

- **Personalized Recommendations**: SVD collaborative filtering for accurate predictions
- **User Authentication**: Secure JWT-based auth system
- **Movie Catalog**: Browse 1,682 movies with search and filtering
- **Rating System**: Rate movies from 1-5 stars
- **Popular Movies**: Discover trending and highly-rated content
- **Responsive UI**: Modern, premium design that works on all devices

## 🏗️ Architecture

```
recommendation_system/
├── backend/           # FastAPI backend with ML model
│   ├── app/
│   │   ├── api/      # REST API endpoints
│   │   ├── ml/       # SVD model & recommender
│   │   ├── models/   # Database models
│   │   └── schemas/  # Pydantic schemas
│   ├── data/         # SQLite DB & trained model
│   └── scripts/      # Data loading & training
│
└── frontend/          # React frontend
    └── src/
        ├── components/  # Reusable UI components
        ├── pages/       # Page components
        ├── services/    # API integration
        └── context/     # State management
```

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 16+
- npm or yarn

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Download MovieLens 100k dataset
cd data
wget http://files.grouplens.org/datasets/movielens/ml-100k.zip
unzip ml-100k.zip
cd ..

# Load data into database
python scripts/load_movielens.py

# Train recommendation model
python app/ml/train_model.py

# Run the server
uvicorn app.main:app --reload
```

Backend will be available at http://localhost:8000

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will be available at http://localhost:3000

## 📊 Dataset

Using **MovieLens 100k**:
- 943 users
- 1,682 movies
- 100,000 ratings

Default user credentials:
- Username: `user1` to `user943`
- Password: `password123`

## 🤖 ML Model

**Algorithm**: SVD (Singular Value Decomposition)

**Parameters**:
- Latent factors: 100
- Epochs: 20
- Learning rate: 0.005
- Regularization: 0.02

**Performance**:
- RMSE: ~0.93
- MAE: ~0.73

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get JWT token

### Movies
- `GET /api/v1/movies` - List movies (paginated, searchable)
- `GET /api/v1/movies/{id}` - Get movie details
- `GET /api/v1/movies/popular/list` - Get popular movies

### Ratings
- `POST /api/v1/ratings` - Create rating
- `GET /api/v1/ratings/user/{id}` - Get user ratings
- `PUT /api/v1/ratings/{id}` - Update rating
- `DELETE /api/v1/ratings/{id}` - Delete rating

### Recommendations
- `GET /api/v1/recommendations/{user_id}` - Get personalized recommendations
- `GET /api/v1/recommendations/similar/{movie_id}` - Get similar movies

📖 **Full API Documentation**: http://localhost:8000/docs

## 🎨 Frontend Features

- **Premium UI**: Modern gradients, animations, and micro-interactions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Protected Routes**: Auth-required pages for personalized features
- **Error Handling**: Graceful error messages and loading states
- **Search & Pagination**: Efficient movie browsing

## 🔧 Tech Stack

### Backend
- FastAPI - Modern Python web framework
- SQLAlchemy - ORM for database operations
- Surprise - Recommender system library
- SQLite - Lightweight database
- JWT - Authentication tokens
- Pandas/NumPy - Data processing

### Frontend
- React 18 - UI library
- Vite - Build tool
- React Router - Client-side routing
- Axios - HTTP client
- Inter Font - Typography

## 📝 Project Structure Details

### Backend Key Files
- `app/main.py` - FastAPI app initialization
- `app/ml/recommender.py` - Recommendation engine
- `app/ml/train_model.py` - Model training script
- `scripts/load_movielens.py` - Dataset loader

### Frontend Key Files
- `src/App.jsx` - Main app with routing
- `src/context/AuthContext.jsx` - Auth state management
- `src/services/` - API integration layer
- `src/components/MovieCard.jsx` - Reusable movie card

## 🔐 Security

- Password hashing with bcrypt
- JWT tokens for stateless authentication
- CORS configuration for frontend
- Input validation with Pydantic

## 🚦 Development Workflow

1. **Data Preparation**: Load MovieLens dataset
2. **Model Training**: Train SVD model with cross-validation
3. **Backend Development**: Implement API endpoints
4. **Frontend Development**: Build React components
5. **Integration Testing**: E2E testing of full flow
6. **Deployment**: Production build and deployment

## 📈 Future Enhancements

- [ ] Content-based filtering (hybrid approach)
- [ ] Real-time model updates (online learning)
- [ ] PostgreSQL for production
- [ ] Movie posters via TMDB API
- [ ] User profiles and preferences
- [ ] Social features (reviews, lists)
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 🐛 Troubleshooting

**Backend won't start:**
- Ensure virtual environment is activated
- Check all dependencies are installed
- Verify database exists at `backend/data/database.db`

**Model not found:**
- Run `python app/ml/train_model.py` first
- Check `backend/data/trained_model.pkl` exists

**Frontend API errors:**
- Ensure backend is running on port 8000
- Check CORS configuration in `backend/app/main.py`
- Verify `.env` file has correct API URL

## 📄 License

MIT License - Feel free to use for learning and projects!

## 🙏 Acknowledgments

- MovieLens dataset by GroupLens Research
- Surprise library for collaborative filtering
- FastAPI and React communities

---

**Happy Movie Watching! 🎬🍿**
