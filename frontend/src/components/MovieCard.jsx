/**
 * MovieCard component for displaying movie information with Netflix posters.
 */
import { useNavigate } from 'react-router-dom';
import RatingStars from './RatingStars';
import './MovieCard.css';

const MovieCard = ({ movie, showPredictedRating = false }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.movie_id}`);
    };

    const firstLetter = movie.title ? movie.title.charAt(0).toUpperCase() : 'M';
    const hasImage = movie.image_url || movie.poster_url;
    const imageUrl = movie.image_url || movie.poster_url;

    return (
        <div className="movie-card" onClick={handleClick}>
            <div className="movie-poster">
                {hasImage ? (
                    <img
                        src={imageUrl}
                        alt={movie.title}
                        className="poster-image"
                        loading="lazy"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                <div className="poster-placeholder" style={{ display: hasImage ? 'none' : 'flex' }}>
                    {firstLetter}
                </div>
            </div>

            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>

                {movie.genres && movie.genres.length > 0 && (
                    <div className="movie-genres">
                        {movie.genres.slice(0, 3).map((genre, idx) => (
                            <span key={idx} className="genre-tag">{genre}</span>
                        ))}
                    </div>
                )}

                {showPredictedRating ? (
                    <div className="predicted-rating">
                        <span className="rating-label">Predicted:</span>
                        <RatingStars rating={movie.predicted_rating} readonly />
                        <span className="rating-value">{movie.predicted_rating?.toFixed(1)}</span>
                    </div>
                ) : (
                    <div className="average-rating">
                        <RatingStars rating={movie.avg_rating || movie.imdb_score} readonly />
                        <span className="rating-value">
                            {(movie.avg_rating || movie.imdb_score)?.toFixed(1)}
                            {movie.imdb_score && ` (IMDb)`}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieCard;
