import axios from 'axios'

// Determine if we're in development or production
const isDevelopment = import.meta.env.MODE === 'development'

// For development: use proxy
// For production: use full Render URL
const API_BASE_URL = isDevelopment 
  ? ''  // Empty string will use relative paths (proxy)
  : import.meta.env.VITE_API_BASE_URL || 'https://gig-flow-platform.onrender.com'

console.log('🔧 API Configuration:')
console.log('Mode:', import.meta.env.MODE)
console.log('API Base URL:', API_BASE_URL || '(using proxy)')

// Create axios instance
const api = axios.create({
  baseURL: isDevelopment ? '/api' : API_BASE_URL + '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🌐 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    })
    
    if (error.response?.status === 401) {
      localStorage.removeItem('authState')
      localStorage.removeItem('user')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    
    return Promise.reject(error)
  }
)

export default api