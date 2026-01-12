export const debugAPI = () => {
  console.log('🔧 API Configuration Debug:')
  console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL)
  console.log('NODE_ENV:', import.meta.env.MODE)
  
  // Test API endpoints
  const endpoints = [
    '/api/auth/me',
    '/api/auth/logout',
    '/api/health'
  ]
  
  endpoints.forEach(endpoint => {
    const fullUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000') + endpoint
    console.log(`🔗 ${endpoint}: ${fullUrl}`)
  })
}