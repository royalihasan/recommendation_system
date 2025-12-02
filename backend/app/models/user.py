"""User database model."""
from sqlalchemy import Column, Integer, String
from app.database import Base


class User(Base):
    """User model for authentication and profiles."""
    
    __tablename__ = "users"
    
    user_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=True)
    hashed_password = Column(String, nullable=False)
    age = Column(Integer, nullable=True)
    gender = Column(String, nullable=True)
    occupation = Column(String, nullable=True)
    zip_code = Column(String, nullable=True)
