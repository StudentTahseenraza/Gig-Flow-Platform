import { useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { getSocketURL } from '../utils/api'

export const useSocket = () => {
  const socketRef = useRef(null)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) return

    const socketURL = getSocketURL()
    console.log('🔌 Connecting to Socket.io:', socketURL)
    
    socketRef.current = io(socketURL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    })

    // Connection events
    socketRef.current.on('connect', () => {
      console.log('✅ Socket.io connected:', socketRef.current.id)
      
      // Join user's private room
      if (user._id) {
        socketRef.current.emit('join-user-room', user._id)
        console.log(`Joined user room: ${user._id}`)
      }
    })

    socketRef.current.on('connect_error', (error) => {
      console.error('❌ Socket.io connection error:', error)
    })

    socketRef.current.on('disconnect', (reason) => {
      console.log('🔌 Socket.io disconnected:', reason)
    })

    // Listen for hire notifications
    socketRef.current.on('hired', (data) => {
      console.log('🎯 Received hire notification:', data)
      toast.custom((t) => (
        <div className={`bg-gray-800 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-lg transform transition-transform duration-300 ${t.visible ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
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
        console.log('🔌 Disconnecting Socket.io')
        socketRef.current.disconnect()
      }
    }
  }, [user])

  return socketRef.current
}