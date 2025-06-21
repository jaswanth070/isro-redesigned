"use client"

import { useState, useEffect } from "react"
import DisclaimerScreen from "@/components/disclaimer-screen"
import Header from "@/components/header"
import HeroCarousel from "@/components/hero-carousel"
import FlashNews from "@/components/flash-news"
import KeyLinks from "@/components/key-links"
import LatestNews from "@/components/latest-news"
import IsroPortals from "@/components/isro-portals"
import RecentUpdates from "@/components/recent-updates"
import IsroCentres from "@/components/isro-centres"
import Footer from "@/components/footer"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [isHeroSection, setIsHeroSection] = useState(true)
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  const handleDisclaimerComplete = () => {
    setShowDisclaimer(false)
  }

  useEffect(() => {
    if (!showDisclaimer) {
      const handleScroll = () => {
        const heroHeight = window.innerHeight
        const scrollY = window.scrollY

        // Check if we're still in hero section - account for header height
        setIsHeroSection(scrollY < heroHeight - 80)

        // Determine active section based on scroll position
        const sections = [
          { id: "home", start: 0, end: heroHeight },
          { id: "flash-news", start: heroHeight, end: heroHeight + 200 },
          { id: "key-links", start: heroHeight + 200, end: heroHeight + 600 },
          { id: "latest-news", start: heroHeight + 600, end: heroHeight + 1200 },
          { id: "portals", start: heroHeight + 1200, end: heroHeight + 1800 },
          { id: "updates", start: heroHeight + 1800, end: heroHeight + 2400 },
          { id: "centres", start: heroHeight + 2400, end: heroHeight + 3000 },
        ]

        const currentSection = sections.find((section) => scrollY >= section.start && scrollY < section.end)

        if (currentSection) {
          setActiveSection(currentSection.id)
        }
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [showDisclaimer])

  if (showDisclaimer) {
    return <DisclaimerScreen onComplete={handleDisclaimerComplete} />
  }

  return (
    <div className="min-h-screen bg-[#120f12]">
      <Header isHeroSection={isHeroSection} activeSection={activeSection} />
      <HeroCarousel isDisclaimerComplete={!showDisclaimer} />
      <FlashNews />
      <KeyLinks />
      <LatestNews />
      <IsroPortals />
      <RecentUpdates />
      <IsroCentres />
      <Footer />
    </div>
  )
}
