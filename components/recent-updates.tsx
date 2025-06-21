"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import recentUpdatesData from "@/data/recent-updates.json"

export default function RecentUpdates() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { updates } = recentUpdatesData
  const itemsPerPage = 4
  const totalPages = Math.ceil(updates.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage >= updates.length ? 0 : prev + itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerPage < 0 ? Math.max(0, updates.length - itemsPerPage) : prev - itemsPerPage,
    )
  }

  const goToPage = (pageIndex: number) => {
    setCurrentIndex(pageIndex * itemsPerPage)
  }

  const visibleUpdates = updates.slice(currentIndex, currentIndex + itemsPerPage)
  const currentPage = Math.floor(currentIndex / itemsPerPage)

  return (
    <section className="bg-[#120f12] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-white mb-4">Recent Updates</h2>
          <p className="body-md text-gray-400">Stay up-to-date with ISRO's latest programmes</p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleUpdates.map((update) => (
              <div
                key={update.id}
                className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-orange-400 transition-all duration-300 cursor-pointer group relative h-80"
              >
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={update.image || "/placeholder.svg"}
                    alt={update.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Default state - title at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-white font-semibold text-lg leading-tight">{update.title}</h3>
                  </div>

                  {/* Hover state - centered content */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                    <div className="text-center text-white">
                      <h3 className="font-semibold text-lg mb-3 text-orange-400">{update.title}</h3>
                      <p className="body-sm text-gray-200 mb-4 leading-relaxed">{update.description}</p>
                      {update.hasReadMore && (
                        <a href={update.link}>
                          <Button className="glass-button text-white px-4 py-2 rounded-full flex items-center space-x-2 mx-auto">
                            <span>Read more</span>
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex + itemsPerPage >= updates.length}
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentPage === index ? "bg-orange-400" : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          {/* Page indicator */}
          <div className="text-center mt-4">
            <span className="text-gray-400 text-sm">
              Page {currentPage + 1} of {totalPages} ({updates.length} total updates)
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
