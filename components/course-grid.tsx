"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Course } from "@/lib/courses"

interface CourseGridProps {
  courses: Course[]
}

export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Link key={course.slug} href={`/course/${course.slug}`}>
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
            <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <div className="text-primary/50 text-center">
                    <div className="text-4xl mb-2">📚</div>
                    <p className="text-sm">{course.title}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {course.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">{course.lessons?.length || 0} lessons</div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
