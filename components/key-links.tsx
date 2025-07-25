import { ArrowUpRight } from "lucide-react"
import keyLinksData from "@/data/key-links.json"

export default function KeyLinks() {
  const { links } = keyLinksData

  return (
    <section className="bg-[#120f12] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-white mb-4">Key Links</h2>
          <p className="body-md text-gray-400 max-w-2xl mx-auto">
            All the important portals to explore opportunities and information about ISRO
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 md:p-6 hover:border-white transition-all duration-300 hover:bg-gray-800/50 cursor-pointer group block relative"
            >
              <div className="absolute top-3 right-3 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>

              {/* Mobile: Only icon and title */}
              <div className="md:hidden text-center">
                <div className="text-2xl mb-2 text-gray-400">{link.icon}</div>
                <h3 className="text-white font-semibold text-sm group-hover:text-orange-400 transition-colors">
                  {link.title}
                </h3>
              </div>

              {/* Desktop: Full content */}
              <div className="hidden md:block">
                <div className="text-3xl mb-4 text-gray-400">{link.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-orange-400 transition-colors">
                  {link.title}
                </h3>
                <p className="text-gray-400 body-sm">{link.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
