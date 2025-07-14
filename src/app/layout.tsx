import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import { FilterProvider } from "@/contexts/filter-context";
import { AuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Street Food Finder",
  description: "Discover and review the best street food in your area",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <FilterProvider>
              <>{children}</>
              <Toaster />
            </FilterProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
