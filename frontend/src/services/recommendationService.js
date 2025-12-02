/**
 * Recommendation service for getting personalized suggestions.
 */
import api from './api';

export const recommendationService = {
    async getRecommendations(userId, limit = 10) {
        const response = await api.get(`/recommendations/${userId}`, {
            params: { limit },
        });
        return response.data;
    },

    async getSimilarMovies(movieId, limit = 10) {
        const response = await api.get(`/recommendations/similar/${movieId}`, {
            params: { limit },
        });
        return response.data;
    },
};
