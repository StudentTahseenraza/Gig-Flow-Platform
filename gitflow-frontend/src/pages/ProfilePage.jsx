import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Award,
  Briefcase,
  DollarSign,
  Star,
  Edit2,
  Save,
  Upload,
  Shield,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Link as LinkIcon,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Users as UsersIcon,
  Rocket,
  Crown,
  Target,
  Clock
} from 'lucide-react'
import AnimatedButton from '../components/AnimatedButton'
import HologramCard from '../components/HologramCard'
import PremiumSubscription from '../components/PremiumSubscription'

export default function ProfilePage() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    skills: [],
    hourlyRate: 50,
    avatar: '',
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: ''
    }
  })
  const [stats, setStats] = useState({
    completedProjects: 12,
    totalEarnings: 8500,
    avgRating: 4.8,
    responseRate: 95,
    activeBids: 3,
    hiredCount: 8
  })

  const [showPremium, setShowPremium] = useState(false)
  const [userBids, setUserBids] = useState([
    {
      id: 1,
      gigTitle: "E-commerce Website",
      price: 1200,
      status: "pending",
      date: "2024-01-15",
      client: "Tech Corp Inc",
      priority: "normal"
    },
    {
      id: 2,
      gigTitle: "Mobile App UI/UX",
      price: 800,
      status: "hired",
      date: "2024-01-10",
      client: "Design Studio",
      priority: "high"
    },
    {
      id: 3,
      gigTitle: "SEO Optimization",
      price: 500,
      status: "rejected",
      date: "2024-01-05",
      client: "Marketing Agency",
      priority: "normal"
    },
    {
      id: 4,
      gigTitle: "Backend API",
      price: 1500,
      status: "pending",
      date: "2024-01-12",
      client: "Startup XYZ",
      priority: "normal"
    }
  ])

  useEffect(() => {
    // Load user data
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        bio: 'Full-stack developer passionate about creating beautiful, functional web applications. Specializing in React, Node.js, and modern web technologies.',
        location: 'San Francisco, CA',
        website: 'https://portfolio.example.com',
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'UI/UX Design'],
        hourlyRate: 65,
        avatar: `https://ui-avatars.com/api/?name=${user.name}&background=0a0a0f&color=00f3ff&bold=true`,
        socialLinks: {
          linkedin: 'https://linkedin.com/in/username',
          github: 'https://github.com/username',
          twitter: 'https://twitter.com/username'
        }
      })
    }
  }, [user])

  const handleSaveProfile = () => {
    setIsEditing(false)
    // In real app, dispatch update action here
    console.log('Profile updated:', profileData)
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatar: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const skillColors = [
    'bg-gradient-to-r from-[#00f3ff] to-[#00a8ff]',
    'bg-gradient-to-r from-[#b967ff] to-[#764ba2]',
    'bg-gradient-to-r from-[#ff00ff] to-[#f093fb]',
    'bg-gradient-to-r from-[#00ffaa] to-[#00b894]',
    'bg-gradient-to-r from-[#ff9a00] to-[#ff6b6b]',
    'bg-gradient-to-r from-[#4facfe] to-[#00f2fe]'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-['Orbitron'] font-bold mb-2">
            Profile <span className="text-[#00f3ff]">Dashboard</span>
          </h1>
          <p className="text-gray-400">Manage your professional identity and track your success</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <HologramCard className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                {/* Avatar */}
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full border-4 border-[#00f3ff]/30 overflow-hidden">
                    <img
                      src={profileData.avatar}
                      alt={profileData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-r from-[#00f3ff] to-[#b967ff] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5 text-white" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                      />
                    </label>
                  )}
                  <div className="absolute -inset-4 border-2 border-[#00f3ff]/20 rounded-full animate-pulse"></div>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="text-3xl font-bold bg-transparent border-b border-[#00f3ff] text-white focus:outline-none"
                        />
                      ) : (
                        <h2 className="text-3xl font-bold text-white">{profileData.name}</h2>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center text-[#00ffaa]">
                          <Star className="w-4 h-4 fill-current mr-1" />
                          <span className="font-bold">{stats.avgRating}</span>
                          <span className="text-gray-400 ml-1">({stats.completedProjects} reviews)</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                        <span className="text-gray-400">Pro Member</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {isEditing ? (
                        <AnimatedButton
                          variant="primary"
                          onClick={handleSaveProfile}
                          className="flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </AnimatedButton>
                      ) : (
                        <AnimatedButton
                          variant="secondary"
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-2"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit Profile
                        </AnimatedButton>
                      )}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Projects', value: stats.completedProjects, icon: Briefcase, color: 'text-[#00f3ff]' },
                      { label: 'Earnings', value: `$${stats.totalEarnings}`, icon: DollarSign, color: 'text-[#b967ff]' },
                      { label: 'Response', value: `${stats.responseRate}%`, icon: TrendingUp, color: 'text-[#00ffaa]' }
                    ].map((stat, index) => (
                      <div key={index} className="text-center p-3 rounded-lg bg-white/5">
                        <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#00f3ff]" />
                  About Me
                </h3>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="w-full h-32 px-4 py-3 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#00f3ff] resize-none"
                  />
                ) : (
                  <p className="text-gray-300 leading-relaxed">{profileData.bio}</p>
                )}
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#b967ff]" />
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-4 py-2 rounded-full text-white font-medium ${skillColors[index % skillColors.length]}`}
                    >
                      {skill}
                    </span>
                  ))}
                  {isEditing && (
                    <button className="px-4 py-2 border-2 border-dashed border-gray-600 rounded-full text-gray-400 hover:text-white hover:border-[#00f3ff] transition-colors">
                      + Add Skill
                    </button>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#ff00ff]" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: Mail, label: 'Email', value: profileData.email, editable: false },
                    { icon: MapPin, label: 'Location', value: profileData.location, editable: true },
                    { icon: DollarSign, label: 'Hourly Rate', value: `$${profileData.hourlyRate}/hr`, editable: true },
                    { icon: Globe, label: 'Website', value: profileData.website, editable: true }
                  ].map((info, index) => (
                    <div key={index} className="flex items-center p-3 rounded-lg bg-white/5">
                      <info.icon className="w-5 h-5 text-gray-400 mr-3" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-400">{info.label}</div>
                        {isEditing && info.editable ? (
                          <input
                            type="text"
                            value={info.value}
                            onChange={(e) => {
                              if (info.label === 'Hourly Rate') {
                                setProfileData({ ...profileData, hourlyRate: parseInt(e.target.value.replace('$', '')) || 0 })
                              } else if (info.label === 'Location') {
                                setProfileData({ ...profileData, location: e.target.value })
                              } else if (info.label === 'Website') {
                                setProfileData({ ...profileData, website: e.target.value })
                              }
                            }}
                            className="w-full bg-transparent text-white border-b border-gray-600 focus:outline-none focus:border-[#00f3ff]"
                          />
                        ) : (
                          <div className="text-white">{info.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </HologramCard>

            {/* Social Links */}
            <HologramCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-[#00ffaa]" />
                Social Connections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { platform: 'LinkedIn', icon: Linkedin, color: 'text-[#0077b5]', value: profileData.socialLinks.linkedin },
                  { platform: 'GitHub', icon: Github, color: 'text-white', value: profileData.socialLinks.github },
                  { platform: 'Twitter', icon: Twitter, color: 'text-[#1da1f2]', value: profileData.socialLinks.twitter }
                ].map((social, index) => (
                  <div key={index} className="flex items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                    <div className={`p-3 rounded-lg bg-white/10 ${social.color} mr-4`}>
                      <social.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-400">{social.platform}</div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={social.value}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            socialLinks: { ...profileData.socialLinks, [social.platform.toLowerCase()]: e.target.value }
                          })}
                          className="w-full bg-transparent text-white text-sm focus:outline-none"
                          placeholder={`${social.platform} URL`}
                        />
                      ) : (
                        <a
                          href={social.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-sm hover:text-[#00f3ff] transition-colors truncate block"
                        >
                          {social.value.replace('https://', '')}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </HologramCard>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-6">
            {/* Account Stats */}
            <HologramCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#00f3ff]" />
                Performance Metrics
              </h3>

              <div className="space-y-6">
                {[
                  { label: 'Completion Rate', value: 98, color: 'from-[#00f3ff] to-[#00a8ff]' },
                  { label: 'Client Satisfaction', value: 96, color: 'from-[#b967ff] to-[#764ba2]' },
                  { label: 'On-Time Delivery', value: 94, color: 'from-[#ff00ff] to-[#f093fb]' },
                  { label: 'Repeat Clients', value: 85, color: 'from-[#00ffaa] to-[#00b894]' }
                ].map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">{metric.label}</span>
                      <span className="text-white font-bold">{metric.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </HologramCard>

            {/* Quick Actions */}
            <HologramCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>

              <div className="space-y-3">
                {[
                  { label: 'Update Portfolio', icon: Briefcase, color: 'text-[#00f3ff]' },
                  { label: 'View Earnings', icon: DollarSign, color: 'text-[#b967ff]' },
                  { label: 'Security Settings', icon: Shield, color: 'text-[#ff00ff]' },
                  { label: 'Download Invoice', icon: Calendar, color: 'text-[#00ffaa]' }
                ].map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className={`p-2 rounded-lg bg-white/10 ${action.color} mr-3`}>
                      <action.icon className="w-4 h-4" />
                    </div>
                    <span className="text-white group-hover:text-[#00f3ff] transition-colors">
                      {action.label}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </HologramCard>

            {/* Verification Status */}
            <HologramCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#00ffaa]" />
                Verification Status
              </h3>

              <div className="space-y-4">
                {[
                  { label: 'Email Verified', status: true, icon: Mail },
                  { label: 'Phone Verified', status: true, icon: UsersIcon },
                  { label: 'ID Verified', status: false, icon: Shield },
                  { label: 'Payment Verified', status: true, icon: DollarSign }
                ].map((verification, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                    <div className="flex items-center">
                      <verification.icon className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-gray-300">{verification.label}</span>
                    </div>
                    {verification.status ? (
                      <CheckCircle className="w-5 h-5 text-[#00ffaa]" />
                    ) : (
                      <button className="px-3 py-1 text-sm bg-gradient-to-r from-[#00f3ff] to-[#b967ff] rounded-lg text-white hover:opacity-90 transition-opacity">
                        Verify
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </HologramCard>

            {/* Membership Status */}
            <HologramCard className="p-6 bg-gradient-to-br from-[#00f3ff]/10 to-[#b967ff]/10 border border-[#00f3ff]/20">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#00f3ff] to-[#b967ff] flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Pro Member</h3>
                <p className="text-gray-300 mb-4">Unlock premium features and grow faster</p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="text-3xl font-bold text-white">$29</div>
                  <div className="text-gray-400">/month</div>
                </div>
                <AnimatedButton variant="primary" className="w-full">
                  Upgrade Now
                </AnimatedButton>
              </div>
            </HologramCard>

            {/* Premium Upgrade Card */}
            <HologramCard className="p-6 bg-gradient-to-br from-[#00f3ff]/10 via-[#b967ff]/10 to-[#ff00ff]/10 border border-[#00f3ff]/20">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#00f3ff] to-[#b967ff] flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Ready to Level Up?</h3>
                <p className="text-gray-300 mb-4">Unlock 10x faster hiring and premium features</p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-2xl font-bold text-[#00f3ff]">10x</div>
                    <div className="text-xs text-gray-400">Faster Hiring</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-2xl font-bold text-[#b967ff]">500%</div>
                    <div className="text-xs text-gray-400">More Visibility</div>
                  </div>
                </div>

                <AnimatedButton
                  variant="primary"
                  className="w-full mb-3"
                  onClick={() => setShowPremium(true)}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Explore Premium
                </AnimatedButton>

                <div className="text-xs text-gray-500">
                  Join 5,000+ successful freelancers
                </div>
              </div>
            </HologramCard>

            {/* Premium Modal */}
            <PremiumSubscription
              isOpen={showPremium}
              onClose={() => setShowPremium(false)}
              user={user}
            />

            {/* Bid Tracking Section */}
            <HologramCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#00f3ff]" />
                    My Bids ({userBids.length})
                  </h3>
                  <p className="text-gray-400 text-sm">Track your bid applications</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#00f3ff]/20 to-[#b967ff]/20 text-[#00f3ff] text-sm">
                  {userBids.filter(b => b.status === 'pending').length} Active
                </div>
              </div>

              <div className="space-y-4">
                {userBids.map((bid) => (
                  <div key={bid.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${bid.status === 'hired' ? 'bg-green-500' :
                            bid.status === 'rejected' ? 'bg-red-500' :
                              'bg-yellow-500'
                          }`}></div>
                        <h4 className="font-medium text-white">{bid.gigTitle}</h4>
                        {bid.priority === 'high' && (
                          <span className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded-full">
                            Priority
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          ${bid.price}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {bid.date}
                        </span>
                        <span>{bid.client}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${bid.status === 'hired' ? 'bg-green-500/20 text-green-400' :
                          bid.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                            'bg-yellow-500/20 text-yellow-400'
                        }`}>
                        {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                      </div>
                      {bid.status === 'pending' && (
                        <button className="mt-2 text-xs text-[#00f3ff] hover:text-[#b967ff] transition-colors">
                          Withdraw Bid
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {userBids.length === 0 ? (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No bids yet</p>
                    <p className="text-gray-500 text-sm mt-1">Start bidding on gigs to see them here</p>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-800">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-500">
                          {userBids.filter(b => b.status === 'hired').length}
                        </div>
                        <div className="text-xs text-gray-400">Hired</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-yellow-500">
                          {userBids.filter(b => b.status === 'pending').length}
                        </div>
                        <div className="text-xs text-gray-400">Pending</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-500">
                          {userBids.filter(b => b.status === 'rejected').length}
                        </div>
                        <div className="text-xs text-gray-400">Rejected</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </HologramCard>
          </div>
        </div>
      </div>
    </div>
  )
}