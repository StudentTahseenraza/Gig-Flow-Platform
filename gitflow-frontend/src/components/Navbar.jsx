import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import { Menu, X, Home, Briefcase, User, LogOut, LogIn, UserPlus } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

 const handleLogout = () => {
  // Dispatch logout action
  dispatch(logout())
    .then(() => {
      // Force clear any local storage
      localStorage.clear();
      // Force reload to clear any state
      window.location.href = '/';
    })
    .catch((error) => {
      console.error('Logout error:', error);
      // Even if API fails, clear local state
      dispatch(manualLogout());
      localStorage.clear();
      window.location.href = '/';
    });
}

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">GigFlow</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>

              <Link
                to="/gigs"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
              >
                <Briefcase className="h-4 w-4" />
                <span>Browse Gigs</span>
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>

                  <div className="ml-4 flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-300 text-sm">{user?.name}</span>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>

                  <Link
                    to="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>

            <Link
              to="/gigs"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <Briefcase className="h-5 w-5" />
              <span>Browse Gigs</span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>

                <div className="px-3 py-2 flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-300 text-sm">{user?.name}</span>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </Link>

                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>

                {isAuthenticated && user?.isPremium && (
  <div className="ml-2">
    <div className="px-2 py-1 text-xs bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white font-bold">
      PREMIUM
    </div>
  </div>
)}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}