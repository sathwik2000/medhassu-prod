export interface CourseNode {
  id: string
  title: string
  description?: string
  readmeFile?: string
  parentId?: string
  children?: CourseNode[]
}

export const courseConfig: CourseNode[] = []
