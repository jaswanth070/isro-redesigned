import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  const quickLinks = ["RTI", "Contact Us", "FAQ", "Feedback", "Chandrayaan-3"]

  const reports = ["Press Release", "Publications", "Annual Report", "Tender", "Chandrayaan-3"]

  const ourPortals = ["NavIC/IRNSS Service", "CBSE-ISRO", "PIB"]

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Address Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="ISRO Logo"
                width={40}
                height={40}
                className="rounded"
              />
              <div className="text-white">
                <div className="text-sm font-semibold">Indian Space</div>
                <div className="text-xs text-gray-300">Research Organisation</div>
              </div>
            </div>
            <div className="text-gray-400 text-sm space-y-2">
              <p>
                <strong className="text-white">Address</strong>
              </p>
              <p>ISRO Headquarters, Antariksh Bhavan,</p>
              <p>New BEL Road, Bangalore - 560 231</p>
              <p>
                <strong className="text-white">Phone:</strong> +91-80-22172294
              </p>
              <p>
                <strong className="text-white">Email:</strong> secy@isro.gov.in
              </p>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Reports */}
          <div>
            <h3 className="text-white font-semibold mb-4">Reports</h3>
            <ul className="space-y-2">
              {reports.map((report) => (
                <li key={report}>
                  <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                    {report}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Portals */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Portals</h3>
            <ul className="space-y-2">
              {ourPortals.map((portal) => (
                <li key={portal}>
                  <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                    {portal}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 Indian Space Research Organisation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
