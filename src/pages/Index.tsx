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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 space-y-20">
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <BookOpen className="relative h-16 w-16 text-primary" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Medhassu
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your comprehensive learning platform for mastering development and design
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Live courses available</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Updated weekly</span>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Explore Our Courses
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose your path and start learning today
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card
                key={course.id}
                className="relative p-8 hover:shadow-2xl transition-all duration-500 border-border bg-card/50 backdrop-blur-sm group overflow-hidden animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <course.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="relative space-y-4">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>
                  <Link to={`/course/${course.id}`}>
                    <Button className="w-full group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300 mt-2">
                      <span className="flex items-center justify-center gap-2">
                        Start Learning
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </Link>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          {[
            { title: "Interactive Learning", desc: "Hands-on projects and exercises" },
            { title: "Expert Content", desc: "Curated by industry professionals" },
            { title: "Self-Paced", desc: "Learn at your own speed" }
          ].map((feature, i) => (
            <div key={i} className="text-center space-y-2 p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300">
              <h3 className="font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
