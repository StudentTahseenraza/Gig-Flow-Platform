import { useState, useEffect } from 'react'
import { Search, Filter, Plus } from 'lucide-react'
import GigCard from '../components/GigCard'
import { Link } from 'react-router-dom'

export default function GigsPage() {
  const [search, setSearch] = useState('')
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGigs([
        {
          id: 1,
          title: "Website Development",
          description: "Need a modern website for my business with responsive design and CMS integration.",
          budget: 1500,
          postedBy: "John Doe",
          timeAgo: "2 hours ago"
        },
        {
          id: 2,
          title: "Mobile App UI/UX Design",
          description: "Looking for a talented designer to create UI/UX for a fitness tracking app.",
          budget: 1200,
          postedBy: "Sarah Smith",
          timeAgo: "5 hours ago"
        },
        {
          id: 3,
          title: "Backend API Development",
          description: "Need Node.js developer to build REST API for e-commerce platform.",
          budget: 2500,
          postedBy: "Mike Johnson",
          timeAgo: "1 day ago"
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Browse Available Gigs
          </h1>
          <p className="text-gray-400">
            Find the perfect project for your skills
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search gigs by title, skills, or description..."
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-3 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-gray-600 transition-colors">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
              
              <Link
                to="/gigs/new"
                className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Post a Gig</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">
              {gigs.length} Gigs Available
            </h2>
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white">
              <option>Sort by: Newest</option>
              <option>Sort by: Budget (High to Low)</option>
              <option>Sort by: Budget (Low to High)</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-400">Loading gigs...</p>
            </div>
          ) : gigs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">No gigs found</div>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gigs.map((gig) => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}