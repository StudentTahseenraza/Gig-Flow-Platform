import { useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

export const useSocket = () => {
  const socketRef = useRef(null)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) return

    // Initialize socket connection
    socketRef.current = io(import.meta.env.VITE_API_BASE_URL, {
  withCredentials: true,
})


    // Join user's private room
    socketRef.current.emit('join-user-room', user._id)

    // Listen for hire notifications
    socketRef.current.on('hired', (data) => {
      toast.custom((t) => (
        <div className={`bg-cyber-gray border-l-4 border-neon-blue p-4 rounded-r-lg shadow-lg transform transition-transform duration-300 ${t.visible ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                <span className="text-white font-bold">!</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">You've been hired!</p>
              <p className="text-sm text-gray-300">{data.message}</p>
            </div>
          </div>
        </div>
      ), {
        duration: 5000,
        position: 'top-right',
      })
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [user])

  return socketRef.current
}