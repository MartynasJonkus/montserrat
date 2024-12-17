import axios from 'axios';

// Base URL for the backend API
const apiClient = axios.create({
  baseURL: 'http://localhost:5282/api', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to each request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Retrieve token from storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
