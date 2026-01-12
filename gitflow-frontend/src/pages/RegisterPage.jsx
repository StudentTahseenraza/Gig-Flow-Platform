import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearError } from '../store/slices/authSlice'
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus, 
  Sparkles,
  Shield,
  Globe,
  Rocket,
  CheckCircle,
  Zap
} from 'lucide-react'
import ThreeDBackground from '../components/ThreeDBackground'
import AnimatedButton from '../components/AnimatedButton'
import HologramCard from '../components/HologramCard'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    agreeTerms: false
  })
  
  const [step, setStep] = useState(1)
  const [processing, setProcessing] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (step === 1) {
      // Validate basic info
      if (!formData.name || !formData.email) {
        alert('Please fill in all fields')
        return
      }
      setStep(2)
      return
    }
    
    if (step === 2) {
      // Validate passwords
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      
      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters')
        return
      }
      
      if (!formData.agreeTerms) {
        alert('You must agree to the terms and conditions')
        return
      }
      
      setProcessing(true)
      
      const result = await dispatch(register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      }))
      
      setProcessing(false)
      
      if (result.type === 'auth/register/fulfilled') {
        // Show success animation
        setTimeout(() => {
          navigate('/dashboard')
        }, 1500)
      }
    }
  }

  const handleChange = (e) => {
    if (error) dispatch(clearError())
    
    if (e.target.type === 'checkbox') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked
      })
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
    } else {
      navigate('/')
    }
  }

  const requirements = [
    { text: 'At least 6 characters', met: formData.password.length >= 6 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(formData.password) },
    { text: 'Contains number', met: /\d/.test(formData.password) },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* 3D Background */}
      <ThreeDBackground />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? 'var(--neon-blue)' : 
                         i % 3 === 1 ? 'var(--neon-purple)' : 
                         'var(--neon-pink)'
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
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Info & Graphics */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-2/5"
          >
            <HologramCard className="h-full p-8">
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-6"
                >
                  <div className="relative">
                    <Sparkles className="w-16 h-16 text-[#00f3ff] animate-pulse" />
                    <Rocket className="w-20 h-20 text-[#b967ff] absolute -top-2 -right-2 animate-float" />
                  </div>
                </motion.div>
                
                <h2 className="text-3xl font-['Orbitron'] font-bold mb-4">
                  Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#b967ff]">Revolution</span>
                </h2>
                
                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-[#00f3ff] via-[#b967ff] to-[#ff00ff] rounded-full mb-6"></div>
                
                <p className="text-gray-300 mb-8">
                  Create your account and unlock the future of freelancing
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {[
                  { icon: <Zap className="w-5 h-5" />, text: 'Instant access to global opportunities', color: 'text-[#00f3ff]' },
                  { icon: <Shield className="w-5 h-5" />, text: 'Secure payments with escrow protection', color: 'text-[#b967ff]' },
                  { icon: <Globe className="w-5 h-5" />, text: 'Connect with clients worldwide', color: 'text-[#ff00ff]' },
                  { icon: <Rocket className="w-5 h-5" />, text: 'AI-powered project recommendations', color: 'text-[#00ffaa]' }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.color.replace('text-', 'from-')}/20 to-transparent mt-0.5`}>
                      <div className={feature.color}>
                        {feature.icon}
                      </div>
                    </div>
                    <span className="text-gray-300">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-sm font-medium ${step >= 1 ? 'text-[#00f3ff]' : 'text-gray-500'}`}>
                    Step 1: Basic Info
                  </div>
                  <div className={`text-sm font-medium ${step >= 2 ? 'text-[#00f3ff]' : 'text-gray-500'}`}>
                    Step 2: Security
                  </div>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00f3ff] to-[#b967ff]"
                    initial={{ width: '50%' }}
                    animate={{ width: step === 1 ? '50%' : '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '10K+', label: 'Freelancers' },
                  { value: '98%', label: 'Success Rate' },
                  { value: '5K+', label: 'Projects' },
                  { value: '$2M+', label: 'Paid Out' }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </HologramCard>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-3/5"
          >
            <HologramCard className="p-8">
              <div className="text-center mb-8">
                <div className="inline-block p-3 rounded-full bg-gradient-to-r from-[#00f3ff]/20 to-[#b967ff]/20 mb-4">
                  <UserPlus className="w-8 h-8 text-[#00f3ff]" />
                </div>
                <h1 className="text-3xl font-['Orbitron'] font-bold mb-2">
                  Create Account
                </h1>
                <p className="text-gray-400">Join thousands of successful freelancers</p>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30"
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                          <span className="text-red-400 font-bold">!</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-400">Registration Error</p>
                        <p className="text-sm text-red-300">{error}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Basic Info */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <User className="w-5 h-5 text-[#00f3ff]" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] text-white transition-all duration-300"
                        placeholder="Enter your full name"
                        required
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 rounded-full bg-[#00f3ff] animate-pulse"></div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Mail className="w-5 h-5 text-[#b967ff]" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-[#b967ff] focus:ring-1 focus:ring-[#b967ff] text-white transition-all duration-300"
                        placeholder="Enter your email address"
                        required
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-2 h-2 rounded-full bg-[#b967ff] animate-pulse"></div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-r from-[#00f3ff]/10 to-[#b967ff]/10 border border-[#00f3ff]/20">
                      <p className="text-sm text-gray-300 text-center">
                        Next: Set up your account security
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Password */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Lock className="w-5 h-5 text-[#00f3ff]" />
                      </div>
                      <input
                        type={formData.showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-12 pr-12 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-[#00f3ff] focus:ring-1 focus:ring-[#00f3ff] text-white transition-all duration-300"
                        placeholder="Create a strong password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, showPassword: !formData.showPassword})}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {formData.showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Shield className="w-5 h-5 text-[#b967ff]" />
                      </div>
                      <input
                        type={formData.showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-12 pr-12 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:border-[#b967ff] focus:ring-1 focus:ring-[#b967ff] text-white transition-all duration-300"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, showConfirmPassword: !formData.showConfirmPassword})}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {formData.showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Password Requirements */}
                    <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                      <p className="text-sm font-medium text-gray-300 mb-3">Password Requirements:</p>
                      <div className="space-y-2">
                        {requirements.map((req, index) => (
                          <div key={index} className="flex items-center">
                            {req.met ? (
                              <CheckCircle className="w-4 h-4 text-[#00ffaa] mr-2" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-gray-600 mr-2"></div>
                            )}
                            <span className={`text-sm ${req.met ? 'text-[#00ffaa]' : 'text-gray-400'}`}>
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-[#00f3ff] bg-gray-900 border-gray-700 rounded focus:ring-[#00f3ff] focus:ring-offset-gray-900"
                        required
                      />
                      <label className="ml-3 text-sm text-gray-300">
                        I agree to the{' '}
                        <a href="#" className="text-[#00f3ff] hover:text-[#b967ff] transition-colors">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-[#00f3ff] hover:text-[#b967ff] transition-colors">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 px-6 py-4 border-2 border-gray-700 text-gray-300 rounded-xl hover:border-[#00f3ff] hover:text-white transition-all duration-300 font-medium"
                    >
                      Back
                    </button>
                  )}
                  
                  <AnimatedButton
                    type="submit"
                    variant="primary"
                    className="flex-1 py-4 text-lg"
                    disabled={loading || processing}
                  >
                    {processing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-flex items-center"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Creating Account...
                      </motion.div>
                    ) : step === 1 ? (
                      'Continue'
                    ) : (
                      'Create Account'
                    )}
                  </AnimatedButton>
                </div>
              </form>

              {/* Already have account */}
              <div className="mt-8 pt-8 border-t border-gray-800">
                <p className="text-center text-gray-400">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-[#00f3ff] hover:text-[#b967ff] transition-colors font-semibold"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>

              {/* Security Badge */}
              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>256-bit SSL encryption</span>
                <span className="text-gray-600">•</span>
                <span>Your data is secure</span>
              </div>
            </HologramCard>
          </motion.div>
        </div>

        {/* Tech Stack Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-gray-500 tracking-widest uppercase mb-3">
            Powered by Cutting-Edge Technology
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#00f3ff]/10 to-transparent border border-[#00f3ff]/20 text-[#00f3ff]">
              React 18
            </span>
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#b967ff]/10 to-transparent border border-[#b967ff]/20 text-[#b967ff]">
              WebSocket
            </span>
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#ff00ff]/10 to-transparent border border-[#ff00ff]/20 text-[#ff00ff]">
              Three.js
            </span>
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#00ffaa]/10 to-transparent border border-[#00ffaa]/20 text-[#00ffaa]">
              MongoDB
            </span>
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-gray-700/10 to-transparent border border-gray-600/20 text-gray-400">
              Node.js
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 left-10 text-[#00f3ff] opacity-30"
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-10 right-10 text-[#b967ff] opacity-30"
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
    </div>
  )
}