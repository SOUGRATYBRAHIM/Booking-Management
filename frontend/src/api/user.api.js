import api from './axios';

export const userApi = {
    updateProfile: (formData) => api.post('/user/profile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }),
    
    updatePassword: (data) => api.put('/user/password', data),
    deleteAccount: (data) => api.delete('/user/account', { data }),
};