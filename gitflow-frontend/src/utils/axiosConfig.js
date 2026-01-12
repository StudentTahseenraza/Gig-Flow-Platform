import axios from 'axios'

// Get API URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL + '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
    return config
  },
  (error) => {
    console.error('🌐 API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('❌ API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    })
    
    if (error.response?.status === 401) {
      // Clear any stored auth data
      localStorage.removeItem('authState')
      localStorage.removeItem('user')
      
      // Redirect to login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)

export default api