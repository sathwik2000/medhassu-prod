import { readdir, readFile } from "fs/promises"
import path from "path"

interface GitHubTreeItem {
  path: string
  mode: string
  type: string
  sha?: string
  content?: string
}

async function getAllFiles(dir: string, baseDir = ""): Promise<string[]> {
  const files: string[] = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relativePath = path.join(baseDir, entry.name)

    // Skip node_modules, .git, .next, dist
    if (["node_modules", ".git", ".next", "dist", ".env"].includes(entry.name)) {
      continue
    }

    if (entry.isDirectory()) {
      files.push(...(await getAllFiles(fullPath, relativePath)))
    } else {
      files.push(relativePath)
    }
  }

  return files
}

async function deployToGitHub() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  const GITHUB_OWNER = process.env.GITHUB_OWNER
  const GITHUB_REPO = process.env.GITHUB_REPO

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    console.error("[v0] Missing GitHub credentials")
    process.exit(1)
  }

  console.log(`[v0] Starting deployment to ${GITHUB_OWNER}/${GITHUB_REPO}`)

  try {
    // Get all files
    const files = await getAllFiles(".")
    console.log(`[v0] Found ${files.length} files to commit`)

    // Get current main branch SHA
    const refRes = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/refs/heads/main`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    if (!refRes.ok) {
      throw new Error(`Failed to get main branch: ${refRes.statusText}`)
    }

    const ref = await refRes.json()
    const mainSha = ref.object.sha
    console.log(`[v0] Main branch SHA: ${mainSha}`)

    // Get commit details
    const commitRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/commits/${mainSha}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    )

    const commit = await commitRes.json()
    const treeSha = commit.tree.sha

    // Create tree items
    const treeItems: GitHubTreeItem[] = []

    for (const file of files) {
      const fullPath = path.join(".", file)
      const content = await readFile(fullPath, "utf-8")

      treeItems.push({
        path: file.replace(/\\/g, "/"),
        mode: "100644",
        type: "blob",
        content: content,
      })
    }

    console.log(`[v0] Creating tree with ${treeItems.length} items`)

    // Create new tree
    const treeRes = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/trees`, {
      method: "POST",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        base_tree: treeSha,
        tree: treeItems,
      }),
    })

    if (!treeRes.ok) {
      const error = await treeRes.json()
      throw new Error(`Failed to create tree: ${JSON.stringify(error)}`)
    }

    const tree = await treeRes.json()
    console.log(`[v0] Tree created: ${tree.sha}`)

    // Create commit
    const newCommitRes = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/commits`, {
      method: "POST",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: "Deploy medhassu ed-tech platform with GitHub-only workflow, search modal, and ads support",
        tree: tree.sha,
        parents: [mainSha],
      }),
    })

    if (!newCommitRes.ok) {
      const error = await newCommitRes.json()
      throw new Error(`Failed to create commit: ${JSON.stringify(error)}`)
    }

    const newCommit = await newCommitRes.json()
    console.log(`[v0] Commit created: ${newCommit.sha}`)

    // Update ref
    const updateRes = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/refs/heads/main`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        sha: newCommit.sha,
        force: false,
      }),
    })

    if (!updateRes.ok) {
      const error = await updateRes.json()
      throw new Error(`Failed to update ref: ${JSON.stringify(error)}`)
    }

    console.log(`[v0] Successfully deployed to ${GITHUB_OWNER}/${GITHUB_REPO}`)
    console.log(`[v0] Commit: https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/commit/${newCommit.sha}`)
  } catch (error) {
    console.error("[v0] Deployment failed:", error)
    process.exit(1)
  }
}

deployToGitHub()
