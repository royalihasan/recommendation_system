/**
 * Home page with optimized loading, search, and recommendations
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { movieService, recommendationService } from '../services';
import { useAuth } from '../context/AuthContext';
import MovieCarousel from '../components/MovieCarousel';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import './Home.css';

const Home = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState([]);
    const [genreMovies, setGenreMovies] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allMovies, setAllMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, [user]);

    // Search filtering with debouncing
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.trim().length > 0) {
                setLoading(true);
                try {
                    const response = await movieService.getMovies(1, 20, searchQuery);
                    setSearchResults(response.movies);
                } catch (error) {
                    console.error('Error searching movies:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setSearchResults([]);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            // Load 50 movies initially to populate more genres
            const response = await movieService.getMovies(1, 50);
            const movies = response.movies;
            setAllMovies(movies);

            // If user is logged in, get personalized recommendations
            if (user) {
                try {
                    const recs = await recommendationService.getRecommendations(1, 12);
                    setRecommendations(recs);
                } catch (error) {
                    console.error('Error fetching recommendations:', error);
                }
            }

            // Group movies by genre
            const genres = {};
            movies.forEach(movie => {
                if (movie.genres && movie.genres.length > 0) {
                    movie.genres.forEach(genre => {
                        if (!genres[genre]) {
                            genres[genre] = [];
                        }
                        if (genres[genre].length < 10) {
                            genres[genre].push(movie);
                        }
                    });
                }
            });

            // Get top 10 genres
            const topGenres = Object.keys(genres)
                .filter(g => genres[g].length >= 3)
                .sort((a, b) => genres[b].length - genres[a].length)
                .slice(0, 10);

            const genreData = {};
            topGenres.forEach(genre => {
                genreData[genre] = genres[genre].sort((a, b) => (b.imdb_score || b.avg_rating || 0) - (a.imdb_score || a.avg_rating || 0));
            });

            setGenreMovies(genreData);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-page">
            <div className="hero-section">
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search for movies, genres, or actors..."
                />
            </div>

            <div className="home-content">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {/* Search Results */}
                        {searchResults.length > 0 && (
                            <>
                                <div className="section-header">
                                    <h2>🔍 Search Results ({searchResults.length})</h2>
                                </div>
                                <MovieCarousel
                                    title=""
                                    movies={searchResults}
                                    icon=""
                                />
                            </>
                        )}

                        {/* Show regular content only if not searching */}
                        {searchQuery.trim().length === 0 && (
                            <>
                                {/* Recommendations Section */}
                                {user && recommendations.length > 0 && (
                                    <>
                                        <div className="recommendations-header">
                                            <h2>✨ Recommended For You</h2>
                                            <p>Based on your ratings and users with similar taste</p>
                                            <Link to="/recommendations" className="view-all-link">
                                                View All →
                                            </Link>
                                        </div>
                                        <MovieCarousel
                                            title=""
                                            movies={recommendations}
                                            icon=""
                                        />
                                    </>
                                )}

                                {/* Genre Sections */}
                                <div className="genre-section-header">
                                    <h2>🎬 Browse by Genre</h2>
                                </div>

                                {Object.keys(genreMovies).map(genre => (
                                    <MovieCarousel
                                        key={genre}
                                        title={genre}
                                        movies={genreMovies[genre]}
                                        icon=""
                                    />
                                ))}

                                <div className="load-more-section">
                                    <Link to="/movies" className="load-more-button">
                                        Browse All Movies →
                                    </Link>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
