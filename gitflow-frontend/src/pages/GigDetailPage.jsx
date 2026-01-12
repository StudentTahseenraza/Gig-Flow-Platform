import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, DollarSign, Clock, User, MapPin, Calendar, MessageSquare, CheckCircle } from 'lucide-react'
import AnimatedButton from '../components/AnimatedButton'
import HologramCard from '../components/HologramCard'
import { toast } from 'react-hot-toast'

export default function GigDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [gig, setGig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)

  useEffect(() => {
    // Fetch gig details
    setTimeout(() => {
      setGig({
        id,
        title: "Website Development",
        description: "Need a modern website for my business with responsive design and CMS integration. The website should have: 1. Homepage with hero section 2. About Us page 3. Services/Products page 4. Contact form 5. Blog section 6. Admin panel for content management\n\nRequirements:\n- Responsive design (mobile, tablet, desktop)\n- SEO optimized\n- Fast loading speed\n- Secure payment integration\n- User authentication system",
        budget: 1500,
        postedBy: "John Doe",
        postedDate: "2 hours ago",
        location: "Remote",
        duration: "2 weeks",
        skills: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Express"],
        bidsCount: 12,
        status: "open"
      })
      setLoading(false)
    }, 500)
  }, [id])

  const handleApply = () => {
    setApplying(true)
    
    // Simulate API call
    setTimeout(() => {
      setApplying(false)
      
      // Show success toast with confetti
      toast.success('🎉 Application Submitted Successfully!', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #10b981',
          padding: '16px',
        },
      })
      
      // Trigger confetti effect
      triggerConfetti()
      
      // Navigate back after delay
      setTimeout(() => {
        navigate('/gigs')
      }, 2000)
    }, 1500)
  }

  const triggerConfetti = () => {
    // Simple confetti effect
    const confettiCount = 100
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']
    
    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div')
        confetti.className = 'confetti'
        confetti.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          top: -20px;
          left: ${Math.random() * 100}vw;
          border-radius: 50%;
          z-index: 9999;
          pointer-events: none;
        `
        document.body.appendChild(confetti)
        
        // Animation
        const animation = confetti.animate([
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { transform: `translateY(${window.innerHeight}px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
        ], {
          duration: 1000 + Math.random() * 1000,
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        })
        
        animation.onfinish = () => confetti.remove()
      }, i * 20)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Gigs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <HologramCard className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {gig.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{gig.postedBy}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{gig.postedDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <span className="text-green-400 font-semibold">{gig.status.toUpperCase()}</span>
                </div>
              </div>

              {/* Budget */}
              <div className="mb-8 p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Project Budget</p>
                    <p className="text-3xl font-bold text-white">${gig.budget}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Total Bids</p>
                    <p className="text-xl font-bold text-white">{gig.bidsCount} Bids</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Project Description</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-line">{gig.description}</p>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {gig.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center p-3 bg-gray-800/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">{gig.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-800/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Duration</p>
                    <p className="text-white">{gig.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-800/30 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-400">Budget Type</p>
                    <p className="text-white">Fixed Price</p>
                  </div>
                </div>
              </div>
            </HologramCard>
          </div>

          {/* Sidebar - Application */}
          <div>
            <HologramCard className="p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Apply for this Project</h2>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your Bid Amount ($)
                  </label>
                  <input
                    type="number"
                    defaultValue={gig.budget * 0.8}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell the client why you're the best fit for this project..."
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                    defaultValue={`Dear ${gig.postedBy},

I'm excited to apply for your "${gig.title}" project. With my experience in ${gig.skills.slice(0, 2).join(' and ')}, I'm confident I can deliver excellent results.

Key strengths:
✅ ${gig.skills[0]} expertise
✅ Fast delivery
✅ Quality communication

Looking forward to working with you!`}
                  />
                </div>
              </div>

              <AnimatedButton
                variant="primary"
                className="w-full py-4 text-lg"
                onClick={handleApply}
                disabled={applying}
              >
                {applying ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Submit Application
                  </>
                )}
              </AnimatedButton>

              <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Application Tips</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li className="flex items-start">
                    <MessageSquare className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    Personalize your cover letter
                  </li>
                  <li className="flex items-start">
                    <DollarSign className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    Bid competitively based on your skills
                  </li>
                  <li className="flex items-start">
                    <Clock className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    Be responsive to client messages
                  </li>
                </ul>
              </div>
            </HologramCard>
          </div>
        </div>
      </div>
    </div>
  )
}