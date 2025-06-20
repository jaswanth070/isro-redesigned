"use client"

import { useState } from "react"
import { Search, Globe, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HeaderProps {
  isHeroSection?: boolean
  activeSection?: string
}

export default function Header({ isHeroSection = false, activeSection = "home" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "#", id: "home" },
    { name: "About", href: "#", hasDropdown: true, id: "about" },
    { name: "Activities", href: "#", hasDropdown: true, id: "activities" },
    { name: "Services", href: "#", hasDropdown: true, id: "services" },
    { name: "Programmes", href: "#", hasDropdown: true, id: "programmes" },
    { name: "Resources", href: "#", hasDropdown: true, id: "resources" },
    { name: "Engage with US", href: "#", hasDropdown: true, id: "engage" },
  ]

  return (
    <>
      {/* Navbar shadow overlay for hero section */}
      {isHeroSection && <div className="fixed top-0 left-0 right-0 h-32 navbar-shadow pointer-events-none z-40" />}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHeroSection ? "bg-transparent" : "bg-[#120f12]/95 backdrop-blur-sm border-b border-gray-800"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <Image
                  src="images/isro_logo.png?height=60&width=60"
                  alt="ISRO Logo"
                  width={70}
                  height={70}
                  className="rounded"
                />
                <div className="h-12 w-px bg-gray-600"></div>
                <div className="text-white">
                  <div className="text-base font-semibold leading-tight">Indian Space</div>
                  <div className="text-base font-semibold leading-tight">Research Organisation</div>
                  <div className="text-sm text-gray-400 leading-tight">Department of Space</div>
                </div>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <a
                    href={item.href}
                    className={`transition-colors duration-200 text-sm font-medium flex items-center ${
                      activeSection === item.id ? "text-orange-400" : "text-gray-300 hover:text-orange-400"
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <svg className="ml-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </a>
                </div>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-orange-400">
                <Search className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-orange-400 flex items-center space-x-1"
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs">En</span>
              </Button>
              <Image
                src="images/emblem.png?height=40&width=40"
                alt="Indian National Emblem"
                width={50}
                height={50}
                className="rounded"
              />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-800 py-4 bg-[#120f12]">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`transition-colors duration-200 py-2 px-4 rounded ${
                      activeSection === item.id ? "text-orange-400" : "text-gray-300 hover:text-orange-400"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
