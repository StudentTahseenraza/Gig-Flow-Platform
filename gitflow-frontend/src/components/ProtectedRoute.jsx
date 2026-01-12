import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth)
  const location = useLocation()
  const [checkedAuth, setCheckedAuth] = useState(false)

  useEffect(() => {
    // Small delay to ensure auth state is loaded
    const timer = setTimeout(() => {
      setCheckedAuth(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  if (loading || !checkedAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto" />
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated)
  console.log('ProtectedRoute - Path:', location.pathname)

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location.pathname }} replace />
}