"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface DisclaimerScreenProps {
  onComplete: () => void
}

export default function DisclaimerScreen({ onComplete }: DisclaimerScreenProps) {
  const [progress, setProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState(7)

  useEffect(() => {
    const duration = 7000 // 7 seconds
    const interval = 50 // Update every 50ms for smooth animation

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (interval / duration) * 100
        if (newProgress >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 200) // Small delay before transitioning
          return 100
        }
        return newProgress
      })
    }, interval)

    // Update countdown timer
    const countdownTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(timer)
      clearInterval(countdownTimer)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-[#120f12] z-50 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-blue-600/20" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* ISRO Logo */}
        <div className="mb-8 animate-fadeInUp">
          <div className="flex items-center justify-center space-x-6 mb-6">
            <Image
              src="images/isro_logo.png?height=80&width=80"
              alt="ISRO Logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
            <div className="h-16 w-px bg-gray-600 hidden sm:block"></div>
            <div className="text-white text-left hidden sm:block">
              <div className="text-xl font-bold leading-tight">Indian Space</div>
              <div className="text-xl font-bold leading-tight">Research Organisation</div>
              <div className="text-sm text-gray-400 leading-tight">Department of Space</div>
            </div>
          </div>
        </div>

        {/* Main Disclaimer */}
        <div className="mb-8 animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 gradient-text">
            Tribute to ISRO Scientists
          </h1>
          
          <div className="space-y-4 text-gray-300 max-w-2xl mx-auto">
            <p className="text-lg leading-relaxed">
              This website is solely developed to <span className="text-orange-400 font-semibold">honor and celebrate</span> the 
              remarkable achievements of ISRO scientists and their contributions to space exploration.
            </p>
            
            <p className="text-base leading-relaxed">
              There are <span className="text-orange-400 font-semibold">no commercial intentions</span> or affiliations. 
              This is a tribute to the brilliant minds who have made India proud in the field of space technology.
            </p>
          </div>
        </div>

        {/* Desktop Recommendation */}
        <div className="mb-8 animate-fadeInUp" style={{ animationDelay: "1s" }}>
          <div className="bg-orange-400/10 border border-orange-400/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-orange-400 font-semibold text-lg">Best Experience on Desktop</h3>
            </div>
            <p className="text-gray-300 text-sm">
              The true beauty and full functionality of this tribute site is best experienced on desktop devices. 
              Consider switching to desktop for the complete immersive experience.
            </p>
          </div>
        </div>

        {/* Loading Progress */}
        <div className="animate-fadeInUp" style={{ animationDelay: "1.5s" }}>
          <div className="mb-4">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-400"></div>
              <span className="text-gray-400 text-sm">Loading content...</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="mt-2 text-gray-500 text-xs">
              {timeLeft > 0 ? `${timeLeft} seconds remaining` : "Ready to launch!"}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 animate-fadeInUp" style={{ animationDelay: "2s" }}>
          <p className="text-gray-500 text-xs">
            Jai Hind | Vande Mataram | 🇮🇳
          </p>
        </div>
      </div>
    </div>
  )
}
