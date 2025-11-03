// app/layout.tsx
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "Medhassu - Learning Platform",
  description: "Modern learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Fixed Navbar */}
          <Navbar />

          <div className="flex">
            {/* Fixed Sidebar below navbar */}
            <aside
              data-slot="sidebar"
              className="fixed top-[64px] left-0 w-64 h-[calc(100vh-64px)] border-r border-[hsl(var(--color-sidebar-border))] bg-[hsl(var(--color-sidebar))] overflow-y-auto z-40"
            >
              <AppSidebar />
            </aside>

            {/* Main content area (offset by sidebar and navbar) */}
            <main className="flex-1 ml-64 mt-[64px] min-h-[calc(100vh-64px)] bg-[hsl(var(--color-background))] p-6 md:p-10 transition-colors">
              <div className="max-w-4xl mx-auto bg-[hsl(var(--color-card))] text-[hsl(var(--color-card-foreground))] rounded-xl shadow-lg border border-[hsl(var(--color-border))] p-8">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
