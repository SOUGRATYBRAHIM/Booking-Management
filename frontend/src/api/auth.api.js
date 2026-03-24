import apiClient from './axios';

export const authApi = {

    login: async (credentials) => {
        await apiClient.get('/sanctum/csrf-cookie');
        const response = await apiClient.post('/login', credentials);
        return response.data;
    },

    register: async (userData) => {
        await apiClient.get('/sanctum/csrf-cookie')
        const response = await apiClient.post('/register', userData);
        return response.data;
    },

    getProfile: async () => {
        const response = await apiClient.get('/user/profile');
        return response.data;
    },
};