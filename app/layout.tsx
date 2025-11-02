import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AppSidebar } from "@/components/app-sidebar"
import { Navbar } from "@/components/navbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "next-themes"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Medhassu - Learn & Grow",
  description: "Markdown-driven education platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* Fixed Navbar */}
          <header className="navbar">
            <Navbar />
          </header>

          <SidebarProvider>
            {/* Fixed Sidebar below Navbar */}
            <aside className="app-sidebar">
              <AppSidebar />
            </aside>

            {/* Main Content */}
            <main className="content-area">
              <div className="content-card">{children}</div>
            </main>
          </SidebarProvider>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  )
}
