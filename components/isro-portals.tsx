"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import isroPortalsData from "@/data/isro-portals.json"

export default function IsroPortals() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { portals } = isroPortalsData

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % portals.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + portals.length) % portals.length)
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <section className="bg-[#120f12] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-white mb-4">ISRO Portals</h2>
          <p className="body-md text-gray-400">Links to all the ISRO Portals in one place</p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="relative h-80 flex items-center justify-center overflow-hidden">
            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 backdrop-blur-sm border border-gray-700/50"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 backdrop-blur-sm border border-gray-700/50"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Carousel Items */}
            <div className="flex items-center justify-center space-x-8 w-full px-20">
              {/* Previous Portal */}
              <div
                className="flex-shrink-0 cursor-pointer opacity-40 hover:opacity-60 transition-all duration-300 transform scale-75"
                onClick={() => goToSlide((activeIndex - 1 + portals.length) % portals.length)}
              >
                <div className="w-20 h-20 bg-gray-800/50 rounded-2xl flex items-center justify-center border border-gray-700/50 backdrop-blur-sm">
                  <Image
                    src={portals[(activeIndex - 1 + portals.length) % portals.length].logo || "/placeholder.svg"}
                    alt={`${portals[(activeIndex - 1 + portals.length) % portals.length].name} logo`}
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                </div>
              </div>

              {/* Active Portal */}
              <div className="flex-shrink-0 text-center max-w-md">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-orange-400/30">
                    <Image
                      src={portals[activeIndex].logo || "/placeholder.svg"}
                      alt={`${portals[activeIndex].name} logo`}
                      width={48}
                      height={48}
                      className="rounded-xl"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 gradient-text">{portals[activeIndex].name}</h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
                    {portals[activeIndex].description}
                  </p>

                  {portals[activeIndex].href && (
                    <a
                      href={portals[activeIndex].href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-orange-400/20 hover:bg-orange-400/30 text-orange-400 px-6 py-3 rounded-full transition-all duration-300 border border-orange-400/30 hover:border-orange-400/50"
                    >
                      <span className="text-sm font-medium">Visit Portal</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Next Portal */}
              <div
                className="flex-shrink-0 cursor-pointer opacity-40 hover:opacity-60 transition-all duration-300 transform scale-75"
                onClick={() => goToSlide((activeIndex + 1) % portals.length)}
              >
                <div className="w-20 h-20 bg-gray-800/50 rounded-2xl flex items-center justify-center border border-gray-700/50 backdrop-blur-sm">
                  <Image
                    src={portals[(activeIndex + 1) % portals.length].logo || "/placeholder.svg"}
                    alt={`${portals[(activeIndex + 1) % portals.length].name} logo`}
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {portals.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-orange-400 scale-125" : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
