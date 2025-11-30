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
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xl text-muted-foreground">Loading course...</p>
        </div>
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
      {/* Course Header */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10" />
        <div className="relative max-w-5xl mx-auto px-4 py-12">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {courseTitles[courseId as string] || 'Course'}
            </h1>
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <article className="prose prose-lg prose-slate dark:prose-invert max-w-none 
          prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-5xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:bg-gradient-to-r prose-h1:from-primary prose-h1:via-accent prose-h1:to-secondary prose-h1:bg-clip-text prose-h1:text-transparent prose-h1:border-b-4 prose-h1:border-gradient-to-r prose-h1:pb-4
          prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b-2 prose-h2:border-border prose-h2:pb-4 prose-h2:bg-gradient-to-r prose-h2:from-primary prose-h2:to-accent prose-h2:bg-clip-text prose-h2:text-transparent
          prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-primary
          prose-h4:text-2xl prose-h4:mt-8 prose-h4:mb-3 prose-h4:text-accent
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-5 prose-p:text-lg
          prose-strong:text-foreground prose-strong:font-bold prose-strong:bg-primary/10 prose-strong:px-1 prose-strong:rounded
          prose-em:text-accent prose-em:not-italic prose-em:font-medium
          prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-border prose-code:before:content-[''] prose-code:after:content-['']
          prose-pre:bg-card prose-pre:border-2 prose-pre:border-border prose-pre:rounded-xl prose-pre:shadow-2xl prose-pre:my-8 prose-pre:p-6
          prose-a:text-primary prose-a:no-underline prose-a:font-semibold prose-a:border-b-2 prose-a:border-primary/30 hover:prose-a:border-primary hover:prose-a:text-accent prose-a:transition-all
          prose-ul:my-6 prose-ul:space-y-3 prose-li:text-muted-foreground prose-li:text-lg prose-li:leading-relaxed
          prose-ol:my-6 prose-ol:space-y-3 prose-ol:text-muted-foreground prose-ol:text-lg
          prose-li:marker:text-primary prose-li:marker:font-bold
          prose-table:w-full prose-table:border-collapse prose-table:my-10 prose-table:shadow-xl prose-table:rounded-lg prose-table:overflow-hidden
          prose-thead:bg-gradient-to-r prose-thead:from-primary prose-thead:to-accent
          prose-th:bg-transparent prose-th:px-6 prose-th:py-4 prose-th:text-left prose-th:font-bold prose-th:text-white prose-th:border-none
          prose-td:px-6 prose-td:py-4 prose-td:border-t prose-td:border-border prose-td:bg-card
          prose-tr:transition-colors hover:prose-tr:bg-muted/50
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-foreground prose-blockquote:my-8
          prose-hr:border-border prose-hr:my-16 prose-hr:border-t-2
          prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-10 prose-img:border-4 prose-img:border-border hover:prose-img:scale-[1.02] prose-img:transition-transform
          prose-figure:my-10
          prose-figcaption:text-center prose-figcaption:text-muted-foreground prose-figcaption:mt-4 prose-figcaption:italic">
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