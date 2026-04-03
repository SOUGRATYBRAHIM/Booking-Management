import api from './axios';

export const pageApi = {
    // 🔒 Protected Routes (Admin)
    getAll: () => api.get('/pages'),
    getById: (id) => api.get(`/pages/${id}`),
    create: (data) => api.post('/pages', data),
    update: (id, data) => api.put(`/pages/${id}`, data),
    delete: (id) => api.delete(`/pages/${id}`),

    // 🌍 Public Route
    getPublicPage: (slug) => api.get(`/p/${slug}`),
};