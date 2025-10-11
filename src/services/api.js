import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create a new Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Use an interceptor to add the token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Public Routes ---
export const getAllListings = () => api.get('/listings');
export const getListingById = (id) => api.get(`/listings/${id}`);
export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (credentials) => api.post('/users/login', credentials);

// --- Protected Routes ---
export const createListing = (listingData) => api.post('/listings', listingData);
export const updateListing = (id, listingData) => api.put(`/listings/${id}`, listingData);
export const deleteListing = (id) => api.delete(`/listings/${id}`);