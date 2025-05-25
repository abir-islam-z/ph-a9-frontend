"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import {
  Award,
  ChefHat,
  Coffee,
  Globe,
  Heart,
  MapPin,
  Pizza,
  Search,
  Star,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    number: "10,000+",
    label: "Food Spots Discovered",
    icon: MapPin,
    color: "text-cyan-400",
  },
  {
    number: "50,000+",
    label: "Happy Foodies",
    icon: Users,
    color: "text-green-400",
  },
  {
    number: "100+",
    label: "Cities Covered",
    icon: Globe,
    color: "text-blue-400",
  },
  {
    number: "500+",
    label: "Food Reviews",
    icon: Star,
    color: "text-yellow-400",
  },
];

const features = [
  {
    title: "Discover Hidden Gems",
    description:
      "Find authentic street food spots that locals love but tourists rarely discover. Our community-driven platform highlights the best hidden culinary treasures.",
    icon: Search,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Community Reviews",
    description:
      "Read honest reviews from fellow food enthusiasts. Share your own experiences and help others discover amazing street food adventures.",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Cultural Stories",
    description:
      "Learn about the rich cultural heritage behind every dish. Understand the history, traditions, and stories that make street food special.",
    icon: Coffee,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Expert Guides",
    description:
      "Get insider tips from local food experts and experienced travelers. Navigate new cities with confidence and discover the best eats.",
    icon: Award,
    color: "from-green-500 to-emerald-500",
  },
];

const team = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    description:
      "Former food critic turned street food enthusiast. Sarah has traveled to 40+ countries documenting authentic street food culture.",
    image: "/team/sarah.jpg",
    specialties: ["Asian Cuisine", "Food Photography", "Cultural Research"],
  },
  {
    name: "Miguel Rodriguez",
    role: "Head of Community",
    description:
      "Passionate about connecting food lovers worldwide. Miguel manages our vibrant community of street food explorers.",
    image: "/team/miguel.jpg",
    specialties: ["Latin American", "Community Building", "Social Media"],
  },
  {
    name: "Priya Sharma",
    role: "Content Director",
    description:
      "Award-winning food writer with expertise in South Asian street food. Creates engaging content that tells the story behind every dish.",
    image: "/team/priya.jpg",
    specialties: ["Indian Cuisine", "Food Writing", "Recipe Development"],
  },
  {
    name: "Alex Kim",
    role: "Tech Lead",
    description:
      "Full-stack developer and food tech innovator. Builds the platform that connects street food lovers around the globe.",
    image: "/team/alex.jpg",
    specialties: ["Platform Development", "Food Tech", "UX Design"],
  },
];

const mission = [
  {
    title: "Our Mission",
    content:
      "To celebrate and preserve street food culture by connecting food enthusiasts with authentic local experiences. We believe every street corner has a story, and every vendor has wisdom to share.",
    icon: Target,
  },
  {
    title: "Our Vision",
    content:
      "A world where travelers can discover the soul of any city through its street food, where local vendors are celebrated, and where culinary traditions are preserved for future generations.",
    icon: Globe,
  },
  {
    title: "Our Values",
    content:
      "Authenticity, community, respect for local cultures, and the belief that the best food experiences often come from the most unexpected places. We champion diversity in every bite.",
    icon: Heart,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-cyan-900/30 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="container relative mx-auto px-4 py-16 md:py-20">
          <FadeIn>
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
                About{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  NeoFoodie
                </span>
              </h1>
              <p className="mb-8 text-lg text-slate-300 md:text-xl">
                We're passionate food explorers on a mission to connect people
                with authentic street food experiences around the world. Every
                bite tells a story, and we're here to help you discover them.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  Join Our Community
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600"
                >
                  Our Story
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Stats Section */}
        <FadeIn delay={0.1}>
          <section className="mb-20">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card
                  key={stat.label}
                  className="border-slate-700 bg-slate-800/50 backdrop-blur-xl text-center"
                >
                  <CardContent className="pt-6">
                    <div className="mb-4 flex justify-center">
                      <div className="rounded-full bg-slate-700/50 p-3">
                        <stat.icon className={cn("h-6 w-6", stat.color)} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {stat.number}
                    </div>
                    <div className="text-slate-400">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Mission Section */}
        <FadeIn delay={0.2}>
          <section className="mb-20">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold text-white">
                Our Purpose
              </h2>
              <p className="text-slate-300">
                Founded by food lovers, for food lovers. We believe that street
                food is the heart of any culture.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {mission.map((item, index) => (
                <Card
                  key={item.title}
                  className="border-slate-700 bg-slate-800/50 backdrop-blur-xl"
                >
                  <CardHeader className="text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-3">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 text-center">{item.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Features Section */}
        <FadeIn delay={0.3}>
          <section className="mb-20">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold text-white">
                What Makes Us Different
              </h2>
              <p className="text-slate-300">
                We're not just another food app. We're a community of passionate
                food explorers sharing authentic experiences.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {features.map((feature, index) => (
                <Card
                  key={feature.title}
                  className="group border-slate-700 bg-slate-800/50 backdrop-blur-xl transition-all hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                >
                  <CardHeader>
                    <div className="mb-4 flex items-center gap-4">
                      <div
                        className={cn(
                          "rounded-lg bg-gradient-to-r p-2",
                          feature.color
                        )}
                      >
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-white group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Team Section */}
        <FadeIn delay={0.4}>
          <section className="mb-20">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="mb-4 text-3xl font-bold text-white">
                Meet Our Team
              </h2>
              <p className="text-slate-300">
                Passionate food explorers from around the world, united by our
                love for authentic street food experiences.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <Card
                  key={member.name}
                  className="border-slate-700 bg-slate-800/50 backdrop-blur-xl text-center"
                >
                  <CardHeader>
                    <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                      <Users className="h-8 w-8 text-slate-400" />
                    </div>
                    <CardTitle className="text-white">{member.name}</CardTitle>
                    <CardDescription className="text-cyan-400">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-slate-300">
                      {member.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-300"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Call to Action */}
        <FadeIn delay={0.5}>
          <section className="rounded-lg border border-cyan-700/50 bg-gradient-to-r from-cyan-950/50 to-blue-950/50 p-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Ready to Discover Amazing Street Food?
            </h2>
            <p className="mb-8 text-slate-300 max-w-2xl mx-auto">
              Join thousands of food lovers who are exploring authentic street
              food experiences around the world. Your next favorite dish is
              waiting to be discovered.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  <ChefHat className="mr-2 h-5 w-5" />
                  Start Exploring
                </Button>
              </Link>
              <Link href="/posts">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-600"
                >
                  <Pizza className="mr-2 h-5 w-5" />
                  Browse Food Spots
                </Button>
              </Link>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
