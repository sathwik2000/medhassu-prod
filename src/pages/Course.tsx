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
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-muted-foreground">Loading course...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-muted-foreground">Course not found</p>
      </div>
    );
  }

  const filteredContent = searchQuery
    ? content.split('\n').filter(line =>
        line.toLowerCase().includes(searchQuery.toLowerCase())
      ).join('\n')
    : content;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-4xl font-bold text-foreground">
            {courseTitles[courseId as string] || 'Course'}
          </h1>
          <SearchBar onSearch={setSearchQuery} />
        </div>
        
        <article className="prose prose-lg prose-slate dark:prose-invert max-w-none 
          prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-5xl prose-h1:mb-8 prose-h1:bg-gradient-to-r prose-h1:from-primary prose-h1:to-primary/60 prose-h1:bg-clip-text prose-h1:text-transparent
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border prose-h2:pb-3
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-4
          prose-strong:text-foreground prose-strong:font-semibold
          prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
          prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:shadow-lg
          prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:text-primary/80 hover:prose-a:underline
          prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 prose-li:text-muted-foreground prose-li:my-2
          prose-table:w-full prose-table:border-collapse prose-table:my-8
          prose-th:bg-muted prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:border prose-th:border-border
          prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-border
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
          prose-hr:border-border prose-hr:my-12
          prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-8">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              img({ src, alt, ...props }: any) {
                return (
                  <img 
                    src={src} 
                    alt={alt} 
                    className="rounded-lg shadow-lg my-4"
                    loading="lazy"
                    {...props}
                  />
                );
              },
              a({ href, children, ...props }: any) {
                const isYouTube = href?.includes('youtube.com') || href?.includes('youtu.be');
                if (isYouTube) {
                  const videoId = href.includes('youtube.com') 
                    ? new URL(href).searchParams.get('v')
                    : href.split('youtu.be/')[1];
                  return (
                    <div className="my-6 aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                      />
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
      </div>
    </div>
  );
}
