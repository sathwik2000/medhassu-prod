"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Moon, Sun, BookOpen, Menu } from "lucide-react"
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
        }))
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
    <nav className="navbar fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background/80 backdrop-blur-md shadow-sm flex items-center">
      <div className="flex items-center justify-between w-full px-6 max-w-7xl mx-auto">
        {/* --- Left Section: Logo --- */}
        <div className="flex items-center gap-4">
          {/* Mobile sidebar toggle (optional future use) */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          <Link
            href="/"
            className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 shadow-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Medhassu
            </span>
          </Link>
        </div>

        {/* --- Center Section: Search --- */}
        <div className="flex-1 max-w-md mx-6 relative hidden md:block">
          <div className="relative group">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-purple-500 transition-colors pointer-events-none" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setIsOpen(true)}
              onBlur={() => setTimeout(() => setIsOpen(false), 200)}
              className="pl-10 pr-4 border-2 focus-visible:border-purple-500 focus-visible:ring-purple-500/20 transition-all duration-300"
            />
          </div>

          {/* Dropdown results */}
          {isOpen && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto backdrop-blur-xl bg-background/95">
              {results.map((result, index) => (
                <Link
                  key={result.id}
                  href={`/courses/${result.id}`}
                  className="block px-4 py-3 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 first:rounded-t-xl last:rounded-b-xl text-sm border-b last:border-b-0 transition-all duration-200 group"
                  onClick={() => {
                    setSearchQuery("")
                    setIsOpen(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-medium">
                      {result.title}
                    </span>
                  </div>
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

        {/* --- Right Section: Theme Toggle --- */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            className="rounded-full"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </nav>
  )
}
