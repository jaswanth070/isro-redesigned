"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Globe, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import navigationData from "@/data/navigation.json"

interface HeaderProps {
  isHeroSection?: boolean
  activeSection?: string
}

export default function Header({ isHeroSection = false, activeSection = "home" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { navItems } = navigationData

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleDropdown = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId)
  }

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
                  width={80}
                  height={80}
                  className="rounded"
                />
                <div className="h-12 w-px bg-gray-600 hidden sm:block"></div>
                <div className="text-white hidden sm:block">
                  <div className="text-base font-semibold leading-tight">Indian Space</div>
                  <div className="text-base font-semibold leading-tight">Research Organisation</div>
                  <div className="text-sm text-gray-400 leading-tight">Department of Space</div>
                </div>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-6" ref={dropdownRef}>
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <button
                    onClick={() => item.hasDropdown && toggleDropdown(item.id)}
                    className={`transition-colors duration-200 text-sm font-medium flex items-center py-2 px-3 rounded ${
                      activeSection === item.id ? "text-orange-400" : "text-gray-300 hover:text-orange-400"
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`ml-1 h-3 w-3 transition-transform ${
                          activeDropdown === item.id ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === item.id && (
                    <div className="absolute top-full left-0 mt-1 w-80 bg-[#120f12] border border-gray-700 rounded-lg shadow-xl py-2 z-50">
                      <div className="max-h-96 overflow-y-auto">
                        {item.dropdownItems?.map((dropdownItem, index) => (
                          <a
                            key={index}
                            href={dropdownItem.href}
                            target={dropdownItem.external ? "_blank" : "_self"}
                            rel={dropdownItem.external ? "noopener noreferrer" : ""}
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-orange-400 hover:bg-gray-800/50 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {dropdownItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-orange-400 hidden sm:flex">
                <Search className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-orange-400 flex items-center space-x-1"
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs hidden sm:inline">En</span>
              </Button>
              <Image
                src="images/emblem.png?height=40&width=40"
                alt="Indian National Emblem"
                width={60}
                height={60}
                className="rounded hidden sm:block"
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
            <div className="lg:hidden border-t border-gray-800 py-4 bg-[#120f12] max-h-96 overflow-y-auto">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between">
                      <a
                        href={item.href}
                        className={`transition-colors duration-200 py-2 px-4 rounded flex-1 ${
                          activeSection === item.id ? "text-orange-400" : "text-gray-300 hover:text-orange-400"
                        }`}
                      >
                        {item.name}
                      </a>
                      {item.hasDropdown && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleDropdown(item.id)}
                          className="text-gray-300 hover:text-orange-400 px-2"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${activeDropdown === item.id ? "rotate-180" : ""}`}
                          />
                        </Button>
                      )}
                    </div>

                    {/* Mobile Dropdown */}
                    {item.hasDropdown && activeDropdown === item.id && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.dropdownItems?.map((dropdownItem, index) => (
                          <a
                            key={index}
                            href={dropdownItem.href}
                            target={dropdownItem.external ? "_blank" : "_self"}
                            rel={dropdownItem.external ? "noopener noreferrer" : ""}
                            className="block px-4 py-2 text-sm text-gray-400 hover:text-orange-400 transition-colors"
                            onClick={() => {
                              setActiveDropdown(null)
                              setIsMenuOpen(false)
                            }}
                          >
                            {dropdownItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile Search */}
                <div className="px-4 py-2 border-t border-gray-800 mt-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="flex-1 bg-gray-800 text-white px-3 py-2 rounded text-sm"
                    />
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
