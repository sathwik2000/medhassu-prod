import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AppSidebar } from "@/components/app-sidebar"
import { Navbar } from "@/components/navbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "next-themes"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Medhassu - Learn & Grow",
  description: "Markdown-driven education platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${_geist.className} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* Fixed navbar with backdrop blur */}
          <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <Navbar />
          </header>

          <SidebarProvider>
            {/* Sidebar fixed, below navbar */}
            <aside className="fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-sidebar text-sidebar-foreground">
              <AppSidebar />
            </aside>

            {/* Main content area */}
            <main className="ml-64 mt-16 min-h-screen p-6 md:p-10 transition-colors duration-300">
              <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-xl shadow-lg p-8 border border-border">
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
