import { Card } from "@/components/ui/card";

interface ContentSection {
  title: string;
  content: string;
  keyPoints?: string[];
  videoId?: string;
  codeExample?: string;
}

interface CourseContentProps {
  sections: ContentSection[];
}

export function CourseContent({ sections }: CourseContentProps) {
  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <Card key={index} className="p-6 bg-card border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="text-accent">🎨</span>
            {section.title}
          </h2>
          
          <p className="text-muted-foreground mb-6">{section.content}</p>

          {section.keyPoints && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Key points:</h3>
              <ul className="space-y-2">
                {section.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground">
                    <span className="text-accent mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {section.videoId && (
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${section.videoId}`}
                title={section.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          {section.codeExample && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">{section.title} Example</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-foreground">{section.codeExample}</code>
              </pre>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
