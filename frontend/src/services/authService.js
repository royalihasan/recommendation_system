/**
 * Authentication service for login/register operations.
 */
import api from './api';

export const authService = {
    async register(username, email, password) {
        const response = await api.post('/auth/register', {
            username,
            email,
            password,
        });
        return response.data;
    },

    async login(username, password) {
        const response = await api.post('/auth/login', {
            username,
            password,
        });

        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
            // Store user info from response
            const user = {
                username: response.data.username,
                user_id: response.data.user_id
            };
            localStorage.setItem('user', JSON.stringify(user));
        }

        return response.data;
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    },
};
