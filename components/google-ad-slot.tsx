"use client"

import { useEffect } from "react"

interface GoogleAdSlotProps {
  slotId: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  fullWidth?: boolean
}

export function GoogleAdSlot({ slotId, adFormat = "auto", fullWidth = false }: GoogleAdSlotProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).adsbygoogle) {
      try {
        ;(window as any).adsbygoogle.push({})
      } catch (e) {
        console.error("AdSense error:", e)
      }
    }
  }, [])

  return (
    <div className="w-full flex justify-center py-4">
      <ins
        className="adsbygoogle"
        style={{
          display: fullWidth ? "block" : "inline-block",
          textAlign: "center",
          width: fullWidth ? "100%" : "728px",
          height: fullWidth ? "auto" : "90px",
        }}
        data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADS_PUBLISHER_ID}`}
        data-ad-slot={slotId}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidth ? "true" : "false"}
      />
    </div>
  )
}
