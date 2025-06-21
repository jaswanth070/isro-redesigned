"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import latestNewsData from "@/data/latest-news.json"

export default function LatestNews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { news } = latestNewsData
  const itemsPerPage = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage >= news.length ? 0 : prev + itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - itemsPerPage < 0 ? Math.max(0, news.length - itemsPerPage) : prev - itemsPerPage))
  }

  const visibleNews = news.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <section className="bg-[#120f12] py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center w-full">
            <h2 className="heading-lg text-white mb-4">Latest News</h2>
            <p className="body-md text-gray-400">Stay up to date with the latest from India's space sector</p>
          </div>
          {/* <Button
            variant="outline"
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-orange-400 ml-8"
          >
            All News
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button> */}
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleNews.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-orange-400 transition-all duration-300 cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Dark overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Reading time badge */}
                  <div className="absolute top-4 left-4 reading-time-badge text-white text-xs px-3 py-1 rounded-full border border-white/20">
                    {item.readTime}
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4 transform group-hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {Array.from({ length: Math.ceil(news.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / itemsPerPage) === index ? "bg-orange-400" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
