import { Octokit } from "@octokit/rest"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ""
const GITHUB_OWNER = process.env.GITHUB_OWNER || ""
const GITHUB_REPO = process.env.GITHUB_REPO || ""

export async function POST(req: Request) {
  try {
    if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
      return Response.json({ error: "GitHub credentials not configured" }, { status: 500 })
    }

    const { fileName, content, message } = await req.json()

    if (!fileName || !content) {
      return Response.json({ error: "fileName and content are required" }, { status: 400 })
    }

    const octokit = new Octokit({
      auth: GITHUB_TOKEN,
    })

    // Get the current file SHA if it exists (for updates)
    let sha: string | undefined
    try {
      const response = await octokit.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: `courses/${fileName}`,
      })
      if (Array.isArray(response.data)) {
        sha = response.data[0].sha
      } else {
        sha = response.data.sha
      }
    } catch (error) {
      // File doesn't exist, create new one
      sha = undefined
    }

    // Create or update the file
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: `courses/${fileName}`,
      message: message || `Add/Update course: ${fileName}`,
      content: Buffer.from(content).toString("base64"),
      sha,
      committer: {
        name: "Medhassu Bot",
        email: "bot@medhassu.local",
      },
      author: {
        name: "Medhassu Bot",
        email: "bot@medhassu.local",
      },
    })

    return Response.json({
      success: true,
      message: "Course committed to GitHub",
      commit: response.data.commit.sha,
      path: response.data.content?.path,
    })
  } catch (error) {
    console.error("[v0] Commit error:", error)
    return Response.json({ error: "Failed to commit to GitHub" }, { status: 500 })
  }
}
