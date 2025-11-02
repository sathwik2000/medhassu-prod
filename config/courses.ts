export interface CourseNode {
  id: string
  title: string
  description?: string
  readmeFile?: string
  parentId?: string
  children?: CourseNode[]
}

export const courseConfig: CourseNode[] = [
  {
    id: "web-development-guide",
    title: "Web Development Complete Guide",
    description: "Master HTML, CSS, JavaScript, and React with embedded video tutorials and hands-on exercises",
    readmeFile: "web-development-guide",
  },
]
