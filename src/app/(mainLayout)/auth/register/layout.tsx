import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | NeoFoodie - Join Our Community",
  description:
    "Sign up for NeoFoodie to discover and share amazing street food experiences around the world. Join our community of food enthusiasts today!",
  keywords: [
    "street food signup",
    "create account",
    "join NeoFoodie",
    "street food community",
    "food explorer registration",
    "food discovery platform",
  ],
  openGraph: {
    title: "Join NeoFoodie - Create Your Account Today",
    description:
      "Become part of our global street food community. Discover hidden gems, share your experiences, and connect with fellow food enthusiasts.",
    type: "website",
    images: [
      {
        url: "/og/register.jpg",
        width: 1200,
        height: 630,
        alt: "NeoFoodie Registration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Your NeoFoodie Account",
    description:
      "Join thousands of food explorers discovering authentic street food experiences worldwide.",
    images: ["/og/register.jpg"],
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
