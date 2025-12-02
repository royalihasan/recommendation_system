"""Rating database model."""
from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Rating(Base):
    """Rating model for user-movie interactions."""
    
    __tablename__ = "ratings"
    
    rating_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False, index=True)
    movie_id = Column(Integer, ForeignKey("movies.movie_id"), nullable=False, index=True)
    rating = Column(Float, nullable=False)  # 1-5 stars
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
