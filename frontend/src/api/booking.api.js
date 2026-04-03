import api from './axios';

export const bookingApi = {
    // 🔒 Protected Routes (Admin)
    getAll: () => api.get('/bookings'),
    getById: (id) => api.get(`/bookings/${id}`),
    updateStatus: (id, status) => api.put(`/bookings/${id}/status`, { status }),

    // 🌍 Public Route
    submitBooking: (slug, data) => api.post(`/p/${slug}/book`, data),
};