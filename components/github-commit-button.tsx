"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GitBranch, Loader2, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface GitHubCommitButtonProps {
  fileName: string
  content: string
  onSuccess?: () => void
}

export function GitHubCommitButton({ fileName, content, onSuccess }: GitHubCommitButtonProps) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(`Update ${fileName}`)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleCommit = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/commit-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName,
          content,
          message,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to commit")
      }

      setSuccess(true)
      setTimeout(() => {
        setOpen(false)
        setSuccess(false)
        setMessage(`Update ${fileName}`)
        onSuccess?.()
      }, 2000)
    } catch (error) {
      console.error("[v0] Commit failed:", error)
      alert(`Failed to commit to GitHub: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <GitBranch className="w-4 h-4" />
          Commit to GitHub
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Commit Course to GitHub</DialogTitle>
          <DialogDescription>This will push your course to GitHub in the courses/ folder.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">File Name</label>
            <Input value={fileName} disabled className="mt-1 text-muted-foreground" />
          </div>

          <div>
            <label className="text-sm font-medium">Commit Message</label>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your changes..."
              className="mt-1"
            />
          </div>

          <Button onClick={handleCommit} disabled={loading || success} className="w-full">
            {success ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Committed!
              </>
            ) : loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Committing...
              </>
            ) : (
              <>
                <GitBranch className="w-4 h-4 mr-2" />
                Commit to GitHub
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
