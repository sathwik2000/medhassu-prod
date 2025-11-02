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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* Fixed Navbar */}
          <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md">
            <Navbar />
          </header>

          <SidebarProvider>
            {/* Sidebar fixed below Navbar */}
            <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-sidebar text-sidebar-foreground overflow-y-auto">
              <AppSidebar />
            </aside>

            {/* Main Content Area */}
            <main className="ml-64 mt-16 min-h-[calc(100vh-4rem)] px-6 md:px-10 py-8 bg-background transition-colors duration-300">
              <div className="max-w-5xl mx-auto bg-card text-card-foreground rounded-xl shadow-lg border border-border p-8">
                {children}
              </div>
            </main>
          </SidebarProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
