import { Moon, Sun, Code, Database, Palette, Home, Book } from "lucide-react";
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
      <SidebarHeader className="border-b border-sidebar-border px-6 py-5">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="hover:opacity-80 transition-opacity">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Medhassu
            </span>
          </NavLink>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-lg"
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </SidebarHeader>
      
      <div className="px-4 py-4 border-b border-sidebar-border">
        <GlobalSearch />
      </div>
      
      <SidebarContent className="px-4">
        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-3 font-semibold">
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
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-3 font-semibold">
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
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-3 font-semibold">
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
        <div className="text-center">
          <span className="text-xs text-muted-foreground">made with ❤️ by Medhassu</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}