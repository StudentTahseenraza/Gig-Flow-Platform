import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  Bell, 
  Clock,
  CheckCircle,
  XCircle,
  Loader,
  Users,
  FileText,
  Rocket
} from 'lucide-react'
// import axios from 'axios'
import HologramCard from '../components/HologramCard'
import AnimatedButton from '../components/AnimatedButton'

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    postedGigs: 0,
    activeBids: 0,
    earnings: 0,
    hiredCount: 0
  })
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [premiumStats, setPremiumStats] = useState({
    isPremium: false,
    premiumUntil: null,
    gigBoost: 1,
    bidLimit: 10,
    usedBids: 3,
    visibilityBoost: 1
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setError(null)
      
      // For now, use mock data since backend might have issues
      const mockGigs = [
        {
          _id: '1',
          title: 'Website Development',
          description: 'Build a responsive website',
          budget: 1500,
          status: 'open',
          createdAt: new Date()
        }
      ]
      
      const mockBids = [
        {
          _id: '1',
          gigId: { title: 'Mobile App Design', ownerId: { name: 'John Client' } },
          price: 800,
          status: 'pending',
          createdAt: new Date()
        }
      ]
      

      // Calculate stats from mock data
      const postedGigs = mockGigs.length
      const activeBids = mockBids.filter(bid => bid.status === 'pending').length
      const hiredCount = mockBids.filter(bid => bid.status === 'hired').length
      const earnings = mockBids
        .filter(bid => bid.status === 'hired')
        .reduce((sum, bid) => sum + bid.price, 0)

      setStats({ postedGigs, activeBids, earnings, hiredCount })
      
      // Prepare recent activity
      const activity = [
        {
          type: 'gig_created',
          title: 'Website Development',
          time: '2 hours ago',
          status: 'open',
          icon: Briefcase
        },
        {
          type: 'bid_placed',
          title: 'Bid on "Mobile App Design"',
          price: 800,
          status: 'pending',
          time: '5 hours ago',
          icon: DollarSign
        }
      ]

      setRecentActivity(activity)
      
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      setError('Failed to load dashboard data. Using demo data instead.')
      
      // Set demo data on error
      setStats({
        postedGigs: 3,
        activeBids: 2,
        earnings: 2400,
        hiredCount: 1
      })
      
      setRecentActivity([
        {
          type: 'gig_created',
          title: 'E-commerce Website',
          time: '1 day ago',
          status: 'open',
          icon: Briefcase
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Posted Gigs',
      value: stats.postedGigs,
      icon: Briefcase,
      color: 'text-blue-500',
      bg: 'from-blue-500/20 to-transparent'
    },
    {
      title: 'Active Bids',
      value: stats.activeBids,
      icon: DollarSign,
      color: 'text-purple-500',
      bg: 'from-purple-500/20 to-transparent'
    },
    {
      title: 'Total Earnings',
      value: `$${stats.earnings}`,
      icon: TrendingUp,
      color: 'text-green-500',
      bg: 'from-green-500/20 to-transparent'
    },
    {
      title: 'Times Hired',
      value: stats.hiredCount,
      icon: Users,
      color: 'text-yellow-500',
      bg: 'from-yellow-500/20 to-transparent'
    }
  ]

  const handleQuickApply = (gigId) => {
    // Show success message with animation
    alert('🎉 Thank you for applying! Your bid has been submitted successfully!')
    
    // You can add confetti animation here
    // Example: triggerConfetti()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader className="w-12 h-12 text-blue-500" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, <span className="text-blue-500">{user?.name || 'User'}</span>
        </h1>
        <p className="text-gray-400">Here's what's happening with your freelance journey</p>
        
        {error && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-400">{error}</p>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <HologramCard key={index}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </HologramCard>
        ))}
      </div>

      {/* Premium Status */}
      {premiumStats.isPremium ? (
        <HologramCard className="col-span-full">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
                <div className="w-8 h-8 text-yellow-500">👑</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Premium Member
                  <span className="text-xs px-2 py-1 bg-gradient-to-r from-[#00f3ff] to-[#b967ff] rounded-full">
                    ACTIVE
                  </span>
                </h3>
                <p className="text-gray-400">
                  Your gigs get 10x more visibility • Renews on {premiumStats.premiumUntil}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-center p-3 rounded-lg bg-white/5">
                <div className="text-2xl font-bold text-[#00f3ff]">{premiumStats.gigBoost}x</div>
                <div className="text-xs text-gray-400">Visibility Boost</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5">
                <div className="text-2xl font-bold text-[#b967ff]">∞</div>
                <div className="text-xs text-gray-400">Bid Limit</div>
              </div>
            </div>
          </div>
        </HologramCard>
      ) : (
        <HologramCard className="col-span-full bg-gradient-to-r from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] border border-[#00f3ff]/30">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#b967ff]">10x Faster</span> Results?
              </h3>
              <p className="text-gray-400">
                Upgrade to Premium and get your gigs seen by top clients first
              </p>
            </div>
            <AnimatedButton 
              variant="primary"
              onClick={() => navigate('/profile')}
              className="px-8 py-3"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Go Premium
            </AnimatedButton>
          </div>
        </HologramCard>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <HologramCard className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Activity</h2>
              <Bell className="w-5 h-5 text-blue-500 animate-pulse" />
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors group"
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <activity.icon className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <div className="flex items-center text-sm text-gray-400 mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{activity.time}</span>
                      {activity.price && (
                        <span className="ml-4 text-purple-400">
                          ${activity.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {activity.status === 'hired' && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                    {activity.status === 'rejected' && (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    {activity.status === 'pending' && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </HologramCard>
        </div>

        {/* Quick Actions */}
        <div>
          <HologramCard className="h-full">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            
            <div className="space-y-4">
              <Link to="/gigs/new">
                <AnimatedButton variant="primary" className="w-full justify-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Post New Gig
                </AnimatedButton>
              </Link>
              
              <Link to="/gigs">
                <AnimatedButton variant="secondary" className="w-full justify-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Browse Marketplace
                </AnimatedButton>
              </Link>
              
              <Link to="/profile">
                <AnimatedButton variant="ghost" className="w-full justify-center">
                  <Users className="w-4 h-4 mr-2" />
                  View Profile
                </AnimatedButton>
              </Link>
            </div>

            {/* Performance Meter */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <h3 className="text-lg font-semibold mb-4">Performance Score</h3>
              <div className="relative">
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: '85%' }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>Beginner</span>
                  <span className="text-blue-400">85%</span>
                  <span>Expert</span>
                </div>
              </div>
            </div>
          </HologramCard>
        </div>
      </div>

      {/* Featured Gigs */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Trending Gigs</h2>
          <Link to="/gigs">
            <AnimatedButton variant="ghost">
              View All
            </AnimatedButton>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 1,
              title: "Website Development",
              description: "Need a modern website for my business with responsive design",
              budget: 1500,
              postedBy: "John Doe",
              timeAgo: "2 hours ago"
            },
            {
              id: 2,
              title: "Mobile App UI/UX Design",
              description: "Looking for designer to create UI/UX for fitness app",
              budget: 1200,
              postedBy: "Sarah Smith",
              timeAgo: "5 hours ago"
            },
            {
              id: 3,
              title: "Backend API Development",
              description: "Need Node.js developer for e-commerce platform API",
              budget: 2500,
              postedBy: "Mike Johnson",
              timeAgo: "1 day ago"
            }
          ].map((gig) => (
            <div key={gig.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-2">
                {gig.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {gig.description}
              </p>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-blue-400">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="font-semibold">${gig.budget}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{gig.timeAgo}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-400">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-sm">{gig.postedBy}</span>
                </div>
              </div>

              <div className="flex space-x-3">
                <Link
                  to={`/gigs/${gig.id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-center font-medium transition-colors"
                >
                  View Details
                </Link>
                <button 
                  onClick={() => handleQuickApply(gig.id)}
                  className="flex-1 border border-blue-500 text-blue-400 hover:bg-blue-500/10 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Quick Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}