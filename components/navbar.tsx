// components/navbar.tsx
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { useFuzzySearch } from "@/hooks/use-fuzzy-search";
import Link from "next/link";

// sample dataset — replace with your real course source if needed
const COURSES = [
  { id: "web-development-guide", title: "Web Development Complete Guide", description: "Learn HTML, CSS, JS, and React." },
  { id: "python-basics", title: "Python Basics", description: "A complete introduction to Python programming." },
  { id: "nextjs-course", title: "Next.js Masterclass", description: "Modern React development with Next.js." },
  { id: "tailwind-ui", title: "Tailwind UI Essentials", description: "Build beautiful, responsive UIs fast." },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { search } = useFuzzySearch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof COURSES>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    const found = search(COURSES, query, ["title", "description"]);
    setResults(found.slice(0, 6));
    setShowDropdown(true);
  }, [query, search]);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
        <div ref={dropdownRef} className="relative flex-1 max-w-md mx-6">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses..."
            className="pl-10 pr-4 py-2 border rounded-md w-full focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-[hsl(var(--color-card))]"
            onFocus={() => query && setShowDropdown(true)}
          />

          {/* Dropdown */}
          {showDropdown && results.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 rounded-md border border-[hsl(var(--color-border))] bg-[hsl(var(--color-card))] shadow-lg overflow-hidden z-[60]">
              {results.map((r) => (
                <Link
                  key={r.id}
                  href={`/courses/${r.id}`}
                  onClick={() => {
                    setQuery("");
                    setShowDropdown(false);
                  }}
                  className="block px-4 py-3 hover:bg-[hsl(var(--color-primary))/0.06] transition-colors"
                >
                  <div className="font-medium">{r.title}</div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">{r.description}</div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors relative"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
      </div>
    </header>
  );
}
