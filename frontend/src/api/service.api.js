import api from './axios';

export const serviceApi = {
    getAll: () => api.get('/services'),
    getCategories: () => api.get('/categories'),
};