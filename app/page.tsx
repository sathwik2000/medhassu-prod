"use client"
import { RecommendedCourses } from "@/components/recommended-courses"
import { Header } from "@/components/header"
import { getAllCourses } from "@/lib/courses"
import { CourseGrid } from "@/components/course-grid"
import { GoogleAdSlot } from "@/components/google-ad-slot"

export default async function Home() {
  const courses = await getAllCourses()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Medhassu</h1>
              <p className="text-lg text-muted-foreground">Learn from carefully curated courses</p>
            </div>
          </div>

          {process.env.NEXT_PUBLIC_GOOGLE_ADS_PUBLISHER_ID && (
            <GoogleAdSlot slotId="home-hero-ad" adFormat="auto" fullWidth />
          )}

          {/* Recommended Courses Section */}
          <RecommendedCourses courses={courses} />

          {process.env.NEXT_PUBLIC_GOOGLE_ADS_PUBLISHER_ID && (
            <GoogleAdSlot slotId="home-middle-ad" adFormat="auto" fullWidth />
          )}

          {/* All Courses Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">All Courses</h2>
            <CourseGrid courses={courses} />
          </div>
        </div>
      </main>
    </div>
  )
}
