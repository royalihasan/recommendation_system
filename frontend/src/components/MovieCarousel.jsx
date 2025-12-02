/**
 * Netflix-style horizontal scrolling carousel.
 */
import { useRef } from 'react';
import MovieCard from './MovieCard';
import './MovieCarousel.css';

const MovieCarousel = ({ title, movies, icon = '🎬' }) => {
    const carouselRef = useRef(null);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = direction === 'left' ? -800 : 800;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!movies || movies.length === 0) {
        return null;
    }

    return (
        <div className="movie-carousel">
            <h2 className="carousel-title">
                <span className="carousel-icon">{icon}</span>
                {title}
            </h2>

            <div className="carousel-container">
                <button
                    className="carousel-button carousel-button-left"
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    ‹
                </button>

                <div className="carousel-track" ref={carouselRef}>
                    {movies.map((movie) => (
                        <div key={movie.movie_id} className="carousel-item">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-button carousel-button-right"
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    ›
                </button>
            </div>
        </div>
    );
};

export default MovieCarousel;
