import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor: Attach the token to every outgoing request
apiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors like 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => {
    // If the request succeeds, just return the data
    return response;
  },
  (error) => {
    const { response } = error;

    // If the backend says the token is invalid or expired
    if (response && response.status === 401) {
      toast.error('Session expired. Please log in again.');
      store.dispatch(logout());
    } 
    // Handle standard server errors
    else if (response && response.status >= 500) {
      toast.error('Server error. Please try again later.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;