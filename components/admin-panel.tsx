"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function AdminPanel() {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadStatus("uploading")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-course", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      setUploadStatus("success")
      setTimeout(() => setUploadStatus("idle"), 3000)
    } catch (error) {
      console.error(error)
      setUploadStatus("error")
      setTimeout(() => setUploadStatus("idle"), 3000)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">Manage your Medhassu courses</p>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Upload Course Markdown</h2>
        <p className="text-sm text-muted-foreground">
          Upload or update course markdown files. They will be automatically deployed.
        </p>

        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4">
          <input
            type="file"
            accept=".md"
            onChange={handleFileUpload}
            disabled={uploadStatus === "uploading"}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="block cursor-pointer">
            <Button disabled={uploadStatus === "uploading"}>
              {uploadStatus === "uploading" ? "Uploading..." : "Choose Markdown File"}
            </Button>
          </label>

          {uploadStatus === "success" && (
            <Badge className="inline-block" variant="default">
              Uploaded successfully!
            </Badge>
          )}
          {uploadStatus === "error" && (
            <Badge className="inline-block" variant="destructive">
              Upload failed. Try again.
            </Badge>
          )}
        </div>

        <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
          <p className="font-semibold">Markdown Format:</p>
          <pre className="overflow-x-auto text-xs bg-background p-2 rounded">
            {`---
title: Course Title
description: Course description
thumbnail: https://example.com/image.jpg
tags: JavaScript, React, Web Development
duration: 4 weeks
level: beginner
prerequisites: HTML Basics, CSS Fundamentals
followups: Advanced React, Next.js Mastery
---

## Lesson 1: Introduction
https://www.youtube.com/watch?v=xxx

Lesson content here...

## Lesson 2: Advanced Topics
https://www.youtube.com/watch?v=yyy

More content...`}
          </pre>
        </div>
      </Card>

      <Card className="p-6 space-y-4 bg-primary/5">
        <h2 className="text-xl font-semibold">GitHub Integration</h2>
        <p className="text-sm text-muted-foreground">
          Set up GitHub webhook to auto-sync courses when you push changes
        </p>
        <div className="bg-background p-4 rounded-lg text-sm space-y-2">
          <p className="font-mono text-xs break-all">
            {typeof window !== "undefined"
              ? `${window.location.origin}/api/sync-github`
              : "https://your-domain.com/api/sync-github"}
          </p>
          <p className="text-xs text-muted-foreground">
            Add this URL as a GitHub webhook in your repository settings. Push markdown files to &quot;courses/&quot;
            folder.
          </p>
        </div>
      </Card>
    </div>
  )
}
