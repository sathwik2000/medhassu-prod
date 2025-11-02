import { notFound } from "next/navigation"
import { getCourseBySlug, getAllCourses } from "@/lib/courses"
import { CourseContent } from "@/components/course-content"
import { CourseSidebar } from "@/components/course-sidebar"
import { GoogleAdSlot } from "@/components/google-ad-slot"
import { Header } from "@/components/header"
import { GitHubCommitButton } from "@/components/github-commit-button"

export async function generateStaticParams() {
  const courses = await getAllCourses()
  return courses.map((course) => ({
    slug: course.slug,
  }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {process.env.NEXT_PUBLIC_GOOGLE_ADS_PUBLISHER_ID && (
              <GoogleAdSlot slotId="course-header-ad" adFormat="auto" fullWidth />
            )}
            <CourseContent course={course} />
            {process.env.NEXT_PUBLIC_GOOGLE_ADS_PUBLISHER_ID && (
              <GoogleAdSlot slotId="course-footer-ad" adFormat="auto" fullWidth />
            )}
          </div>
          <aside>
            <CourseSidebar course={course} />
            {process.env.GITHUB_TOKEN && (
              <div className="mt-4">
                <GitHubCommitButton fileName={`${course.slug}.md`} content={course.content} />
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
