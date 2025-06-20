"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import heroData from "@/data/hero-slides.json"

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { slides } = heroData
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 10000) // 5 seconds per slide
    return () => clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    // Play current video and pause others
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide) {
          video.play().catch(() => {
            // Fallback to poster image if video fails to play
          })
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Video Background */}
          {slide.videoUrl ? (
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              loop
              playsInline
              poster={slide.backgroundImage}
            >
              <source src={slide.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
              }}
            />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="relative z-10 flex items-center h-full">
            <div className="container mx-auto px-4">
              {/* Content positioned with proper spacing from left arrow */}
              <div className="max-w-2xl text-white ml-16 lg:ml-20">
                {slide.id === "welcome" ? (
                  <div>
                    <h1 className="heading-xl mb-4">{slide.title}</h1>
                    <h2 className="heading-lg text-orange-400">{slide.subtitle}</h2>
                  </div>
                ) : (
                  <div>
                    <p className="caption text-orange-400 mb-4">PROJECT</p>
                    <h1 className="heading-xl mb-6">{slide.title}</h1>
                    <p className="body-lg mb-8 text-gray-200 max-w-xl leading-relaxed">{slide.description}</p>
                    {slide.hasReadMore && (
                      <Button className="glass-button text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-white/20">
                        <span>Read more</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-400 transition-colors z-20 bg-black/20 hover:bg-black/40 rounded-full p-2"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-400 transition-colors z-20 bg-black/20 hover:bg-black/40 rounded-full p-2"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-orange-400" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Current Slide Title */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-sm z-20">
        {slides[currentSlide].id === "welcome" ? "Welcome" : slides[currentSlide].title}
      </div>
    </section>
  )
}
