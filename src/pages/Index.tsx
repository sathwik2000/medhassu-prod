import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { series, courses } from "@/data/seriesData";
import * as Icons from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Learn from experts
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Medhassu
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Your comprehensive learning platform for mastering development and design
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                Live courses available
              </span>
              <span>•</span>
              <span>Updated weekly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Series Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Learning Series</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow curated learning paths designed to take you from beginner to expert
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {series.map((item) => (
            <Card 
              key={item.id} 
              className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 overflow-hidden bg-card/50 backdrop-blur-sm"
            >
              <div className={`h-2 bg-gradient-to-r ${item.gradient}`} />
              <CardHeader className="space-y-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.gradient} w-fit`}>
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {item.description}
                </CardDescription>
                <Badge variant="outline" className="w-fit">
                  {item.courses.length} courses
                </Badge>
              </CardHeader>
              <CardContent>
                <Link to={`/series/${item.id}`}>
                  <Button className="w-full group/btn" size="lg">
                    View Series
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All Courses Section */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">All Courses</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Or choose individual courses to learn at your own pace
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const IconComponent = Icons[course.icon as keyof typeof Icons] as any;
            
            return (
              <Card 
                key={course.id} 
                className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 overflow-hidden bg-card/50 backdrop-blur-sm"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative p-6 bg-gradient-to-br from-primary via-accent to-secondary rounded-3xl shadow-2xl">
                    {IconComponent && <IconComponent className="w-12 h-12 text-white" />}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/course/${course.id}`}>
                    <Button className="w-full group/btn" variant="default">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
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
