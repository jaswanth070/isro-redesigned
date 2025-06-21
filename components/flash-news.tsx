"use client"

import { useState, useEffect } from "react"
import flashNewsData from "@/data/flash-news.json"

export default function FlashNews() {
  const [currentNews, setCurrentNews] = useState(0)
  const { news } = flashNewsData

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % news.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [news.length])

  return (
    <section className="bg-[#120f12] py-8">
      <div className="container mx-auto px-4">
        <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700/50">
          <div className="text-center">
            <h3 className="text-orange-400 font-semibold mb-4 caption">Flash news</h3>
            <div className="relative h-12 overflow-hidden">
              {news.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${
                    index === currentNews ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  <a href={item.href} target="_blank">

                  <p className="text-white text-center max-w-4xl body-md">{item.text}</p>
                  </a>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-2 mt-4">
              {news.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentNews(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentNews ? "bg-orange-400" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
