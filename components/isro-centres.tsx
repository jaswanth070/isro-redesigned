"use client"

import { useState } from "react"
import isroCentresData from "@/data/isro-centres.json"

export default function IsroCentres() {
  const [selectedCentre, setSelectedCentre] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("isro-centres")
  const { centres } = isroCentresData

  const tabs = [
    { id: "isro-centres", label: "Isro Centres" },
    { id: "in-space", label: "IN-SPACe" },
    { id: "cpses", label: "CPSEs" },
    { id: "autonomous", label: "Autonomous" },
  ]

  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">ISRO Centres & Units</h2>
          <p className="text-gray-400">Links to all the ISRO Centres, Units and Autonomous bodies</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Centres List */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-800">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-orange-400 border-b-2 border-orange-400 bg-gray-800/50"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Centres List */}
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {centres.map((centre) => (
                <div
                  key={centre.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedCentre === centre.id ? "bg-orange-400/20 border border-orange-400" : "hover:bg-gray-800/50"
                  }`}
                  onMouseEnter={() => setSelectedCentre(centre.id)}
                  onMouseLeave={() => setSelectedCentre(null)}
                >
                  <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {centre.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{centre.name}</h3>
                    <p className="text-gray-400 text-sm">{centre.fullName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - India Map */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Simplified India Map SVG */}
              <svg viewBox="0 0 400 500" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* India outline - simplified */}
                <path
                  d="M200 50 L250 80 L280 120 L300 160 L320 200 L340 240 L350 280 L360 320 L350 360 L340 400 L320 430 L280 450 L240 460 L200 470 L160 460 L120 450 L80 430 L60 400 L50 360 L40 320 L50 280 L60 240 L80 200 L100 160 L120 120 L150 80 L200 50 Z"
                  fill={selectedCentre ? "#374151" : "#1f2937"}
                  stroke="#4b5563"
                  strokeWidth="2"
                  className="transition-colors duration-300"
                />

                {/* State highlights based on selected centre */}
                {selectedCentre && centres.find((c) => c.id === selectedCentre)?.state === "Karnataka" && (
                  <circle cx="200" cy="350" r="20" fill="#f97316" className="animate-pulse" />
                )}

                {selectedCentre && centres.find((c) => c.id === selectedCentre)?.state === "Tamil Nadu" && (
                  <circle cx="180" cy="400" r="20" fill="#f97316" className="animate-pulse" />
                )}

                {selectedCentre && centres.find((c) => c.id === selectedCentre)?.state === "Uttarakhand" && (
                  <circle cx="200" cy="150" r="20" fill="#f97316" className="animate-pulse" />
                )}

                {/* Location markers */}
                {centres.map((centre) => (
                  <circle
                    key={centre.id}
                    cx={centre.coordinates[0] * 2}
                    cy={centre.coordinates[1] * 10}
                    r="4"
                    fill={selectedCentre === centre.id ? "#f97316" : "#6b7280"}
                    className="transition-colors duration-300"
                  />
                ))}
              </svg>

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-black/80 rounded p-2">
                <p className="text-white text-xs">India Map</p>
                <p className="text-gray-400 text-xs">Hover on centres to highlight states</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
