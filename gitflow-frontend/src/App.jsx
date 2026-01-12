import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { store } from './store/store'
import { getMe } from './store/slices/authSlice'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import GigsPage from './pages/GigsPage'
import ProtectedRoute from './components/ProtectedRoute'
import GigDetailPage from './pages/GigDetailPage'
import CreateGigPage from './pages/CreateGigPage'
import ProfilePage from './pages/ProfilePage'


function App() {
  useEffect(() => {
    // Check if user is logged in on app load
    store.dispatch(getMe())
  }, [])

  // Add this useEffect to monitor auth state
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState()
      console.log('Auth State:', state.auth)
      console.log('Cookies:', document.cookie)
    })
    
    return unsubscribe
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'bg-gray-800 border border-gray-700',
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid #374151',
              },
            }}
          />
          
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/gigs" element={<GigsPage />} />
                <Route path="/gigs/new" element={<CreateGigPage />} />
                <Route path="/gigs/:id" element={<GigDetailPage />} />
                <Route path="/profile" element={<ProfilePage />} />

              </Route>
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  )
}

export default App