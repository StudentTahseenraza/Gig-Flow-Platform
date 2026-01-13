import { useEffect } from 'react'

export const useCelebration = (trigger, type = 'premium') => {
  useEffect(() => {
    if (!trigger) return

    const celebrationTypes = {
      premium: {
        emojis: ['🎉', '🚀', '⭐', '👑', '💫', '✨', '🔥', '💎'],
        colors: ['#00f3ff', '#b967ff', '#ff00ff', '#00ffaa', '#ff9a00'],
        message: 'WELCOME TO PREMIUM!'
      },
      purchase: {
        emojis: ['🛒', '💰', '🎁', '🏆', '🌟', '💸', '💳', '✅'],
        colors: ['#00ffaa', '#00f3ff', '#b967ff', '#ff9a00'],
        message: 'PURCHASE SUCCESSFUL!'
      },
      bid: {
        emojis: ['🎯', '📝', '✍️', '📨', '📤', '✅', '👍', '🚀'],
        colors: ['#00f3ff', '#00ffaa', '#b967ff'],
        message: 'BID SUBMITTED!'
      }
    }

    const config = celebrationTypes[type]
    
    const celebrationContainer = document.createElement('div')
    celebrationContainer.className = 'fixed inset-0 pointer-events-none z-[9999]'
    document.body.appendChild(celebrationContainer)

    // Confetti
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div')
        confetti.className = 'absolute rounded-full'
        confetti.style.cssText = `
          width: ${Math.random() * 10 + 5}px;
          height: ${Math.random() * 10 + 5}px;
          background: ${config.colors[Math.floor(Math.random() * config.colors.length)]};
          top: -20px;
          left: ${Math.random() * 100}%;
          opacity: 0.9;
        `
        celebrationContainer.appendChild(confetti)

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

    // Emojis
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const emoji = document.createElement('div')
        emoji.className = 'absolute text-3xl'
        emoji.textContent = config.emojis[Math.floor(Math.random() * config.emojis.length)]
        emoji.style.cssText = `
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          animation: float-up ${2 + Math.random() * 2}s ease-out forwards;
        `
        celebrationContainer.appendChild(emoji)

        setTimeout(() => emoji.remove(), 3000)
      }, i * 100)
    }

    // Message
    const message = document.createElement('div')
    message.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'
    message.innerHTML = `
      <div class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#00f3ff] via-[#b967ff] to-[#ff00ff] text-transparent bg-clip-text mb-4">
        ${config.message}
      </div>
      <div class="text-lg text-gray-300">Thank you for choosing GigFlow!</div>
    `
    celebrationContainer.appendChild(message)

    // Remove celebration
    setTimeout(() => {
      celebrationContainer.remove()
    }, 4000)

    // Cleanup
    return () => {
      if (document.body.contains(celebrationContainer)) {
        document.body.removeChild(celebrationContainer)
      }
    }
  }, [trigger, type])
}

export default useCelebration