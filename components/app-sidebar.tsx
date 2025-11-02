"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, BookOpen } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { courseConfig, type CourseNode } from "@/config/courses"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface CourseItemProps {
  node: CourseNode
}

function CourseItem({ node }: CourseItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = node.children && node.children.length > 0

  const navigateTo = node.parentId ? `/courses/${node.parentId}` : `/courses/${node.id}`

  if (!hasChildren) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          asChild
          className="rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <Link href={navigateTo}>{node.title}</Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    )
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <button className="flex items-center gap-2 h-10 px-3 w-full rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors font-medium text-sm">
            <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`} />
            <span className="flex-1 text-left">{node.title}</span>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {node.children?.map((child) => (
              <CourseItem key={child.id} node={child} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

export function AppSidebar() {
  const totalCourses = courseConfig.reduce((acc, node) => {
    const countRecursive = (n: CourseNode): number => {
      if (!n.children || n.children.length === 0) return 1
      return n.children.reduce((sum, child) => sum + countRecursive(child), 0)
    }
    return acc + countRecursive(node)
  }, 0)

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border px-6 py-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <p className="font-semibold text-sidebar-foreground">Medhassu</p>
        </Link>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="flex flex-col gap-0">
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">Courses</p>
              <Badge variant="secondary" className="h-6 px-2 text-xs">
                {totalCourses}
              </Badge>
            </div>
          </div>

          {/* Courses List */}
          <div className="flex-1 overflow-y-auto px-2">
            <SidebarMenu className="gap-1">
              {courseConfig.map((course) => (
                <CourseItem key={course.id} node={course} />
              ))}
            </SidebarMenu>
          </div>
        </div>
      </SidebarContent>

      {/* Footer */}
      <div className="border-t border-sidebar-border px-4 py-3">
        <p className="text-xs text-sidebar-foreground/50 text-center">made with love by Medhassu</p>
      </div>
    </Sidebar>
  )
}
