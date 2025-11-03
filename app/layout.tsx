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
      <body className="antialiased bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navbar - Fixed */}
          <Navbar />

          {/* Page wrapper for layout */}
          <div className="flex relative">
            {/* Sidebar - Fixed under navbar */}
            <aside
              data-slot="sidebar"
              className="fixed top-[64px] left-0 w-[250px] h-[calc(100vh-64px)] border-r border-[hsl(var(--color-sidebar-border))] bg-[hsl(var(--color-sidebar))] overflow-y-auto z-40"
            >
              <AppSidebar />
            </aside>

            {/* Main content area */}
            <main className="flex-1 ml-[250px] mt-[64px] min-h-[calc(100vh-64px)] bg-[hsl(var(--color-background))] transition-colors">
              <div className="max-w-4xl mx-auto py-10 px-6 md:px-10">
                <div className="bg-[hsl(var(--color-card))] text-[hsl(var(--color-card-foreground))] rounded-xl shadow-lg border border-[hsl(var(--color-border))] p-8 transition-colors">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
