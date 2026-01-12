import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearError } from '../store/slices/authSlice'
import { Lock, Mail, Eye, EyeOff, Sparkles } from 'lucide-react'
import AnimatedButton from '../components/AnimatedButton'
import HologramCard from '../components/HologramCard'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false
  })
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(login({
      email: formData.email,
      password: formData.password
    }))
    
    if (result.type === 'auth/login/fulfilled') {
      navigate('/dashboard')
    }
  }

  const handleChange = (e) => {
    if (error) dispatch(clearError())
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-dark via-cyber-gray to-cyber-dark" />
      <div className="absolute inset-0 bg-cyber-grid bg-[length:100px_100px] opacity-5" />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-blue rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <HologramCard className="p-8">
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <Sparkles className="w-12 h-12 text-neon-purple" />
            </motion.div>
            <h1 className="text-3xl font-['Orbitron'] font-bold mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">Sign in to your GigFlow account</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-neon-blue" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-cyber-gray/50 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse-glow" />
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-neon-purple" />
                </div>
                <input
                  type={formData.showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-cyber-gray/50 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setFormData({...formData, showPassword: !formData.showPassword})}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {formData.showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <AnimatedButton
              type="submit"
              variant="primary"
              className="w-full py-3 text-lg"
              disabled={loading}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              ) : (
                'Sign In'
              )}
            </AnimatedButton>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-center text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-neon-blue hover:text-neon-purple transition-colors font-semibold"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </HologramCard>

        {/* Tech stack showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-gray-500 tracking-widest uppercase mb-2">
            Powered by
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span className="px-3 py-1 rounded-full bg-cyber-gray/50">React 18</span>
            <span className="px-3 py-1 rounded-full bg-cyber-gray/50">WebSocket</span>
            <span className="px-3 py-1 rounded-full bg-cyber-gray/50">MongoDB</span>
            <span className="px-3 py-1 rounded-full bg-cyber-gray/50">Three.js</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}