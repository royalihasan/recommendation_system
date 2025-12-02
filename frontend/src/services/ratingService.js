/**
 * Rating service for user ratings.
 */
import api from './api';

export const ratingService = {
    async createRating(userId, movieId, rating) {
        const response = await api.post('/ratings', {
            user_id: parseInt(userId),
            movie_id: parseInt(movieId),
            rating: parseFloat(rating),
        });
        return response.data;
    },

    async getUserRatings(userId, page = 1, limit = 20) {
        const response = await api.get(`/ratings/user/${userId}`, {
            params: { page, limit },
        });
        return response.data;
    },

    async updateRating(ratingId, rating) {
        const response = await api.put(`/ratings/${ratingId}`, { rating });
        return response.data;
    },

    async deleteRating(ratingId) {
        const response = await api.delete(`/ratings/${ratingId}`);
        return response.data;
    },
};
