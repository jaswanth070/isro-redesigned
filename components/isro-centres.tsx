"use client"

import { useState, useEffect, useRef } from "react"
import Script from "next/script"
import { MapPin } from "lucide-react"
import isroCentresData from "@/data/isro-centres.json"

declare global {
  interface Window {
    AmCharts: any
  }
}

export default function IsroCentres() {
  const [selectedCentre, setSelectedCentre] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("isro-centres")
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef<any>(null)

  const tabs = [
    { id: "isro-centres", label: "ISRO Centres", data: isroCentresData.isroCentres },
    { id: "in-space", label: "IN-SPACe", data: isroCentresData.inSpaceCentres },
    { id: "cpses", label: "CPSEs", data: isroCentresData.cpses },
    { id: "autonomous", label: "Autonomous", data: isroCentresData.autonomous },
  ]

  // State mapping for highlighting
  const stateMapping: { [key: string]: string } = {
    Karnataka: "IN-KA",
    Kerala: "IN-KL",
    "Tamil Nadu": "IN-TN",
    Uttarakhand: "IN-UT",
    Telangana: "IN-TG",
    "Andhra Pradesh": "IN-AP",
    Gujarat: "IN-GJ",
  }

  const getCurrentTabData = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab)
    return currentTab ? currentTab.data : []
  }

  const initializeMap = () => {
    if (typeof window !== "undefined" && window.AmCharts && !mapRef.current) {
      const map = new window.AmCharts.AmMap()

      map.panEventsEnabled = true
      map.backgroundColor = "#1f2937"
      map.backgroundAlpha = 1

      map.zoomControl.panControlEnabled = false
      map.zoomControl.zoomControlEnabled = false

      const dataProvider = {
        map: "indiaLow",
        getAreasFromMap: true,
      }

      map.dataProvider = dataProvider

      map.areasSettings = {
        autoZoom: false,
        color: "#374151",
        colorSolid: "#f97316",
        selectedColor: "#f97316",
        outlineColor: "#4b5563",
        rollOverColor: "#ea580c",
        rollOverOutlineColor: "#f97316",
        selectable: false,
        unlistedAreasColor: "#374151",
        unlistedAreasAlpha: 0.8,
      }

      map.export = {
        enabled: false,
      }

      map.write("india-map-container")
      mapRef.current = map
      setMapLoaded(true)
    }
  }

  const highlightState = (stateName: string | null) => {
    if (mapRef.current && stateName) {
      const stateCode = stateMapping[stateName]
      if (stateCode) {
        mapRef.current.dataProvider.areas.forEach((area: any) => {
          area.showAsSelected = false
          area.color = "#374151"
        })

        const targetArea = mapRef.current.dataProvider.areas.find((area: any) => area.id === stateCode)

        if (targetArea) {
          targetArea.showAsSelected = true
          targetArea.color = "#f97316"
        }

        mapRef.current.validateNow()
      }
    } else if (mapRef.current) {
      mapRef.current.dataProvider.areas.forEach((area: any) => {
        area.showAsSelected = false
        area.color = "#374151"
      })
      mapRef.current.validateNow()
    }
  }

  const handleCentreHover = (centre: any) => {
    setSelectedCentre(centre.id)
    highlightState(centre.state)
  }

  const handleCentreLeave = () => {
    setSelectedCentre(null)
    highlightState(null)
  }

  useEffect(() => {
    if (mapLoaded) {
      const timer = setTimeout(() => {
        initializeMap()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [mapLoaded])

  useEffect(() => {
    setSelectedCentre(null)
    highlightState(null)
  }, [activeTab])

  return (
    <>
      <Script
        src="https://www.amcharts.com/lib/3/ammap.js"
        onLoad={() => {
          const script1 = document.createElement("script")
          script1.src = "https://www.amcharts.com/lib/3/maps/js/indiaLow.js"
          script1.onload = () => {
            const script2 = document.createElement("script")
            script2.src = "https://www.amcharts.com/lib/3/themes/none.js"
            script2.onload = () => {
              setMapLoaded(true)
              setTimeout(initializeMap, 500)
            }
            document.head.appendChild(script2)
          }
          document.head.appendChild(script1)
        }}
      />

      <section className="bg-[#120f12] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-white mb-4">ISRO Centres & Units</h2>
            <p className="body-md text-gray-400">Links to all the ISRO Centres, Units and Autonomous bodies</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Panel - Centres List */}
            <div className="bg-gray-900/30 border border-gray-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
              {/* Tabs */}
              <div className="flex border-b border-gray-700/50 bg-gray-800/20">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-3 md:px-4 py-3 text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap relative ${
                      activeTab === tab.id
                        ? "text-orange-400 bg-orange-400/10"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/30"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Centres List */}
              <div className="p-4 md:p-6 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                {getCurrentTabData().length > 0 ? (
                  getCurrentTabData().map((centre: any) => (
                    <div
                      key={centre.id}
                      className={`group flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                        selectedCentre === centre.id
                          ? "bg-orange-400/10 border-orange-400/50 shadow-lg shadow-orange-400/20"
                          : "hover:bg-gray-800/40 border-transparent hover:border-gray-600/50"
                      }`}
                      onMouseEnter={() => handleCentreHover(centre)}
                      onMouseLeave={handleCentreLeave}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {centre.name.charAt(0)}
                        </div>
                        {selectedCentre === centre.id && (
                          <div className="absolute -inset-1 bg-orange-400/30 rounded-full animate-pulse"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-lg group-hover:text-orange-400 transition-colors">
                          {centre.name}
                        </h3>
                        <p className="text-gray-300 text-sm leading-tight mt-1 truncate">{centre.fullName}</p>
                        <div className="flex items-center space-x-1 mt-2">
                          <MapPin className="h-3 w-3 text-orange-400 flex-shrink-0" />
                          <p className="text-gray-400 text-xs">
                            {centre.location}, {centre.state}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No centres available in this category</p>
                  </div>
                )}
              </div>

              {/* Count indicator */}
              <div className="px-6 py-4 border-t border-gray-700/50 bg-gray-800/20">
                <p className="text-gray-400 text-sm text-center">
                  <span className="text-orange-400 font-semibold">{getCurrentTabData().length}</span>{" "}
                  {tabs.find((tab) => tab.id === activeTab)?.label} centres
                </p>
              </div>
            </div>

            {/* Right Panel - India Map */}
            <div className="bg-gray-900/30 border border-gray-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
              <div className="relative w-full h-[500px] md:h-[600px]">
                <div id="india-map-container" className="w-full h-full rounded-xl overflow-hidden" />

                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-xl backdrop-blur-sm">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
                      <p className="text-gray-400 text-sm">Loading India Map...</p>
                    </div>
                  </div>
                )}

                {/* Selected Centre Info */}
                {selectedCentre && (
                  <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-sm rounded-xl p-4 text-white max-w-xs border border-orange-400/30">
                    {(() => {
                      const centre = getCurrentTabData().find((c: any) => c.id === selectedCentre)
                      return centre ? (
                        <div>
                          <h4 className="text-lg font-semibold text-orange-400 mb-2">{centre.name}</h4>
                          <p className="text-sm text-gray-300 leading-tight mb-2">{centre.fullName}</p>
                          <div className="flex items-center space-x-1 mb-3">
                            <MapPin className="h-4 w-4 text-orange-400" />
                            <p className="text-sm text-gray-400">
                              {centre.location}, {centre.state}
                            </p>
                          </div>
                          <div className="pt-3 border-t border-gray-600">
                            <p className="text-xs text-gray-400">
                              Category: {tabs.find((tab) => tab.id === activeTab)?.label}
                            </p>
                          </div>
                        </div>
                      ) : null
                    })()}
                  </div>
                )}

                
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(249, 115, 22, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(249, 115, 22, 0.7);
        }
      `}</style>
    </>
  )
}
