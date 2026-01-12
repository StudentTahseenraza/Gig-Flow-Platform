import { Link } from 'react-router-dom'
import { DollarSign, Clock, User } from 'lucide-react'

export default function GigCard() {
  const gig = {
    id: 1,
    title: "Website Development",
    description: "Need a modern website for my business with responsive design and CMS integration.",
    budget: 1500,
    postedBy: "John Doe",
    timeAgo: "2 hours ago"
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {gig.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {gig.description}
          </p>
        </div>
      </div>

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
          <User className="h-4 w-4 mr-1" />
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
        <button className="flex-1 border border-blue-500 text-blue-400 hover:bg-blue-500/10 py-2 px-4 rounded-lg font-medium transition-colors">
          Quick Apply
        </button>
      </div>
    </div>
  )
}