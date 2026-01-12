import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const AnimatedButton = forwardRef(({ 
  children, 
  variant = 'primary',
  className = '',
  ...props 
}, ref) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyber-dark relative overflow-hidden'
  
  const variants = {
    primary: 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-neon',
    secondary: 'cyber-border text-neon-blue hover:text-white hover:shadow-neon',
    ghost: 'text-neon-purple hover:bg-neon-purple/10',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600 text-white',
  }

  return (
    <motion.button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </motion.button>
  )
})

AnimatedButton.displayName = 'AnimatedButton'
export default AnimatedButton