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
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* --- Fixed Navbar --- */}
          <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
            <Navbar />
          </header>

          {/* --- App Layout --- */}
          <div className="flex pt-16 h-screen overflow-hidden">
            <SidebarProvider>
              {/* Sidebar (scrolls independently) */}
              <aside className="w-64 h-full border-r border-border bg-sidebar text-sidebar-foreground overflow-y-auto">
                <AppSidebar />
              </aside>

              {/* Main Content Area */}
              <main className="flex-1 overflow-y-auto bg-background transition-colors duration-300 p-6 md:p-10">
                <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-xl shadow-lg p-8 border border-border">
                  {children}
                </div>
              </main>
            </SidebarProvider>
          </div>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  )
}
