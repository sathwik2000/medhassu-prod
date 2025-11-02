"use client"

import { useEffect } from "react"

interface GoogleAdsProviderProps {
  publisherId?: string
}

export function GoogleAdsProvider({ publisherId }: GoogleAdsProviderProps) {
  useEffect(() => {
    if (publisherId && typeof window !== "undefined") {
      // Load Google AdSense script
      const script = document.createElement("script")
      script.async = true
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${publisherId}`
      script.crossOrigin = "anonymous"
      document.head.appendChild(script)

      // Initialize ads
      ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
      ;(window as any).adsbygoogle.push({})
    }
  }, [publisherId])

  return null
}
