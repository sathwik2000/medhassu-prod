import { parseMarkdown } from "@/lib/markdown"
import { MarkdownRenderer } from "@/components/markdown-renderer"

export default async function Home() {
  const homeContent = await parseMarkdown("home")

  return (
    <main className="flex-1 overflow-auto">
      <MarkdownRenderer content={homeContent} />
    </main>
  )
}
