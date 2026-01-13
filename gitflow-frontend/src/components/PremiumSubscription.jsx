import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Crown, 
  Zap, 
  TrendingUp, 
  Shield, 
  Star, 
  Target,
  CheckCircle,
  Sparkles,
  Gift,
  Rocket,
  Award,
  Users,
  Eye,
  Clock,
  DollarSign,
  X
} from 'lucide-react'
import AnimatedButton from './AnimatedButton'
import HologramCard from './HologramCard'
import { toast } from 'react-hot-toast'

const PremiumSubscription = ({ isOpen, onClose, user }) => {
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [processing, setProcessing] = useState(false)

  const plans = [
    {
      id: 'basic',
      name: 'Starter',
      price: 9,
      period: 'month',
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Up to 10 active bids',
        'Basic gig visibility',
        'Email support',
        'Standard profile',
        '5 gig posts/month'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      period: 'month',
      color: 'from-purple-500 to-pink-500',
      features: [
        'Unlimited active bids',
        '10x gig visibility boost',
        'Priority support',
        'Verified badge',
        'Unlimited gig posts',
        'Advanced analytics',
        'Custom portfolio',
        'Direct client access'
      ],
      popular: true
    },
    {
      id: 'agency',
      name: 'Agency',
      price: 99,
      period: 'month',
      color: 'from-orange-500 to-red-500',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom branding',
        'API access',
        'White-label solutions',
        'Dedicated account manager',
        'Premium placement',
        'Custom contract templates'
      ],
      popular: false
    }
  ]

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: '10x Faster Hiring',
      description: 'Get noticed 10x faster by top clients',
      color: 'text-yellow-500',
      stat: '10x'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Priority Placement',
      description: 'Your gigs appear at the top of search results',
      color: 'text-green-500',
      stat: 'Top 5%'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Premium Visibility',
      description: 'Highlighted profile with premium badge',
      color: 'text-blue-500',
      stat: '500%'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Direct Access',
      description: 'Connect directly with high-value clients',
      color: 'text-purple-500',
      stat: 'VIP'
    }
  ]

  const handlePurchase = async () => {
    setProcessing(true)
    
    // Simulate API call
    setTimeout(() => {
      setProcessing(false)
      triggerCelebration()
      toast.success(
        <div className="flex items-center">
          <Crown className="w-5 h-5 mr-2 text-yellow-500" />
          <span>Welcome to Premium! Your account has been upgraded.</span>
        </div>,
        {
          duration: 5000,
          position: 'top-center',
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '2px solid #b967ff',
            padding: '16px',
            fontSize: '16px'
          },
          iconTheme: {
            primary: '#b967ff',
            secondary: '#FFF',
          },
        }
      )
      onClose()
    }, 2000)
  }

  const triggerCelebration = () => {
    // Create celebration elements
    const celebrationContainer = document.createElement('div')
    celebrationContainer.className = 'fixed inset-0 pointer-events-none z-[9999]'
    document.body.appendChild(celebrationContainer)

    // Add confetti
    for (let i = 0; i < 150; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div')
        confetti.className = 'absolute'
        confetti.style.cssText = `
          width: ${Math.random() * 10 + 5}px;
          height: ${Math.random() * 10 + 5}px;
          background: ${['#00f3ff', '#b967ff', '#ff00ff', '#00ffaa', '#ff9a00'][Math.floor(Math.random() * 5)]};
          top: -20px;
          left: ${Math.random() * 100}%;
          border-radius: 50%;
          opacity: 0.9;
        `
        celebrationContainer.appendChild(confetti)

        // Animation
        const animation = confetti.animate([
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { transform: `translateY(${window.innerHeight}px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
        ], {
          duration: 1000 + Math.random() * 2000,
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        })

        animation.onfinish = () => confetti.remove()
      }, i * 20)
    }

    // Add floating emojis
    const emojis = ['🎉', '🚀', '⭐', '👑', '💫', '✨', '🔥', '💎']
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const emoji = document.createElement('div')
        emoji.className = 'absolute text-2xl'
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]
        emoji.style.cssText = `
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          animation: float-up ${2 + Math.random() * 2}s ease-out forwards;
        `
        celebrationContainer.appendChild(emoji)

        setTimeout(() => emoji.remove(), 3000)
      }, i * 100)
    }

    // Add celebration message
    const message = document.createElement('div')
    message.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl md:text-6xl font-bold text-center'
    message.innerHTML = `
      <div class="bg-gradient-to-r from-[#00f3ff] via-[#b967ff] to-[#ff00ff] text-transparent bg-clip-text">
        WELCOME TO PREMIUM!
      </div>
      <div class="text-lg text-gray-300 mt-4">You're now part of our elite community</div>
    `
    celebrationContainer.appendChild(message)

    // Remove after celebration
    setTimeout(() => {
      celebrationContainer.remove()
    }, 5000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto" // Added max-h and overflow-y-auto
      >
        <HologramCard className="p-0 overflow-hidden">
          {/* Header */}
          <div className="relative p-8 bg-gradient-to-r from-[#0a0a0f] to-[#1a1a2e]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
                <Crown className="w-10 h-10 text-yellow-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Go Premium</h2>
                <p className="text-gray-400">Unlock 10x faster results and exclusive features</p>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4">
                  <div className={`${benefit.color} mb-2`}>{benefit.icon}</div>
                  <div className="text-lg font-bold text-white mb-1">{benefit.title}</div>
                  <div className="text-sm text-gray-400">{benefit.description}</div>
                  <div className={`mt-2 text-xs px-2 py-1 rounded-full ${benefit.color} bg-opacity-20 inline-block`}>
                    {benefit.stat}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Plans */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  whileHover={{ y: -5 }}
                  className={`relative rounded-xl border-2 ${selectedPlan === plan.id ? 'border-[#b967ff]' : 'border-gray-700'} bg-gray-900/50 p-6 cursor-pointer transition-all`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="px-3 py-1 bg-gradient-to-r from-[#b967ff] to-[#ff00ff] rounded-full text-white text-xs font-bold">
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className={`inline-block p-3 rounded-lg bg-gradient-to-r ${plan.color} bg-opacity-20 mb-4`}>
                      {plan.id === 'basic' && <Star className="w-8 h-8 text-blue-500" />}
                      {plan.id === 'pro' && <Crown className="w-8 h-8 text-purple-500" />}
                      {plan.id === 'agency' && <Rocket className="w-8 h-8 text-orange-500" />}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-white">${plan.price}</span>
                      <span className="text-gray-400">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <AnimatedButton
                    variant={selectedPlan === plan.id ? 'primary' : 'secondary'}
                    className="w-full"
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </AnimatedButton>
                </motion.div>
              ))}
            </div>

            {/* Payment Section */}
            <div className="bg-gradient-to-r from-[#0a0a0f] to-[#1a1a2e] rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#00f3ff]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#00f3ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#00f3ff]"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-gray-800/30 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-400">Plan</span>
                      <span className="text-white font-bold">
                        {plans.find(p => p.id === selectedPlan)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-400">Price</span>
                      <span className="text-white font-bold">
                        ${plans.find(p => p.id === selectedPlan)?.price}/{plans.find(p => p.id === selectedPlan)?.period}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Billing Cycle</span>
                      <span className="text-[#00ffaa] font-bold">Monthly</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold">Total</div>
                        <div className="text-sm text-gray-400">Charged today</div>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        ${plans.find(p => p.id === selectedPlan)?.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <AnimatedButton
                variant="ghost"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </AnimatedButton>
              <AnimatedButton
                variant="primary"
                onClick={handlePurchase}
                disabled={processing}
                className="flex-1 py-4 text-lg"
              >
                {processing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Upgrade to Premium
                  </div>
                )}
              </AnimatedButton>
            </div>

            {/* Guarantee */}
            <div className="text-center mt-6">
              <div className="inline-flex items-center text-sm text-gray-400">
                <Shield className="w-4 h-4 mr-2 text-green-500" />
                30-day money-back guarantee • Cancel anytime
              </div>
            </div>
          </div>
        </HologramCard>
      </motion.div>
    </div>
  )
}

export default PremiumSubscription