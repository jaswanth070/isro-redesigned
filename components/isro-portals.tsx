import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import isroPortalsData from "@/data/isro-portals.json"

export default function IsroPortals() {
  const { portals } = isroPortalsData

  return (
    <section className="bg-[#120f12] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-white mb-4">ISRO Portals</h2>
          <p className="body-md text-gray-400">Links to all the ISRO Portals in one place</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portals.map((portal) => (
            <a
              key={portal.id}
              href={portal.href}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-orange-400 transition-all duration-300 hover:bg-gray-800/50 cursor-pointer group block relative"
            >
              {portal.href && (
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-5 w-5 text-orange-400" />
                </div>
              )}

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Image
                    src={portal.logo || "/placeholder.svg"}
                    alt={`${portal.name} logo`}
                    width={32}
                    height={32}
                    className="rounded"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-orange-400 transition-colors">
                    {portal.name}
                  </h3>
                  <p className="text-gray-400 body-sm leading-relaxed">{portal.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
