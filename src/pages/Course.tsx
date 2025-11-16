import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const courseTitles: Record<string, string> = {
  "web-dev": "Web Development Complete Guide",
  "design": "UI/UX Design Fundamentals",
  "backend": "Backend Development"
};

export default function Course() {
  const { courseId } = useParams<{ courseId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/courses/${courseId}.md`);
        if (!response.ok) {
          throw new Error('Course not found');
        }
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error loading course:', error);
        setContent('');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      loadMarkdown();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-xl text-muted-foreground animate-pulse">Loading course...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-6xl">📚</div>
        <p className="text-2xl font-semibold text-foreground">Course not found</p>
        <p className="text-muted-foreground">The course you're looking for doesn't exist</p>
      </div>
    );
  }

  const filteredContent = searchQuery
    ? content.split('\n').filter(line =>
        line.toLowerCase().includes(searchQuery.toLowerCase())
      ).join('\n')
    : content;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-12 space-y-10">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50 -mx-4 px-4 py-6 mb-8 animate-in slide-in-from-top duration-500">
          <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
            <div className="text-center space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                {courseTitles[courseId as string] || 'Course'}
              </h1>
              <p className="text-sm text-muted-foreground">Interactive learning experience</p>
            </div>
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>
        
        <article className="prose prose-lg prose-slate dark:prose-invert max-w-none animate-in fade-in slide-in-from-bottom-4 duration-700 prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-20 prose-h1:text-5xl prose-h1:mb-8 prose-h1:bg-gradient-to-r prose-h1:from-primary prose-h1:to-primary/60 prose-h1:bg-clip-text prose-h1:text-transparent prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b-2 prose-h2:border-primary/20 prose-h2:pb-4 prose-h2:pl-6 prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-primary prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-4 prose-strong:text-foreground prose-strong:font-semibold prose-strong:bg-primary/5 prose-strong:px-1 prose-strong:rounded prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-primary/20 prose-pre:bg-gradient-to-br prose-pre:from-muted prose-pre:to-muted/50 prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:shadow-2xl prose-pre:p-6 prose-pre:my-8 prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:text-primary/80 hover:prose-a:underline prose-ul:my-6 prose-ul:list-none prose-ul:pl-0 prose-li:text-muted-foreground prose-li:my-3 prose-li:pl-8 prose-li:relative prose-table:w-full prose-table:border-collapse prose-table:my-10 prose-table:shadow-lg prose-table:rounded-lg prose-th:bg-gradient-to-br prose-th:from-primary/10 prose-th:to-primary/5 prose-th:px-6 prose-th:py-4 prose-th:text-left prose-th:font-bold prose-th:border prose-th:border-border prose-td:px-6 prose-td:py-4 prose-td:border prose-td:border-border prose-td:bg-card/50 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:my-6 prose-hr:border-border prose-hr:my-16 prose-hr:border-t-2 prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-10 prose-img:border prose-img:border-border hover:prose-img:scale-105 prose-img:transition-transform prose-img:duration-500">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="relative group">
                    <div className="absolute top-4 right-4 text-xs font-mono text-muted-foreground bg-background/80 px-3 py-1 rounded-full border border-border opacity-0 group-hover:opacity-100 transition-opacity">
                      {match[1]}
                    </div>
                    <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" customStyle={{ margin: 0, borderRadius: '0.75rem', padding: '1.5rem' }} {...props}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : <code className={className} {...props}>{children}</code>;
              },
              img({ src, alt, ...props }: any) {
                return (
                  <div className="relative group">
                    <img src={src} alt={alt} className="rounded-2xl shadow-2xl my-8 border border-border" loading="lazy" {...props} />
                    {alt && <p className="text-center text-sm text-muted-foreground mt-2 italic">{alt}</p>}
                  </div>
                );
              },
              a({ href, children, ...props }: any) {
                const isYouTube = href?.includes('youtube.com') || href?.includes('youtu.be');
                if (isYouTube) {
                  const videoId = href.includes('youtube.com') ? new URL(href).searchParams.get('v') : href.split('youtu.be/')[1];
                  return (
                    <div className="my-10 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border hover:shadow-primary/20 transition-all duration-500">
                      <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                  );
                }
                return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
              }
            }}
          >
            {filteredContent}
          </ReactMarkdown>
        </article>

        <div className="fixed bottom-8 right-8">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300" aria-label="Scroll to top">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}