import axios from 'axios'

// Create axios instance with credentials
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // This is CRUCIAL for HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api