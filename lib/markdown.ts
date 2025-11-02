import { list } from "@vercel/blob"

export async function parseMarkdown(path: string): Promise<string> {
  try {
    // First try to read from blob storage
    const blobs = await list({ prefix: `md/${path}` })

    if (blobs.blobs.length > 0) {
      const blob = blobs.blobs[0]
      const response = await fetch(blob.url)
      return await response.text()
    }

    // Fallback to default content
    return getDefaultContent(path)
  } catch (error) {
    console.error(`Failed to load markdown: ${path}`, error)
    return getDefaultContent(path)
  }
}

function getDefaultContent(path: string): string {
  const defaults: Record<string, string> = {
    home: `# Welcome to Medhassu

Learn and grow with our markdown-driven education platform.

## Get Started
- Create markdown files in your courses directory
- Each markdown file automatically becomes a course
- Use fuzzy search to find what you need
- All changes sync instantly

## Features
- **Markdown-driven**: Simple, powerful content format
- **Auto-sync**: Changes appear instantly
- **Fuzzy search**: Find anything quickly
- **Beautiful rendering**: Clean, readable interface`,
  }

  return defaults[path] || `# ${path}\n\nContent not found`
}

export async function getCourses() {
  try {
    const blobs = await list({ prefix: "md/courses/" })

    return blobs.blobs.map((blob) => {
      const filename = blob.pathname.replace("md/courses/", "").replace(".md", "")
      return {
        id: filename,
        title: filename
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        description: "Course description",
      }
    })
  } catch (error) {
    console.error("Failed to fetch courses", error)
    return []
  }
}
