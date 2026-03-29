import api from './axios';

// await api.get(`${import.meta.env.VITE_BACKEND_URL}/sanctum/csrf-cookie`);
export const authApi = {
    
    login: async (credentials) => {
        await api.get(`${import.meta.env.VITE_BACKEND_URL}/sanctum/csrf-cookie`);
        const response = await api.post('/login', credentials);
        return response;
    },

    register: async (userData) => {
        await api.get(`${import.meta.env.VITE_BACKEND_URL}/sanctum/csrf-cookie`);
        const response = await api.post('/register', userData);
        return response;
    },

    getProfile: async () => {
        await api.get(`${import.meta.env.VITE_BACKEND_URL}/sanctum/csrf-cookie`);
        const response = await api.get('/user/profile');
        return response;
    },
};