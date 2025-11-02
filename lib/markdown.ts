import { readdir } from "fs/promises"
import { readFile } from "fs/promises"
import path from "path"

interface Course {
  id: string
  title: string
  description: string
}

export async function getCourses(): Promise<Course[]> {
  const coursesDir = path.join(process.cwd(), "md/courses")

  try {
    const folders = await readdir(coursesDir, { withFileTypes: true })
    const courses: Course[] = []

    for (const folder of folders) {
      if (!folder.isDirectory()) continue

      const readmePath = path.join(coursesDir, folder.name, "README.md")
      try {
        const content = await readFile(readmePath, "utf-8")
        const title = content.split("\n")[0]?.replace(/^#+\s+/, "") || folder.name
        const description =
          content
            .split("\n")
            .slice(1)
            .find((line) => line.trim() && !line.startsWith("#"))
            ?.trim() || "No description"

        courses.push({
          id: folder.name,
          title,
          description,
        })
      } catch {
        // Skip if README doesn't exist
      }
    }

    return courses
  } catch (error) {
    console.error("Error loading courses:", error)
    return []
  }
}

export async function parseMarkdown(coursePath: string): Promise<string> {
  const filePath = path.join(process.cwd(), "md", coursePath, "README.md")

  try {
    return await readFile(filePath, "utf-8")
  } catch (error) {
    console.error(`Error loading markdown ${coursePath}:`, error)
    return "Content not found"
  }
}

export async function getCourseContent(id: string): Promise<string> {
  const filePath = path.join(process.cwd(), "md/courses", id, "README.md")

  try {
    return await readFile(filePath, "utf-8")
  } catch (error) {
    console.error(`Error loading course ${id}:`, error)
    return "Content not found"
  }
}
