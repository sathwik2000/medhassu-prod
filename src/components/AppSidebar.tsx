import { BookOpen, Moon, Sun, Code, Database, Palette } from "lucide-react";
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
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/components/GlobalSearch";

const courses = [
  { id: "web-dev", title: "Web Development Complete Guide", icon: Code },
  { id: "design", title: "UI/UX Design Fundamentals", icon: Palette },
  { id: "backend", title: "Backend Development", icon: Database },
];

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

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <NavLink to="/" className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6 hover:bg-sidebar-accent/50 transition-colors">
        <BookOpen className="h-8 w-8 text-sidebar-primary" />
        <span className="text-2xl font-bold text-sidebar-foreground">Medhassu</span>
      </NavLink>
      
      <div className="p-4 border-b border-sidebar-border">
        <GlobalSearch />
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm uppercase tracking-wider text-muted-foreground">
            Courses
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {courses.map((course) => (
                <SidebarMenuItem key={course.id}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={`/course/${course.id}`}
                      className={({ isActive }) =>
                        isActive ? "bg-sidebar-accent text-sidebar-primary font-medium" : ""
                      }
                    >
                      <course.icon className="h-4 w-4" />
                      <span>{course.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="mt-auto border-t border-sidebar-border p-4">
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
      </div>
    </Sidebar>
  );
}
