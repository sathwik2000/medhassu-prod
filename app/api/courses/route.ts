import { list } from "@vercel/blob"
import { parseCourseFrontmatter } from "@/lib/courses"

const COURSES_FOLDER = "courses/"

export async function GET() {
  try {
    const { blobs } = await list({
      prefix: COURSES_FOLDER,
      limit: 1000,
    })

    const courses = await Promise.all(
      blobs
        .filter((blob) => blob.pathname.endsWith(".md"))
        .map(async (blob) => {
          const response = await fetch(blob.url)
          const content = await response.text()
          const { metadata, body } = parseCourseFrontmatter(content)

          const slug = blob.pathname.replace(COURSES_FOLDER, "").replace(".md", "").toLowerCase()

          return {
            slug,
            title: metadata.title || slug,
            description: metadata.description || "",
            content: body,
            thumbnail: metadata.thumbnail,
            tags: metadata.tags ? metadata.tags.split(",").map((t) => t.trim()) : [],
            duration: metadata.duration,
            level: metadata.level as "beginner" | "intermediate" | "advanced" | undefined,
            prerequisites: metadata.prerequisites ? metadata.prerequisites.split(",").map((p) => p.trim()) : [],
            followups: metadata.followups ? metadata.followups.split(",").map((f) => f.trim()) : [],
            metadata,
          }
        }),
    )

    return Response.json(courses.sort((a, b) => a.title.localeCompare(b.title)))
  } catch (error) {
    console.error("[v0] Error fetching courses:", error)
    return Response.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}
