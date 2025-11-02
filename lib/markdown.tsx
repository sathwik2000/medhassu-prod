export function markdownToHtml(markdown: string): string {
  const html = markdown
    // Headers
    .replace(/^### (.*?)$/gm, '<h3 className="text-xl font-semibold mt-6 mb-3">$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2 className="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1 className="text-3xl font-bold mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong className="font-semibold">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em className="italic">$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre className="bg-muted p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
    // Inline code
    .replace(/`(.*?)`/g, '<code className="bg-muted px-2 py-1 rounded text-sm">$1</code>')
    // Lists
    .replace(/^\* (.*?)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/s, '<ul className="list-disc list-inside space-y-1">$1</ul>')
    // Line breaks
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[^>]*>)(.*?)$/gm, "<p>$1</p>")

  return html
}
