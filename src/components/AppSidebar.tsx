import { BookOpen, Moon, Sun, Code, Database, Palette, Home, Book } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/components/GlobalSearch";
import { series, courses } from "@/data/seriesData";

export function AppSidebar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const getCourseIcon = (courseId: string) => {
    const iconMap: Record<string, any> = {
      "web-dev": Code,
      "design": Palette,
      "backend": Database,
    };
    return iconMap[courseId] || Code;
  };

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <BookOpen className="h-6 w-6 text-sidebar-primary" />
          <span className="text-xl font-bold text-sidebar-foreground">Medhassu</span>
        </NavLink>
      </SidebarHeader>
      
      <div className="px-4 py-4 border-b border-sidebar-border">
        <GlobalSearch />
      </div>
      
      <SidebarContent className="px-4">
        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "bg-sidebar-accent text-sidebar-primary font-medium" : ""
                    }
                  >
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Learning Series */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-2">
            Learning Series
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {series.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={`/series/${item.id}`}
                      className={({ isActive }) =>
                        isActive ? "bg-sidebar-accent text-sidebar-primary font-medium" : ""
                      }
                    >
                      <Book className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* All Courses */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-2">
            All Courses
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {courses.map((course) => {
                const Icon = getCourseIcon(course.id);
                return (
                  <SidebarMenuItem key={course.id}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={`/course/${course.id}`}
                        className={({ isActive }) =>
                          isActive ? "bg-sidebar-accent text-sidebar-primary font-medium" : ""
                        }
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{course.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">made with ❤️ by Medhassu</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8"
          >
            {theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}