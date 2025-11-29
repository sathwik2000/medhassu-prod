import { useParams, Link } from "react-router-dom";
import { series, courses } from "@/data/seriesData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen } from "lucide-react";
import * as Icons from "lucide-react";

export default function Series() {
  const { seriesId } = useParams<{ seriesId: string }>();
  const currentSeries = series.find(s => s.id === seriesId);

  if (!currentSeries) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-muted-foreground">Series not found</p>
      </div>
    );
  }

  const seriesCourses = courses.filter(c => currentSeries.courses.includes(c.id));

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${currentSeries.gradient} opacity-10`} />
        <div className="relative max-w-6xl mx-auto px-4 py-16">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary" className="mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Learning Series
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {currentSeries.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {currentSeries.description}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>{seriesCourses.length} courses</span>
              <span>•</span>
              <span>Comprehensive curriculum</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {seriesCourses.map((course, index) => {
              const IconComponent = Icons[course.icon as keyof typeof Icons] as any;
              
              return (
                <Card 
                  key={course.id}
                  className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-card/50 backdrop-blur-sm overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${currentSeries.gradient}`} />
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${currentSeries.gradient} text-white shadow-lg`}>
                        {IconComponent && <IconComponent className="w-6 h-6" />}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Step {index + 1}
                      </Badge>
                    </div>
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
    </div>
  );
}
