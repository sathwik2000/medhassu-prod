import { list } from "@vercel/blob"
import { parseCourseFrontmatter } from "@/lib/courses"

const COURSES_FOLDER = "courses/"

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const { blobs } = await list({
      prefix: COURSES_FOLDER,
      limit: 1000,
    })

    const courseBlob = blobs.find((blob) => blob.pathname === `${COURSES_FOLDER}${slug}.md`)

    if (!courseBlob) {
      return Response.json({ error: "Course not found" }, { status: 404 })
    }

    const response = await fetch(courseBlob.url)
    const content = await response.text()
    const { metadata, body } = parseCourseFrontmatter(content)

    const lessons = parseCourseLessons(body)

    return Response.json({
      slug,
      title: metadata.title || slug,
      description: metadata.description || "",
      content: body,
      thumbnail: metadata.thumbnail,
      tags: metadata.tags ? metadata.tags.split(",").map((t) => t.trim()) : [],
      duration: metadata.duration,
      level: metadata.level,
      prerequisites: metadata.prerequisites ? metadata.prerequisites.split(",").map((p) => p.trim()) : [],
      followups: metadata.followups ? metadata.followups.split(",").map((f) => f.trim()) : [],
      lessons,
      metadata,
    })
  } catch (error) {
    console.error("[v0] Error fetching course:", error)
    return Response.json({ error: "Failed to fetch course" }, { status: 500 })
  }
}

function parseCourseLessons(content: string) {
  const lessons = []
  const lessonsRegex = /## (.*?)\n([\s\S]*?)(?=## |Z)/g
  let match

  while ((match = lessonsRegex.exec(content)) !== null) {
    const title = match[1]
    const lessonContent = match[2]
    const videoUrlMatch = lessonContent.match(/https?:\/\/(www\.)?youtube/)
    const videoUrl = videoUrlMatch ? extractYoutubeUrl(lessonContent) : undefined

    lessons.push({
      title: title.trim(),
      content: lessonContent.trim(),
      videoUrl,
    })
  }

  return lessons.length > 0 ? lessons : undefined
}

function extractYoutubeUrl(content: string): string | undefined {
  const urlMatch = content.match(/https?:\/\/(www\.)?(youtube\.com\/watch\?v=[\w-]+|youtu\.be\/[\w-]+)/)
  return urlMatch ? urlMatch[0] : undefined
}
