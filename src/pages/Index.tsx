import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, GraduationCap } from "lucide-react";
import { series, courses } from "@/data/seriesData";
import * as Icons from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(138,92,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Badge variant="secondary" className="mb-4 text-sm px-6 py-2.5 hover:scale-105 transition-transform cursor-default shadow-lg border">
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              Learn from experts
            </Badge>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight tracking-tight">
              Medhassu
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Your comprehensive learning platform for mastering development and design
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-2">
              <span className="flex items-center gap-2 hover:text-foreground transition-colors">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-lg shadow-accent/50"></span>
                Live courses
              </span>
              <span>•</span>
              <span className="hover:text-foreground transition-colors">Updated weekly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Series Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Learning Series
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow curated learning paths designed to take you from beginner to expert
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24">
          {series.map((item, index) => (
            <Card 
              key={item.id} 
              className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-primary/30 overflow-hidden bg-card backdrop-blur-sm animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`h-2 bg-gradient-to-r ${item.gradient} group-hover:h-3 transition-all duration-300`} />
              <CardHeader className="space-y-4 p-6 flex-grow">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} w-fit group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {item.description}
                </CardDescription>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground pt-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {item.courses.length} courses
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Link to={`/series/${item.id}`}>
                  <Button className="w-full group/btn group-hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl" size="lg">
                    View Series
                    <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All Courses Section */}
        <div className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            All Courses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose individual courses to learn at your own pace
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => {
            const IconComponent = Icons[course.icon as keyof typeof Icons] as any;
            
            return (
              <Card 
                key={course.id} 
                className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-primary/30 overflow-hidden bg-card backdrop-blur-sm animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-10 group-hover:opacity-20 transition-all duration-500" />
                  <div className="relative p-6 bg-gradient-to-br from-primary via-accent to-secondary rounded-2xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    {IconComponent && <IconComponent className="w-12 h-12 text-white" />}
                  </div>
                </div>
                <CardHeader className="p-6 flex-grow">
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors leading-tight">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed mt-3">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <Link to={`/course/${course.id}`}>
                    <Button className="w-full group/btn group-hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl" variant="default" size="lg">
                      Start Learning
                      <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}