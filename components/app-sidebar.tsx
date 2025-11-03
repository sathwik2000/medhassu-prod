"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export function AppSidebar() {
  return (
    <aside data-slot="sidebar" className="p-4">
      <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
            Courses
          </h2>
        </div>
      </div>
      <nav className="space-y-1">
        <Link
          href="/courses/web-development-guide"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <BookOpen className="w-4 h-4 opacity-70" />
          <span>Web Development Complete Guide</span>
        </Link>
      </nav>
      <div className="absolute bottom-4 left-4 right-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-center text-gray-500">
          made with ❤️ by Medhassu
        </p>
      </div>
    </aside>
  );
}
