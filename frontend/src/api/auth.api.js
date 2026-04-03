import api from './axios';

export const authApi = {
    getCsrfCookie: () => api.get(`${import.meta.env.VITE_BACKEND_URL}/sanctum/csrf-cookie`),

    login: async (credentials) => {
        await authApi.getCsrfCookie(); 
        return api.post('/login', credentials);
    },
    register: async (userData) => {
        await authApi.getCsrfCookie();
        return api.post('/register', userData);
    },
    getProfile: async () => await api.get('/user/profile'),
    logout: () => api.post('/logout'),
};