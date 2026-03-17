import apiClient from './axios';

export const authApi = {

    login: async (credentials) => {
        const response = await apiClient.post('/login', credentials);
        return response.data;
    },

    register: async (userData) => {
        const response = await apiClient.post('/register', userData);
        return response.data;
    },

    getProfile: async () => {
        const response = await apiClient.get('/user/profile');
        return response.data;
    },
};