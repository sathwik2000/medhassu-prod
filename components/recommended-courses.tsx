"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Course } from "@/lib/courses"
import { ChevronLeft, ChevronRight, Grid3x3, List } from "lucide-react"

interface RecommendedCoursesProps {
  courses: Course[]
}

export function RecommendedCourses({ courses }: RecommendedCoursesProps) {
  const [theme, setTheme] = useState<"cards" | "carousel" | "minimal">("cards")
  const [carouselIndex, setCarouselIndex] = useState(0)

  // Get top 6 recommended courses (first 6 or filtered by tags)
  const recommendedCourses = courses.slice(0, 6)

  if (recommendedCourses.length === 0) return null

  return (
    <div className="space-y-4 border-b pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Recommended For You</h2>
          <p className="text-sm text-muted-foreground">Curated selection to get you started</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={theme === "cards" ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme("cards")}
            title="Cards view"
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button
            variant={theme === "carousel" ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme("carousel")}
            title="Carousel view"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant={theme === "minimal" ? "default" : "outline"}
            size="sm"
            onClick={() => setTheme("minimal")}
            title="Minimal view"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Cards Layout */}
      {theme === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedCourses.map((course) => (
            <Link key={course.slug} href={`/course/${course.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all cursor-pointer group overflow-hidden border-2 border-accent">
                <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center">
                      <div className="text-primary text-center">
                        <div className="text-3xl mb-2">⭐</div>
                        <p className="text-xs font-semibold">{course.level || "All Levels"}</p>
                      </div>
                    </div>
                  )}
                  <Badge className="absolute top-3 right-3 bg-accent">Recommended</Badge>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-lg line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {course.tags?.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Carousel Layout */}
      {theme === "carousel" && (
        <div className="space-y-4">
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <Link href={`/course/${recommendedCourses[carouselIndex].slug}`}>
                <div className="aspect-video bg-muted relative group cursor-pointer">
                  {recommendedCourses[carouselIndex].thumbnail ? (
                    <img
                      src={recommendedCourses[carouselIndex].thumbnail || "/placeholder.svg"}
                      alt={recommendedCourses[carouselIndex].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/40 to-accent/30 flex items-center justify-center">
                      <div className="text-primary text-center">
                        <div className="text-5xl mb-2">⭐</div>
                      </div>
                    </div>
                  )}
                  <Badge className="absolute top-4 right-4 bg-accent">
                    {carouselIndex + 1} of {recommendedCourses.length}
                  </Badge>
                </div>
              </Link>
            </div>

            {/* Carousel Controls */}
            <div className="flex gap-2 mt-4 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCarouselIndex((i) => (i === 0 ? recommendedCourses.length - 1 : i - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCarouselIndex((i) => (i === recommendedCourses.length - 1 ? 0 : i + 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Course Info */}
            <div className="mt-4 space-y-2">
              <h3 className="font-bold text-lg">{recommendedCourses[carouselIndex].title}</h3>
              <p className="text-sm text-muted-foreground">{recommendedCourses[carouselIndex].description}</p>
              <div className="flex gap-2 flex-wrap">
                {recommendedCourses[carouselIndex].tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimal Layout */}
      {theme === "minimal" && (
        <div className="space-y-2">
          {recommendedCourses.map((course, index) => (
            <Link key={course.slug} href={`/course/${course.slug}`}>
              <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer group">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center font-bold text-accent">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{course.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <Badge variant="secondary" className="text-xs">
                    {course.level || "All"}
                  </Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
