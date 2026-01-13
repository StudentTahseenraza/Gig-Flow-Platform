export const getAPIBaseURL = () => {
  if (import.meta.env.MODE === 'development') {
    return '/api' // Proxy in development
  }
  return (import.meta.env.VITE_API_BASE_URL || 'https://gig-flow-platform.onrender.com') + '/api'
}

export const getSocketURL = () => {
  if (import.meta.env.MODE === 'development') {
    return 'http://localhost:5000'
  }
  return import.meta.env.VITE_API_BASE_URL || 'https://gig-flow-platform.onrender.com'
}