import axios from 'axios'

// Create axios instance (works for both local & deployed)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
  withCredentials: true, // REQUIRED for HttpOnly cookies (auth)
  headers: {
    'Content-Type': 'application/json',
  },
})

// Optional: request interceptor (debug / token logic if needed later)
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor (global auth handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // If user is unauthorized, redirect to login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
