"""TMDB API integration for movie posters and metadata."""
import requests
from typing import Optional, Dict
from app.config import settings

TMDB_API_KEY = settings.TMDB_API_KEY
TMDB_BASE_URL = "https://api.themoviedb.org/3"
TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"


def search_movie_tmdb(title: str, year: Optional[str] = None) -> Optional[Dict]:
    """
    Search for a movie on TMDB and return poster URL and metadata.
    
    Args:
        title: Movie title
        year: Optional release year to narrow search
        
    Returns:
        Dictionary with poster_url, backdrop_url, overview, etc.
    """
    if not TMDB_API_KEY:
        return None
    
    try:
        # Extract year from title if present (e.g., "Movie Title (1995)")
        import re
        year_match = re.search(r'\((\d{4})\)', title)
        if year_match and not year:
            year = year_match.group(1)
            title = re.sub(r'\s*\(\d{4}\)', '', title).strip()
        
        # Search for the movie
        params = {
            'api_key': TMDB_API_KEY,
            'query': title,
        }
        if year:
            params['year'] = year
        
        response = requests.get(
            f"{TMDB_BASE_URL}/search/movie",
            params=params,
            timeout=5
        )
        response.raise_for_status()
        
        results = response.json().get('results', [])
        if not results:
            return None
        
        # Get the first result
        movie = results[0]
        
        return {
            'poster_url': f"{TMDB_IMAGE_BASE_URL}/w500{movie['poster_path']}" if movie.get('poster_path') else None,
            'backdrop_url': f"{TMDB_IMAGE_BASE_URL}/w1280{movie['backdrop_path']}" if movie.get('backdrop_path') else None,
            'overview': movie.get('overview'),
            'tmdb_id': movie.get('id'),
            'vote_average': movie.get('vote_average'),
            'release_date': movie.get('release_date'),
        }
    
    except Exception as e:
        print(f"Error fetching TMDB data for '{title}': {e}")
        return None


def get_poster_url(title: str, size: str = 'w500') -> Optional[str]:
    """
    Quick helper to get just the poster URL.
    
    Args:
        title: Movie title
        size: Poster size (w92, w154, w185, w342, w500, w780, original)
        
    Returns:
        Poster URL or None
    """
    movie_data = search_movie_tmdb(title)
    if movie_data and movie_data.get('poster_url'):
        return movie_data['poster_url'].replace('/w500/', f'/{size}/')
    return None
