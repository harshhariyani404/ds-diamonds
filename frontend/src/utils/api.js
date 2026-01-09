import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'https://ds-diamonds.onrender.com';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (username, email, password) =>
    api.post('/auth/register', { username, email, password }),
  getMe: () => api.get('/auth/me'),
};

// Diamonds API
export const diamondsAPI = {
  getAll: (params) => api.get('/diamonds', { params }),
  getById: (id) => api.get(`/diamonds/${id}`),
  create: (data) => api.post('/diamonds', data),
  update: (id, data) => api.put(`/diamonds/${id}`, data),
  delete: (id) => api.delete(`/diamonds/${id}`),
};

export default api;