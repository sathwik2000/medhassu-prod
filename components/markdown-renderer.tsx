"use client"

import type React from "react"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Extract YouTube video ID from URL
  const extractYoutubeId = (url: string) => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
      /\[youtube\]$$([^)]+)$$/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const parseColoredText = (text: string): React.ReactNode => {
    const colorRegex = /\{(red|blue|green|yellow|purple|pink|orange|cyan):(.*?)\}/g
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let match

    const colorMap: { [key: string]: string } = {
      red: "text-red-600 dark:text-red-400",
      blue: "text-blue-600 dark:text-blue-400",
      green: "text-green-600 dark:text-green-400",
      yellow: "text-yellow-600 dark:text-yellow-400",
      purple: "text-purple-600 dark:text-purple-400",
      pink: "text-pink-600 dark:text-pink-400",
      orange: "text-orange-600 dark:text-orange-400",
      cyan: "text-cyan-600 dark:text-cyan-400",
    }

    while ((match = colorRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }
      const color = match[1]
      const coloredText = match[2]
      parts.push(
        <span key={match.index} className={colorMap[color]}>
          {coloredText}
        </span>,
      )
      lastIndex = colorRegex.lastIndex
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  const renderMarkdown = (md: string) => {
    const lines = md.split("\n")
    const elements: React.ReactNode[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Check for YouTube video syntax: [youtube](url) or just the URL
      if (line.includes("youtube") || line.includes("youtu.be")) {
        const youtubeId = extractYoutubeId(line)
        if (youtubeId) {
          elements.push(
            <div key={i} className="my-6 flex justify-center">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="max-w-2xl rounded-lg"
              />
            </div>,
          )
          i++
          continue
        }
      }

      // Headings
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="text-5xl font-bold mt-8 mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            {parseColoredText(line.substring(2))}
          </h1>,
        )
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-3xl font-bold mt-8 mb-4 text-foreground/90">
            {parseColoredText(line.substring(3))}
          </h2>,
        )
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-2xl font-semibold mt-6 mb-3 text-foreground/85">
            {parseColoredText(line.substring(4))}
          </h3>,
        )
      } else if (line.startsWith("#### ")) {
        elements.push(
          <h4 key={i} className="text-xl font-semibold mt-5 mb-2 text-foreground/80">
            {parseColoredText(line.substring(5))}
          </h4>,
        )
      }
      // Code blocks
      else if (line.startsWith("```")) {
        let codeContent = ""
        const lang = line.substring(3).trim() || "plaintext"
        i++
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeContent += lines[i] + "\n"
          i++
        }
        elements.push(
          <pre key={i} className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-4">
            <code className={`language-${lang}`}>{codeContent}</code>
          </pre>,
        )
      }
      // Lists
      else if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="ml-6 my-2 list-disc marker:text-purple-500 text-foreground/80 leading-relaxed">
            {parseColoredText(line.substring(2))}
          </li>,
        )
      } else if (line.startsWith("* ")) {
        elements.push(
          <li key={i} className="ml-6 my-2 list-disc marker:text-purple-500 text-foreground/80 leading-relaxed">
            {parseColoredText(line.substring(2))}
          </li>,
        )
      }
      // Blockquotes
      else if (line.startsWith("> ")) {
        elements.push(
          <blockquote
            key={i}
            className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 pl-6 py-3 italic my-4 text-foreground/70 rounded-r-lg"
          >
            {parseColoredText(line.substring(2))}
          </blockquote>,
        )
      }
      // Horizontal rule
      else if (line.trim() === "---" || line.trim() === "***") {
        elements.push(<hr key={i} className="my-8 border-t-2 border-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-30" />)
      }
      // Bold and italic
      else if (line.trim()) {
        let text = line
        text = text.replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold'>$1</strong>")
        text = text.replace(/\*(.*?)\*/g, "<em class='italic'>$1</em>")
        text = text.replace(/__(.*?)__/g, "<strong class='font-bold'>$1</strong>")
        text = text.replace(/_(.+?)_/g, "<em class='italic'>$1</em>")
        text = text.replace(
          /\[(.*?)\]$$(.*?)$$/g,
          "<a href='$2' class='text-blue-500 hover:underline' target='_blank' rel='noopener'>$1</a>",
        )
        elements.push(
          <p
            key={i}
            className="my-3 leading-relaxed text-slate-700 dark:text-slate-300"
            dangerouslySetInnerHTML={{ __html: text }}
          />,
        )
      } else {
        elements.push(<div key={i} className="my-2" />)
      }

      i++
    }

    return elements
  }

  return <article className="max-w-4xl mx-auto px-8 py-12 prose-sm dark:prose-invert animate-in fade-in duration-700">{renderMarkdown(content)}</article>
}
