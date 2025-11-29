export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Series {
  id: string;
  title: string;
  description: string;
  gradient: string;
  courses: string[];
}

export const courses: Course[] = [
  {
    id: "web-dev",
    title: "Web Development Complete Guide",
    description: "Master HTML, CSS, and JavaScript from scratch",
    icon: "Code"
  },
  {
    id: "design",
    title: "UI/UX Design Fundamentals",
    description: "Learn design principles and create stunning interfaces",
    icon: "Palette"
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Build robust server-side applications",
    icon: "Database"
  }
];

export const series: Series[] = [
  {
    id: "full-stack",
    title: "Full Stack Developer Path",
    description: "Complete journey from frontend to backend development",
    gradient: "from-blue-500 to-purple-600",
    courses: ["web-dev", "backend"]
  },
  {
    id: "frontend-master",
    title: "Frontend Master",
    description: "Become an expert in modern frontend development",
    gradient: "from-green-500 to-teal-600",
    courses: ["web-dev", "design"]
  },
  {
    id: "design-developer",
    title: "Design & Development",
    description: "Combine design skills with development expertise",
    gradient: "from-pink-500 to-orange-600",
    courses: ["design", "web-dev"]
  }
];