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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <AppSidebar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
