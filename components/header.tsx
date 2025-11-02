"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useState } from "react"
import { SearchModal } from "@/components/search-modal"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <header className="border-b border-border sticky top-0 bg-background z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
              M
            </div>
            <span className="font-bold text-lg">Medhassu</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm text-foreground hover:text-primary transition-colors">
              Courses
            </Link>
            <Button variant="outline" size="sm" onClick={() => setIsSearchOpen(true)} className="gap-2">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </nav>
        </div>
      </header>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
