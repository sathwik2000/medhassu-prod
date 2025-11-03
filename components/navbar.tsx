"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { useFuzzySearch } from "@/hooks/use-fuzzy-search";
import Link from "next/link";

const COURSES = [
  { id: "web-development-guide", title: "Web Development Complete Guide", description: "Learn HTML, CSS, JS, and React." },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { search } = useFuzzySearch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof COURSES>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!query.trim()) { setResults([]); setShowDropdown(false); return; }
    const found = search(COURSES, query, ["title", "description"]);
    setResults(found.slice(0, 6));
    setShowDropdown(true);
  }, [query, search]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="navbar">
      <div className="flex items-center justify-between h-full px-6 max-w-[1400px] mx-auto w-full">
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent select-none m-0">Medhassu</h1>
        </Link>

        <div ref={dropdownRef} className="relative flex-1 max-w-xl mx-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses..." className="pl-12 pr-4 py-3 w-full h-12 text-base rounded-xl shadow-sm hover:shadow-md transition-all" onFocus={() => query && setShowDropdown(true)} />
          {showDropdown && results.length > 0 && (
            <div className="absolute left-0 right-0 mt-3 rounded-xl border border-[hsl(var(--color-border))] bg-[hsl(var(--color-popover))] shadow-2xl overflow-hidden z-[100] backdrop-blur-xl">
              {results.map((r) => (
                <Link key={r.id} href={`/courses/${r.id}`} onClick={() => { setQuery(""); setShowDropdown(false); }} className="block px-5 py-4 hover:bg-[hsl(var(--color-accent))] transition-all no-underline border-b border-[hsl(var(--color-border)/0.3)] last:border-0">
                  <div className="font-semibold text-[hsl(var(--color-foreground))] mb-1">{r.title}</div>
                  <div className="text-sm text-[hsl(var(--color-muted-foreground))]">{r.description}</div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {mounted && (
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="relative w-12 h-12 rounded-xl hover:bg-[hsl(var(--color-accent))] flex items-center justify-center transition-all border-0 bg-transparent cursor-pointer group shadow-sm hover:shadow-md" aria-label="Toggle theme">
            {theme === "dark" ? <Moon className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform" /> : <Sun className="h-6 w-6 text-yellow-500 group-hover:scale-110 transition-transform" />}
          </button>
        )}
      </div>
    </header>
  );
}
