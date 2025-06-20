import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ISRO - Indian Space Research Organisation",
  description:
    "Official website of Indian Space Research Organisation (ISRO), Department of Space, Government of India",
  keywords: "ISRO, Indian Space Research Organisation, Space, Satellites, Missions, Chandrayaan, Aditya, NavIC",
  authors: [{ name: "ISRO" }],
  creator: "Indian Space Research Organisation",
  publisher: "ISRO",
  robots: "index, follow",
  openGraph: {
    title: "ISRO - Indian Space Research Organisation",
    description:
      "Official website of Indian Space Research Organisation (ISRO), Department of Space, Government of India",
    url: "https://www.isro.gov.in",
    siteName: "ISRO",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ISRO - Indian Space Research Organisation",
    description:
      "Official website of Indian Space Research Organisation (ISRO), Department of Space, Government of India",
    creator: "@isro",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#f97316" }],
  },
  manifest: "/site.webmanifest",
  themeColor: "#120f12",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#120f12" />
        <meta name="msapplication-TileColor" content="#120f12" />
      </head>
      <body>{children}</body>
    </html>
  )
}
