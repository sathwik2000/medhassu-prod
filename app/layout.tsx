import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GoogleAdsProvider } from "@/components/google-ads-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Medhassu - Learn with Markdown-Driven Courses",
  description: "Quality education through markdown-driven content and YouTube videos",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={`font-sans antialiased`}>
        <GoogleAdsProvider publisherId={process.env.NEXT_PUBLIC_GOOGLE_ADS_PUBLISHER_ID} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
