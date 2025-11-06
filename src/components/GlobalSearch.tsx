import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const allCourses = [
  {
    id: "web-dev",
    title: "Web Development Complete Guide",
    sections: [
      { title: "HTML Fundamentals", content: "HTML (HyperText Markup Language) is the standard markup language for creating web pages." },
      { title: "CSS Fundamentals", content: "Learn CSS styling with this comprehensive video" },
      { title: "JavaScript Basics", content: "JavaScript is the programming language of the web." }
    ]
  },
  {
    id: "design",
    title: "UI/UX Design Fundamentals",
    sections: [
      { title: "Design Principles", content: "Understanding the core principles of design: balance, contrast, emphasis" },
      { title: "User Experience Basics", content: "UX design focuses on creating meaningful and relevant experiences" }
    ]
  },
  {
    id: "backend",
    title: "Backend Development",
    sections: [
      { title: "Server-Side Programming", content: "Learn how to build robust server-side applications" },
      { title: "Database Management", content: "Understanding databases and how to work with them effectively" }
    ]
  }
];

interface SearchResult {
  courseId: string;
  courseTitle: string;
  sectionTitle: string;
  content: string;
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchResults: SearchResult[] = query.length > 0 
    ? allCourses.flatMap(course => 
        course.sections
          .filter(section => 
            section.title.toLowerCase().includes(query.toLowerCase()) ||
            section.content.toLowerCase().includes(query.toLowerCase()) ||
            course.title.toLowerCase().includes(query.toLowerCase())
          )
          .map(section => ({
            courseId: course.id,
            courseTitle: course.title,
            sectionTitle: section.title,
            content: section.content
          }))
      )
    : [];

  const handleResultClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full max-w-sm gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span className="text-muted-foreground">Search across all courses...</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Search Courses</DialogTitle>
          </DialogHeader>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for topics, courses, or content..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 pr-9"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 mt-4">
            {query.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Start typing to search across all courses...
              </p>
            ) : searchResults.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No results found for "{query}"
              </p>
            ) : (
              searchResults.map((result, index) => (
                <Card
                  key={index}
                  className="p-4 cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => handleResultClick(result.courseId)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {result.courseTitle}
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm">{result.sectionTitle}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {result.content}
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
