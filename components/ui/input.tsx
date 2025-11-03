import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input type={type} data-slot="input" className={cn("h-10 w-full min-w-0 rounded-lg px-4 py-2 text-base", "bg-[hsl(var(--color-card))] text-[hsl(var(--color-card-foreground))]", "border border-[hsl(var(--color-input))]", "placeholder:text-[hsl(var(--color-muted-foreground))]", "shadow-sm transition-all outline-none", "focus-visible:border-[hsl(var(--color-ring))]", "focus-visible:ring-3 focus-visible:ring-[hsl(var(--color-ring)/0.2)]", "hover:border-[hsl(var(--color-ring)/0.5)]", "disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />
  );
}

export { Input };
