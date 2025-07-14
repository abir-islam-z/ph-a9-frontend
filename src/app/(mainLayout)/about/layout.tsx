import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | NeoFoodie - Discover Authentic Street Food",
  description:
    "Learn about NeoFoodie's mission to connect food lovers with authentic street food experiences around the world. Meet our team and discover our story.",
  keywords: [
    "about NeoFoodie",
    "street food platform",
    "food community",
    "authentic food experiences",
    "food culture",
    "street food mission",
  ],
  openGraph: {
    title: "About NeoFoodie - Connecting Food Lovers Worldwide",
    description:
      "Passionate food explorers on a mission to connect people with authentic street food experiences. Every bite tells a story.",
    type: "website",
    images: [
      {
        url: "/og/about.jpg",
        width: 1200,
        height: 630,
        alt: "About NeoFoodie - Street Food Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About NeoFoodie - Street Food Community",
    description:
      "Meet the team behind the platform connecting food lovers with authentic street food experiences worldwide.",
    images: ["/og/about.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
