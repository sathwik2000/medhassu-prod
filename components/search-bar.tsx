"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <Input
        type="text"
        placeholder="Search courses by title, description, tags, or content..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10 py-6 text-base"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}
