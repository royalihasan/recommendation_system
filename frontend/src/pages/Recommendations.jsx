/**
 * Recommendations page showing personalized movie suggestions.
 */
import { useState, useEffect } from 'react';
import { recommendationService, ratingService } from '../services';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import './Recommendations.css';

const Recommendations = () => {
    const { user } = useAuth();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [ratingCount, setRatingCount] = useState(0);

    useEffect(() => {
        if (user && user.user_id) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch user ratings count
            const ratingsData = await ratingService.getUserRatings(user.user_id, 1, 1);
            setRatingCount(ratingsData.total);

            // Fetch recommendations
            const data = await recommendationService.getRecommendations(user.user_id, 20);
            setRecommendations(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="error-message">Error: {error}</div>;

    const isPersonalized = ratingCount >= 5;

    return (
        <div className="recommendations-page">
            <div className="container">
                <div className="recommendations-header">
                    <h1>
                        {isPersonalized ? '✨ Recommended For You' : '🔥 Popular Movies'}
                    </h1>
                    <p>
                        {isPersonalized
                            ? 'Personalized suggestions based on your unique taste'
                            : `Rate ${5 - ratingCount} more movies to unlock personalized recommendations! Showing popular movies for now.`}
                    </p>
                </div>

                {recommendations.length === 0 ? (
                    <div className="empty-state">
                        <h3>No movies found</h3>
                    </div>
                ) : (
                    <div className="movie-grid">
                        {recommendations.map((movie) => (
                            <MovieCard
                                key={movie.movie_id}
                                movie={movie}
                                showPredictedRating={isPersonalized}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recommendations;
