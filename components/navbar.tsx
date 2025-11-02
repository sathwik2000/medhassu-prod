"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Moon, Sun } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useFuzzySearch } from "@/hooks/use-fuzzy-search"
import { useTheme } from "next-themes"

interface SearchResult {
  id: string
  title: string
  type: "course"
}

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { search } = useFuzzySearch()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }

    try {
      const res = await fetch("/api/courses")
      const courses = await res.json()

      const filtered = search(courses, query, ["title", "description"])
      setResults(
        filtered.map((course: any) => ({
          id: course.id,
          title: course.title,
          type: "course",
        })),
      )
      setIsOpen(true)
    } catch (error) {
      console.error("Search failed:", error)
    }
  }

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) return null

  return (
    <nav className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">
        <Link href="/" className="font-bold text-xl hover:opacity-70 transition-opacity">
          Medhassu
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8 relative">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setIsOpen(true)}
              onBlur={() => setTimeout(() => setIsOpen(false), 200)}
              className="pl-10 pr-4"
            />
          </div>

          {/* Search results dropdown */}
          {isOpen && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={`/courses/${result.id}`}
                  className="block px-4 py-3 hover:bg-accent first:rounded-t-lg last:rounded-b-lg text-sm border-b last:border-b-0 transition-colors"
                  onClick={() => {
                    setSearchQuery("")
                    setIsOpen(false)
                  }}
                >
                  {result.title}
                </Link>
              ))}
            </div>
          )}

          {isOpen && searchQuery && results.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg p-4 text-sm text-muted-foreground text-center z-50">
              No courses found
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            className="rounded-full"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </nav>
  )
}
