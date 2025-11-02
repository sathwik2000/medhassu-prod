"use client"

import { useMemo } from "react"
import { markdownToHtml } from "@/lib/markdown"
import { YouTubeEmbed } from "@/components/youtube-embed"
import type { Course } from "@/lib/courses"

interface CourseContentProps {
  course: Course
}

export function CourseContent({ course }: CourseContentProps) {
  const htmlContent = useMemo(() => markdownToHtml(course.content), [course.content])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-balance mb-4">{course.title}</h1>
        <p className="text-lg text-muted-foreground">{course.description}</p>
      </div>

      {course.thumbnail && (
        <div className="aspect-video rounded-lg overflow-hidden">
          <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        {course.lessons?.map((lesson, index) => (
          <section key={index} className="space-y-4">
            <h2 className="text-2xl font-bold">{lesson.title}</h2>

            {lesson.videoUrl && <YouTubeEmbed url={lesson.videoUrl} title={lesson.title} />}

            <div dangerouslySetInnerHTML={{ __html: markdownToHtml(lesson.content) }} className="space-y-4" />
          </section>
        ))}
      </div>

      {!course.lessons?.length && <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="space-y-4" />}
    </div>
  )
}
