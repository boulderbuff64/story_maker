'use client'

import { useEffect, useState } from 'react'

interface Bubble {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  color: string
}

export default function LoadingAnimation() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    const colors = ['#FF6B9D', '#FF8E72', '#FFB347', '#4ECDC4', '#A78BFA']
    const newBubbles: Bubble[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setBubbles(newBubbles)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-white/95 to-bloom-lavender/30 backdrop-blur-sm z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full opacity-60"
          style={{
            left: `${bubble.left}%`,
            bottom: '-50px',
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            backgroundColor: bubble.color,
            animation: `bubble ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
            boxShadow: `inset -2px -2px 4px rgba(0,0,0,0.1), inset 2px 2px 4px rgba(255,255,255,0.5)`,
          }}
        />
      ))}

      {/* Sparkles */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `sparkle ${1 + Math.random()}s ease-in-out ${Math.random() * 2}s infinite`,
          }}
        />
      ))}

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center gap-6 p-8">
        {/* Fizzing bath bomb animation */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-sunset animate-fizz shadow-2xl flex items-center justify-center">
            <span className="text-5xl">🛁</span>
          </div>
          {/* Fizz particles */}
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={`fizz-${i}`}
              className="absolute w-3 h-3 rounded-full bg-white/80"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 45}deg) translateY(-60px)`,
                animation: `sparkle ${0.5 + Math.random() * 0.5}s ease-in-out ${i * 0.1}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-sunset bg-clip-text text-transparent mb-2">
            Creating Your Story
          </h2>
          <p className="text-gray-600 animate-pulse">
            Sprinkling magic dust on your adventure...
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-bloom-pink"
              style={{
                animation: `fizz 1s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
