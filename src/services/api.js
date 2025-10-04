import axios from 'axios';

// The base URL of your backend server
const API_URL = 'http://localhost:5000/api';

// Function to get all listings
export const getAllListings = () => {
  return axios.get(`${API_URL}/listings`);
};

// Function to get a single listing by ID
export const getListingById = (id) => {
  return axios.get(`${API_URL}/listings/${id}`);
};

// You can add other functions here like:
// export const registerUser = (userData) => axios.post(`${API_URL}/users/register`, userData);
// export const loginUser = (credentials) => axios.post(`${API_URL}/users/login`, credentials);