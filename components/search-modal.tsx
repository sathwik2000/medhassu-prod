"use client"

import { useState, useMemo, useEffect } from "react"
import { X, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAllCourses } from "@/lib/courses"
import type { Course } from "@/lib/courses"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      getAllCourses().then((data) => {
        setCourses(data)
        setLoading(false)
      })
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        // This would need parent component support for opening
      }
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses.slice(0, 5)

    const query = searchQuery.toLowerCase()
    return courses.filter((course) => {
      const titleMatch = course.title.toLowerCase().includes(query)
      const descMatch = course.description?.toLowerCase().includes(query)
      const tagsMatch = course.tags?.some((tag) => tag.toLowerCase().includes(query))
      const contentMatch = course.content?.toLowerCase().includes(query)
      return titleMatch || descMatch || tagsMatch || contentMatch
    })
  }, [courses, searchQuery])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[70vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Search Courses</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search courses by title, description, tags, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="pl-10 py-2"
            />
          </div>
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-1 p-4">
          {loading ? (
            <p className="text-muted-foreground text-center py-8">Loading courses...</p>
          ) : filteredCourses.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              {searchQuery ? `No courses found matching "${searchQuery}"` : "Start typing to search"}
            </p>
          ) : (
            <div className="space-y-2">
              {filteredCourses.map((course) => (
                <Link key={course.slug} href={`/course/${course.slug}`}>
                  <button
                    onClick={onClose}
                    className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <h3 className="font-semibold text-foreground">{course.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{course.description}</p>
                    {course.tags && course.tags.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {course.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
