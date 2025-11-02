"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Course } from "@/lib/courses"

interface CourseSidebarProps {
  course: Course
}

export function CourseSidebar({ course }: CourseSidebarProps) {
  return (
    <div className="space-y-4">
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Course Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lessons</span>
              <span className="font-medium">{course.lessons?.length || 0}</span>
            </div>
            {course.duration && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">{course.duration}</span>
              </div>
            )}
            {course.level && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Level</span>
                <Badge variant="outline" className="text-xs">
                  {course.level}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </Card>

      {course.prerequisites && course.prerequisites.length > 0 && (
        <Card className="p-6 space-y-3">
          <h3 className="font-semibold">Prerequisites</h3>
          <ul className="space-y-2">
            {course.prerequisites.map((prereq) => (
              <li key={prereq} className="text-sm">
                <Link href={`/course/${prereq}`} className="text-primary hover:underline">
                  {prereq}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {course.followups && course.followups.length > 0 && (
        <Card className="p-6 space-y-3">
          <h3 className="font-semibold">Next Steps</h3>
          <ul className="space-y-2">
            {course.followups.map((followup) => (
              <li key={followup} className="text-sm">
                <Link href={`/course/${followup}`} className="text-primary hover:underline">
                  {followup}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {course.tags && course.tags.length > 0 && (
        <Card className="p-6 space-y-3">
          <h3 className="font-semibold">Topics</h3>
          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
