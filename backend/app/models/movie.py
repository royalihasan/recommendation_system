"""Movie database model."""
from sqlalchemy import Column, Integer, String, Float, Text
from app.database import Base


class Movie(Base):
    """Movie model for catalog with Netflix dataset fields."""
    
    __tablename__ = "movies"
    
    movie_id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    release_date = Column(String, nullable=True)
    genres = Column(String, nullable=True)  # Comma-separated genres
    avg_rating = Column(Float, default=0.0)
    rating_count = Column(Integer, default=0)
    
    # Netflix dataset fields
    image_url = Column(String, nullable=True)
    summary = Column(Text, nullable=True)
    director = Column(String, nullable=True)
    actors = Column(String, nullable=True)
    imdb_score = Column(Float, nullable=True)
    runtime = Column(String, nullable=True)
    type = Column(String, nullable=True)  # Movie or Series
    tags = Column(String, nullable=True)
    languages = Column(String, nullable=True)
    view_rating = Column(String, nullable=True)  # PG, R, etc.
