"use client"

import type React from "react"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple markdown to JSX conversion
  const renderMarkdown = (md: string) => {
    const lines = md.split("\n")
    const elements: React.ReactNode[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="text-4xl font-bold mt-6 mb-4">
            {line.substring(2)}
          </h1>,
        )
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-3xl font-bold mt-5 mb-3">
            {line.substring(3)}
          </h2>,
        )
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-2xl font-bold mt-4 mb-2">
            {line.substring(4)}
          </h3>,
        )
      }
      // Lists
      else if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="ml-6 my-1">
            {line.substring(2)}
          </li>,
        )
      }
      // Bold and italic
      else if (line.trim()) {
        let text = line
        text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        text = text.replace(/_(.*?)_/g, "<em>$1</em>")
        elements.push(<p key={i} className="my-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />)
      }

      i++
    }

    return elements
  }

  return <article className="prose prose-sm max-w-4xl mx-auto p-8">{renderMarkdown(content)}</article>
}
