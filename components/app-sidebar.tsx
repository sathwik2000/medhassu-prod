"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export function AppSidebar() {
  return (
    <aside data-slot="sidebar">
      <div className="sidebar-inner">
        <div className="sidebar-header">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-500" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-sidebar-foreground/70">
              Courses
            </h2>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link
            href="/courses/web-development-guide"
            className="sidebar-link"
          >
            <BookOpen className="w-4 h-4 opacity-80" />
            <span>Web Development Complete Guide</span>
          </Link>
        </nav>

        <footer className="sidebar-footer">
          <p className="text-xs text-center text-sidebar-foreground/60">
            made with ❤️ by <span className="font-semibold">Medhassu</span>
          </p>
        </footer>
      </div>
    </aside>
  );
}
