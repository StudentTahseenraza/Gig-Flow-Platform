import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { 
  Zap, 
  Users, 
  TrendingUp, 
  Sparkles,
  ArrowRight,
  Code,
  Globe,
  Rocket,
  Briefcase,
  DollarSign,
  CheckCircle,
  Star,
  Shield,
  Clock
} from 'lucide-react'
import { useEffect, useState } from 'react'
import AnimatedButton from '../components/AnimatedButton'
import HologramCard from '../components/HologramCard'
import ThreeDBackground from '../components/ThreeDBackground'

export default function LandingPage() {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const [mounted, setMounted] = useState(false)
  
  const features = [
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Lightning Fast",
      description: "Real-time bidding and hiring system powered by WebSocket",
      color: "text-[#00f3ff]",
      bg: "from-[#00f3ff]/20 to-transparent"
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Global Network",
      description: "Connect with talent and clients worldwide",
      color: "text-[#b967ff]",
      bg: "from-[#b967ff]/20 to-transparent"
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Smart Bidding",
      description: "AI-powered suggestions for optimal pricing",
      color: "text-[#ff00ff]",
      bg: "from-[#ff00ff]/20 to-transparent"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Secure Payments",
      description: "Escrow protection and secure transactions",
      color: "text-[#00ffaa]",
      bg: "from-[#00ffaa]/20 to-transparent"
    }
  ]

  const handleStartEarning = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/register')
    }
  }

  const handleExploreMarketplace = () => {
    if (isAuthenticated) {
      navigate('/gigs')
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00f3ff] mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading GigFlow...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background */}
      <ThreeDBackground />
      
      {/* Animated particle overlay */}
      <div className="particle-container">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              background: i % 3 === 0 ? '#00f3ff' : 
                         i % 3 === 1 ? '#b967ff' : 
                         '#ff00ff'
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Hero Section */}
        <motion.div 
          className="text-center py-20 mt-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.5, 
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <Sparkles className="w-20 h-20 text-[#00f3ff] animate-pulse absolute -top-6 -left-6" />
              <Rocket className="w-24 h-24 text-[#b967ff] animate-float" />
            </div>
          </motion.div>
          
          {/* Main Title with Glitch Effect */}
          <div className="mb-6">
            <div className="text-sm md:text-lg text-[#00f3ff] font-mono tracking-widest mb-2">
              &gt; WELCOME TO THE FUTURE OF FREELANCING
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-['Orbitron'] font-black mb-4">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] via-[#b967ff] to-[#ff00ff] animate-gradient bg-[length:200%_auto]">
                GIGFLOW
              </span>
            </h1>
            <div className="h-1 w-48 mx-auto bg-gradient-to-r from-[#00f3ff] via-[#b967ff] to-[#ff00ff] rounded-full"></div>
          </div>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-['Rajdhani']"
          >
            Where <span className="text-[#00f3ff] font-semibold">digital dreams</span> meet{" "}
            <span className="text-[#b967ff] font-semibold">real opportunities</span>
          </motion.p>

          {/* Auth Status Badge */}
          {isAuthenticated && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-gradient-to-r from-[#00f3ff]/20 to-[#b967ff]/20 border border-[#00f3ff]/30"
            >
              <CheckCircle className="w-5 h-5 text-[#00ffaa]" />
              <span className="text-[#00ffaa] font-medium">
                Welcome back, <span className="text-white">{user?.name}</span>!
              </span>
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            {isAuthenticated ? (
              <>
                <button 
                  onClick={handleStartEarning}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#00f3ff] to-[#b967ff] text-white rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Enter Dashboard
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
                
                <button 
                  onClick={handleExploreMarketplace}
                  className="group relative px-8 py-4 border-2 border-[#00f3ff] text-[#00f3ff] rounded-lg font-bold text-lg hover:bg-[#00f3ff]/10 hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Browse Gigs
                  </span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleStartEarning}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#00f3ff] to-[#b967ff] text-white rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Earning Now
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
                
                <button 
                  onClick={handleExploreMarketplace}
                  className="group relative px-8 py-4 border-2 border-[#b967ff] text-[#b967ff] rounded-lg font-bold text-lg hover:bg-[#b967ff]/10 hover:shadow-[0_0_20px_rgba(185,103,255,0.3)] transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Explore Marketplace
                  </span>
                </button>
              </>
            )}
          </motion.div>

          {/* Live Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[
              { 
                value: "10K+", 
                label: "Active Freelancers", 
                icon: <Users className="w-5 h-5" />,
                color: "text-[#00f3ff]",
                delay: "0s"
              },
              { 
                value: "5K+", 
                label: "Projects Posted", 
                icon: <Briefcase className="w-5 h-5" />,
                color: "text-[#b967ff]",
                delay: "0.1s"
              },
              { 
                value: "98%", 
                label: "Success Rate", 
                icon: <TrendingUp className="w-5 h-5" />,
                color: "text-[#ff00ff]",
                delay: "0.2s"
              },
              { 
                value: "$2M+", 
                label: "Paid to Talent", 
                icon: <DollarSign className="w-5 h-5" />,
                color: "text-[#00ffaa]",
                delay: "0.3s"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <div className="hologram-card rounded-xl p-6 relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.bg}`}>
                      <div className={stat.color}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-30"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-['Orbitron'] font-bold mb-12 text-center">
                Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#b967ff]">GigFlow</span>?
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                >
                  <HologramCard hoverEffect className="h-full">
                    <div className={`${feature.color} mb-6`}>
                      <div className="p-3 rounded-xl bg-gradient-to-br from-white/5 to-transparent inline-block">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </HologramCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Final CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2 }}
            className="relative"
          >
            <Globe className="absolute -top-10 -right-10 w-24 h-24 text-[#00f3ff]/20 animate-spin-slow hidden lg:block" />
            <div className="hologram-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-['Orbitron'] font-bold mb-6">
                  {isAuthenticated ? (
                    <>
                      Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#b967ff]">Level Up</span>?
                    </>
                  ) : (
                    <>
                      Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#b967ff]">Revolution</span>
                    </>
                  )}
                </h3>
                
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                  {isAuthenticated 
                    ? `Welcome aboard ${user?.name}! The future of freelancing is here.`
                    : 'Join thousands of digital creators, developers, and innovators already building their future with GigFlow.'
                  }
                </p>
                
                {isAuthenticated ? (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="px-8 py-4 bg-gradient-to-r from-[#00f3ff] to-[#b967ff] text-white rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all transform hover:scale-105"
                    >
                      Go to Dashboard
                    </button>
                    <button 
                      onClick={() => navigate('/profile')}
                      className="px-8 py-4 border-2 border-[#00ffaa] text-[#00ffaa] rounded-lg font-bold text-lg hover:bg-[#00ffaa]/10 transition-all transform hover:scale-105"
                    >
                      View Profile
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => navigate('/register')}
                      className="px-8 py-4 bg-gradient-to-r from-[#00f3ff] to-[#b967ff] text-white rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all transform hover:scale-105"
                    >
                      Create Free Account
                    </button>
                    <button 
                      onClick={() => navigate('/login')}
                      className="px-8 py-4 border-2 border-[#b967ff] text-[#b967ff] rounded-lg font-bold text-lg hover:bg-[#b967ff]/10 transition-all transform hover:scale-105"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}