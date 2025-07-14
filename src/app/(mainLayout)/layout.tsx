import { auth } from "@/auth";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/navbar/header";
import type React from "react";

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
    <div className="flex min-h-screen flex-col bg-fixed bg-noise data-lines">
      <Header session={session} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
