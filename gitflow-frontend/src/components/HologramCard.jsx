import { motion } from 'framer-motion'
import { useState } from 'react'

export default function HologramCard({ children, className = '', hoverEffect = true }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`hologram-card rounded-xl p-6 relative ${className}`}
      onMouseEnter={() => hoverEffect && setIsHovered(true)}
      onMouseLeave={() => hoverEffect && setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        rotateY: isHovered ? 5 : 0,
        rotateX: isHovered ? -5 : 0,
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20 
      }}
    >
      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-20" />
        <div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"
          style={{ animation: 'gradient 2s linear infinite' }}
        />
      </div>

      {/* Glitch effect overlay */}
      {isHovered && (
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-purple/10 animate-pulse-glow" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent animate-scan" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}