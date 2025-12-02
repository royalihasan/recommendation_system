/**
 * Movie service for fetching movie data.
 */
import api from './api';

export const movieService = {
    async getMovies(page = 1, limit = 20, search = '', genre = '') {
        const params = { page, limit };
        if (search) params.search = search;
        if (genre) params.genre = genre;

        const response = await api.get('/movies', { params });
        return response.data;
    },

    async getMovie(movieId) {
        const response = await api.get(`/movies/${movieId}`);
        return response.data;
    },

    async getPopularMovies(limit = 10) {
        const response = await api.get('/movies/popular/list', {
            params: { limit },
        });
        return response.data;
    },
};
