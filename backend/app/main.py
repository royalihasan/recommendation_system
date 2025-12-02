"""FastAPI main application."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, movies, ratings, recommendations
from app.database import init_db
from app.config import settings

app = FastAPI(
    title="Movie Recommendation API",
    description="Netflix-style recommendation system using SVD collaborative filtering",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware - Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)


# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    """Initialize database tables on app startup."""
    init_db()
    print("✓ Database initialized")
    print(f"✓ API running at http://localhost:8000")
    print(f"✓ Docs available at http://localhost:8000/docs")


# Health check endpoint
@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Movie Recommendation API",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "auth": "/api/v1/auth",
            "movies": "/api/v1/movies",
            "ratings": "/api/v1/ratings",
            "recommendations": "/api/v1/recommendations"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


# Include API routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(movies.router, prefix="/api/v1")
app.include_router(ratings.router, prefix="/api/v1")
app.include_router(recommendations.router, prefix="/api/v1")
