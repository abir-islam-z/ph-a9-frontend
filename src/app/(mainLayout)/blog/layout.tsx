import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | NeoFoodie - Street Food Stories & Guides",
  description:
    "Discover the world's best street food through our curated articles, guides, and cultural explorations. From hidden gems to trending spots, we cover it all.",
  keywords: [
    "street food blog",
    "food articles",
    "street food guides",
    "food culture",
    "food reviews",
    "travel food",
    "authentic street food",
    "food stories",
  ],
  openGraph: {
    title: "NeoFoodie Blog - Street Food Stories & Cultural Guides",
    description:
      "Explore street food culture through our expert articles, city guides, and authentic food stories from around the world.",
    type: "website",
    images: [
      {
        url: "/og/blog.jpg",
        width: 1200,
        height: 630,
        alt: "NeoFoodie Blog - Street Food Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoFoodie Blog - Street Food Stories",
    description:
      "Discover authentic street food culture through expert guides, reviews, and cultural explorations from around the world.",
    images: ["/og/blog.jpg"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
