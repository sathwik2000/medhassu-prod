export interface Lesson {
  title: string
  content: string
  videoUrl?: string
}

export interface Course {
  slug: string
  title: string
  description: string
  content: string
  thumbnail?: string
  tags?: string[]
  lessons?: Lesson[]
  duration?: string
  level?: "beginner" | "intermediate" | "advanced"
  prerequisites?: string[]
  followups?: string[]
  metadata?: Record<string, string>
}

// In-memory cache for courses
let coursesCache: Course[] | null = null

export async function getAllCourses(): Promise<Course[]> {
  if (coursesCache) {
    return coursesCache
  }

  try {
    const response = await fetch("/api/courses", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    })
    const courses = await response.json()
    coursesCache = courses
    return courses
  } catch {
    return []
  }
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const response = await fetch(`/api/courses/${slug}`, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

export function parseCourseFrontmatter(content: string): { metadata: Record<string, string>; body: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { metadata: {}, body: content }
  }

  const [, frontmatterStr, body] = match
  const metadata: Record<string, string> = {}

  frontmatterStr.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":")
    if (key && valueParts.length > 0) {
      metadata[key.trim()] = valueParts.join(":").trim()
    }
  })

  return { metadata, body }
}
