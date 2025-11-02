import { put } from "@vercel/blob"

const COURSES_FOLDER = "courses/"
const GITHUB_REPO = process.env.GITHUB_REPO || ""
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ""

export async function POST(req: Request) {
  try {
    const payload = await req.json()

    // Verify GitHub webhook signature if needed
    if (!payload.repository) {
      return Response.json({ error: "Invalid payload" }, { status: 400 })
    }

    // Process pushed files
    const commits = payload.commits || []

    for (const commit of commits) {
      for (const file of commit.added || []) {
        if (file.endsWith(".md")) {
          await syncFile(file, payload.repository.name)
        }
      }
      for (const file of commit.modified || []) {
        if (file.endsWith(".md")) {
          await syncFile(file, payload.repository.name)
        }
      }
    }

    // Clear the courses cache by revalidating
    return Response.json({
      success: true,
      message: "Courses synced from GitHub",
    })
  } catch (error) {
    console.error("[v0] GitHub sync error:", error)
    return Response.json({ error: "Sync failed" }, { status: 500 })
  }
}

async function syncFile(filePath: string, repoName: string) {
  try {
    // Only sync markdown files from courses directory
    if (!filePath.startsWith("courses/") || !filePath.endsWith(".md")) {
      return
    }

    const fileUrl = `https://raw.githubusercontent.com/${process.env.GITHUB_OWNER}/${repoName}/main/${filePath}`

    const response = await fetch(fileUrl, {
      headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch ${filePath}`)
    }

    const content = await response.text()
    const blobPath = `${COURSES_FOLDER}${filePath.replace("courses/", "")}`

    await put(blobPath, content, {
      access: "public",
      contentType: "text/markdown",
    })

    console.log("[v0] Synced file:", blobPath)
  } catch (error) {
    console.error("[v0] Error syncing file:", error)
  }
}
