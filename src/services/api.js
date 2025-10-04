import axios from 'axios';

// The base URL of your backend server
const API_URL = 'http://localhost:5000/api';

// --- Listing Functions ---

// Function to get all listings
export const getAllListings = () => {
  return axios.get(`${API_URL}/listings`);
};

// Function to get a single listing by ID
export const getListingById = (id) => {
  return axios.get(`${API_URL}/listings/${id}`);
};

// Function to create a new listing
export const createListing = (listingData) => {
  // In the future, you'll also send the user's token here
  return axios.post(`${API_URL}/listings`, listingData);
};


// --- User Authentication Functions (Newly Added) ---

// Function to register a new user
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/users/register`, userData);
};

// Function to log in a user
export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/users/login`, credentials);
};