"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [query, setQuery] = useState("");

  return (
    <header className="navbar fixed top-0 left-0 right-0 z-50 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))]/95 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Medhassu
          </h1>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-md mx-6">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses..."
            className="pl-10 pr-4 py-2 border rounded-md w-full focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
      </div>
    </header>
  );
}
