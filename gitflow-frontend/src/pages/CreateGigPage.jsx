import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Tag, DollarSign, Calendar, MapPin } from 'lucide-react'
import AnimatedButton from '../components/AnimatedButton'
import HologramCard from '../components/HologramCard'
import { toast } from 'react-hot-toast'

export default function CreateGigPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    category: 'web-development',
    skills: '',
    duration: '2 weeks',
    location: 'remote'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast.success('🎉 Gig Posted Successfully!', {
        duration: 3000,
        position: 'top-center'
      })
      navigate('/dashboard')
    }, 1500)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Post a New Gig</h1>
          <p className="text-gray-400">Fill in the details to find the perfect freelancer for your project</p>
        </div>

        <form onSubmit={handleSubmit}>
          <HologramCard className="p-6">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Gig Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Website Development for E-commerce Store"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Describe your project in detail. Include requirements, goals, and any specific instructions..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Budget */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    <DollarSign className="inline w-4 h-4 mr-1" />
                    Budget ($) *
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g., 1500"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Duration *
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="1 week">1 week</option>
                    <option value="2 weeks">2 weeks</option>
                    <option value="1 month">1 month</option>
                    <option value="2 months">2 months</option>
                    <option value="3+ months">3+ months</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="web-development">Web Development</option>
                    <option value="mobile-apps">Mobile Apps</option>
                    <option value="design">Design</option>
                    <option value="writing">Writing</option>
                    <option value="marketing">Marketing</option>
                    <option value="video-production">Video Production</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    Location *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="remote">Remote</option>
                    <option value="onsite">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <Tag className="inline w-4 h-4 mr-1" />
                  Required Skills (comma separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g., React, Node.js, MongoDB, Figma"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* File Upload (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <Upload className="inline w-4 h-4 mr-1" />
                  Attachments (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-blue-500/50 transition-colors">
                  <Upload className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">Drag & drop files or click to browse</p>
                  <p className="text-gray-500 text-sm">Max file size: 10MB</p>
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    multiple
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
                  >
                    Browse Files
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  className="w-full py-4 text-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Posting Gig...
                    </>
                  ) : (
                    'Post Gig'
                  )}
                </AnimatedButton>
              </div>
            </div>
          </HologramCard>
        </form>
      </div>
    </div>
  )
}