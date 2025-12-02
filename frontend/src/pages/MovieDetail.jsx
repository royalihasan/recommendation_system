/**
 * Movie Detail Page with complete movie information
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieService, recommendationService, ratingService } from '../services';
import { useAuth } from '../context/AuthContext';
import MovieCarousel from '../components/MovieCarousel';
import RatingStars from '../components/RatingStars';
import Loader from '../components/Loader';
import './MovieDetail.css';

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [movie, setMovie] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    const fetchMovieDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch movie details using specific endpoint
            const foundMovie = await movieService.getMovie(id);
            setMovie(foundMovie);

            // Fetch similar movies
            try {
                const similar = await recommendationService.getSimilarMovies(parseInt(id), 12);
                setSimilarMovies(similar);
            } catch (err) {
                // Silent fail for similar movies (expected if not in training set)
                // console.warn('Similar movies not found:', err);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const [userRating, setUserRating] = useState(0);
    const [ratingMessage, setRatingMessage] = useState(null);

    const handleRate = async (rating) => {
        if (!user || !user.user_id) {
            setRatingMessage({ type: 'error', text: 'Please log in to rate.' });
            return;
        }
        try {
            await ratingService.createRating(user.user_id, movie.movie_id, rating);
            setUserRating(rating);
            setRatingMessage({ type: 'success', text: 'Rating submitted!' });

            // Clear success message after 3 seconds
            setTimeout(() => setRatingMessage(null), 3000);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setRatingMessage({ type: 'info', text: 'You already rated this.' });
            } else {
                console.error('Error submitting rating:', err);
                setRatingMessage({ type: 'error', text: 'Failed to submit rating.' });
            }
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="error-message">{error}</div>;
    if (!movie) return <div className="error-message">Movie not found</div>;

    return (
        <div className="movie-detail-page">
            {/* Backdrop */}
            <div className="movie-backdrop" style={{
                backgroundImage: movie.image_url ? `url(${movie.image_url})` : 'none'
            }}></div>

            <div className="movie-detail-content">
                {/* Header Section */}
                <div className="detail-header">
                    <button onClick={() => navigate(-1)} className="back-button">
                        ← Back
                    </button>
                </div>

                {/* Main Content */}
                <div className="detail-main">
                    {/* Poster */}
                    <div className="detail-poster">
                        {movie.image_url ? (
                            <img src={movie.image_url} alt={movie.title} />
                        ) : (
                            <div className="poster-placeholder-large">
                                {movie.title.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="detail-info">
                        <h1 className="detail-title">
                            {movie.title}
                            {movie.type && <span className="movie-type-badge">{movie.type}</span>}
                        </h1>

                        {/* Metadata */}
                        <div className="detail-meta">
                            {movie.imdb_score && (
                                <div className="meta-item">
                                    <span className="meta-label">⭐ IMDb:</span>
                                    <span className="meta-value">{movie.imdb_score}/10</span>
                                </div>
                            )}
                            {movie.runtime && (
                                <div className="meta-item">
                                    <span className="meta-label">⏱️ Runtime:</span>
                                    <span className="meta-value">{movie.runtime}</span>
                                </div>
                            )}
                            {movie.view_rating && (
                                <div className="meta-item">
                                    <span className="meta-label">🔞 Rating:</span>
                                    <span className="meta-value">{movie.view_rating}</span>
                                </div>
                            )}
                        </div>

                        {/* Genres */}
                        {movie.genres && movie.genres.length > 0 && (
                            <div className="detail-genres">
                                {movie.genres.map((genre, idx) => (
                                    <span key={idx} className="genre-badge">{genre}</span>
                                ))}
                            </div>
                        )}

                        {/* Summary */}
                        {movie.summary && (
                            <div className="detail-summary">
                                <h3>Synopsis</h3>
                                <p>{movie.summary}</p>
                            </div>
                        )}

                        {/* Cast & Crew */}
                        <div className="detail-cast">
                            {movie.director && (
                                <div className="cast-item">
                                    <span className="cast-label">🎬 Director:</span>
                                    <span className="cast-value">{movie.director}</span>
                                </div>
                            )}
                            {movie.actors && (
                                <div className="cast-item">
                                    <span className="cast-label">🎭 Cast:</span>
                                    <span className="cast-value">{movie.actors}</span>
                                </div>
                            )}
                            {movie.languages && (
                                <div className="cast-item">
                                    <span className="cast-label">🌐 Languages:</span>
                                    <span className="cast-value">{movie.languages}</span>
                                </div>
                            )}
                        </div>

                        {/* Rating (if user is logged in) */}
                        {user && (
                            <div className="detail-rating">
                                <h3>Rate this {movie.type || 'movie'}</h3>
                                <RatingStars
                                    rating={userRating}
                                    readonly={false}
                                    onChange={handleRate}
                                />
                                {ratingMessage && (
                                    <div className={`rating-message ${ratingMessage.type}`}>
                                        {ratingMessage.text}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Similar Movies Section */}
                {similarMovies.length > 0 && (
                    <div className="similar-section">
                        <h2>Similar {movie.type || 'Movies'}</h2>
                        <MovieCarousel movies={similarMovies} title="" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieDetail;
