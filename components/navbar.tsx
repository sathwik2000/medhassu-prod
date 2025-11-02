"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function Navbar() {
  return (
    <header className="navbar">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <span className="text-lg font-semibold">Courses Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm hover:text-primary">Profile</button>
        </div>
      </div>
    </header>
  );
}
