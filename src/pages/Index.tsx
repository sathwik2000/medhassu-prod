import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Code, Database, Palette, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const courses = [
  {
    id: "web-dev",
    title: "Web Development Complete Guide",
    description: "Master HTML, CSS, JavaScript and modern frameworks",
    icon: Code,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "design",
    title: "UI/UX Design Fundamentals",
    description: "Learn design principles, tools, and best practices",
    icon: Palette,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Build scalable server-side applications",
    icon: Database,
    color: "from-green-500 to-emerald-500"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold text-foreground">Medhassu</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive learning platform for mastering development and design
          </p>
        </div>

        {/* Courses Grid */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-foreground text-center">
            Explore Our Courses
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="p-6 hover:shadow-lg transition-all border-border bg-card group">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <course.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {course.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {course.description}
                </p>
                <Link to={`/course/${course.id}`}>
                  <Button className="w-full group-hover:gap-2 transition-all">
                    Start Learning
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
