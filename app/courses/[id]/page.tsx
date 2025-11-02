import { notFound } from "next/navigation"
import { parseMarkdown } from "@/lib/markdown"
import { MarkdownRenderer } from "@/components/markdown-renderer"

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  try {
    const content = await parseMarkdown(`courses/${id}`)
    return (
      <main className="flex-1 overflow-auto">
        <MarkdownRenderer content={content} />
      </main>
    )
  } catch (error) {
    notFound()
  }
}
