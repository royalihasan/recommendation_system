/**
 * Movies page with search and filtering.
 */
import { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import './Movies.css';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    // Debounced search effect
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setPage(1); // Reset to page 1 on new search
            fetchMovies();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    // Pagination effect
    useEffect(() => {
        fetchMovies();
    }, [page]);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const data = await movieService.getMovies(page, 20, search);
            setMovies(data.movies);
            setTotal(data.total);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(total / 20);

    return (
        <div className="movies-page">
            <div className="container">
                <div className="movies-header">
                    <h1>🎬 Movie Catalog</h1>
                    <p>{total.toLocaleString()} movies available</p>
                </div>

                <div className="movies-search-container">
                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Search for movies..."
                    />
                </div>

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="movie-grid">
                            {movies.map((movie) => (
                                <MovieCard key={movie.movie_id} movie={movie} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="pagination-button"
                                >
                                    Previous
                                </button>
                                <span className="pagination-info">
                                    Page {page} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="pagination-button"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Movies;
