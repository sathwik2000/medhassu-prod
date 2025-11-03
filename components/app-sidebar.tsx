"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export function AppSidebar() {
  return (
    <aside data-slot="sidebar">
      <div className="sidebar-inner">
        <div className="sidebar-header">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-wider m-0 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Courses</h2>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link href="/courses/web-development-guide" className="sidebar-link">
            <BookOpen className="w-5 h-5" />
            <span>Web Development Complete Guide</span>
          </Link>
        </nav>

        <footer className="sidebar-footer">
          <p className="text-xs text-center m-0 font-medium" style={{ color: 'hsl(var(--color-sidebar-foreground) / 0.6)' }}>made with <span className="text-red-500">â¤ï¸</span> by <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Medhassu</span></p>
        </footer>
      </div>
    </aside>
  );
}
