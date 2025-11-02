"use client"

import { useState, useMemo } from "react"
import { CourseGrid } from "@/components/course-grid"
import { SearchBar } from "@/components/search-bar"
import type { Course } from "@/lib/courses"

interface SearchPageClientProps {
  initialCourses: Course[]
}

export function SearchPageClient({ initialCourses }: SearchPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return initialCourses

    const query = searchQuery.toLowerCase()
    return initialCourses.filter((course) => {
      const titleMatch = course.title.toLowerCase().includes(query)
      const descMatch = course.description?.toLowerCase().includes(query)
      const tagsMatch = course.tags?.some((tag) => tag.toLowerCase().includes(query))
      const contentMatch = course.content?.toLowerCase().includes(query)
      return titleMatch || descMatch || tagsMatch || contentMatch
    })
  }, [initialCourses, searchQuery])

  return (
    <div className="space-y-4">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">
            {searchQuery ? `Search Results (${filteredCourses.length})` : "All Courses"}
          </h2>
          {searchQuery && filteredCourses.length === 0 && (
            <p className="text-muted-foreground mt-2">No courses found matching "{searchQuery}"</p>
          )}
        </div>
        <CourseGrid courses={filteredCourses} />
      </div>
    </div>
  )
}
