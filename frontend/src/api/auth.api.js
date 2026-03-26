import apiClient from './axios';

export const authApi = {

    login: async (credentials) => {
        await apiClient.get('/sanctum/csrf-cookie');
        const response = await apiClient.post('/api/login', credentials);
        return response.data;
    },

    register: async (userData) => {
        await apiClient.get('/sanctum/csrf-cookie')
        const response = await apiClient.post('/api/register', userData);
        return response.data;
    },

    getProfile: async () => {
        const response = await apiClient.get('/api/user/profile');
        return response.data;
    },
};