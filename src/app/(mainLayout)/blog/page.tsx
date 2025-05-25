"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChefHat,
  Clock,
  Coffee,
  Heart,
  MapPin,
  Pizza,
  Search,
  Star,
  TrendingUp,
  User,
} from "lucide-react";
import { useState } from "react";

const categories = [
  { name: "All", count: 24, active: true },
  { name: "Street Food Guide", count: 8, active: false, icon: MapPin },
  { name: "Food Reviews", count: 6, active: false, icon: Star },
  { name: "Cooking Tips", count: 5, active: false, icon: ChefHat },
  { name: "Food Culture", count: 3, active: false, icon: Coffee },
  { name: "Trending", count: 2, active: false, icon: TrendingUp },
];

const featuredPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Bangkok Street Food",
    excerpt:
      "Discover the hidden gems of Bangkok's street food scene, from authentic pad thai vendors to secret som tam spots that locals love.",
    category: "Street Food Guide",
    author: "Sarah Chen",
    authorAvatar: "/avatars/sarah.jpg",
    date: "2024-01-15",
    readTime: "8 min read",
    image: "/blog/bangkok-street-food.jpg",
    featured: true,
    tags: ["Bangkok", "Thailand", "Street Food", "Travel"],
  },
  {
    id: 2,
    title: "5 Must-Try Taco Trucks in Los Angeles",
    excerpt:
      "From carnitas to fish tacos, explore the best mobile food vendors in LA that serve authentic Mexican street food.",
    category: "Food Reviews",
    author: "Miguel Rodriguez",
    authorAvatar: "/avatars/miguel.jpg",
    date: "2024-01-12",
    readTime: "6 min read",
    image: "/blog/la-tacos.jpg",
    featured: true,
    tags: ["Los Angeles", "Mexican", "Tacos", "Food Trucks"],
  },
  {
    id: 3,
    title: "Street Food Photography: Capturing the Perfect Shot",
    excerpt:
      "Learn professional techniques for photographing street food that will make your Instagram followers hungry.",
    category: "Tips & Tricks",
    author: "Alex Kim",
    authorAvatar: "/avatars/alex.jpg",
    date: "2024-01-10",
    readTime: "10 min read",
    image: "/blog/food-photography.jpg",
    featured: false,
    tags: ["Photography", "Social Media", "Tips"],
  },
];

const recentPosts = [
  {
    id: 4,
    title: "New York's Hidden Halal Cart Gems",
    excerpt:
      "Beyond the famous Halal Guys, discover the underground halal cart scene that's taking NYC by storm.",
    category: "Street Food Guide",
    author: "David Park",
    authorAvatar: "/avatars/david.jpg",
    date: "2024-01-08",
    readTime: "7 min read",
    tags: ["New York", "Halal", "Middle Eastern"],
  },
  {
    id: 5,
    title: "The Science Behind Perfect Street Food Seasoning",
    excerpt:
      "Understanding flavor profiles and spice combinations that make street food irresistible around the world.",
    category: "Cooking Tips",
    author: "Chef Maria",
    authorAvatar: "/avatars/maria.jpg",
    date: "2024-01-05",
    readTime: "12 min read",
    tags: ["Cooking", "Spices", "Science"],
  },
  {
    id: 6,
    title: "Street Food Safety: What You Need to Know",
    excerpt:
      "Essential tips for enjoying street food safely while traveling, from choosing vendors to avoiding common pitfalls.",
    category: "Tips & Tricks",
    author: "Dr. Lisa Wong",
    authorAvatar: "/avatars/lisa.jpg",
    date: "2024-01-03",
    readTime: "5 min read",
    tags: ["Safety", "Travel", "Health"],
  },
  {
    id: 7,
    title: "Mumbai's Chaat Culture: A Deep Dive",
    excerpt:
      "Exploring the complex flavors and cultural significance of Mumbai's beloved chaat vendors and their stories.",
    category: "Food Culture",
    author: "Priya Sharma",
    authorAvatar: "/avatars/priya.jpg",
    date: "2024-01-01",
    readTime: "9 min read",
    tags: ["Mumbai", "Indian", "Culture", "Chaat"],
  },
  {
    id: 8,
    title: "Food Truck Revolution: How Mobile Vendors Are Changing Cities",
    excerpt:
      "An analysis of how food trucks are reshaping urban food landscapes and creating new opportunities for entrepreneurs.",
    category: "Food Culture",
    author: "James Wilson",
    authorAvatar: "/avatars/james.jpg",
    date: "2023-12-28",
    readTime: "11 min read",
    tags: ["Food Trucks", "Urban", "Business"],
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = recentPosts.filter((post) =>
    selectedCategory === "All" ? true : post.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-cyan-900/30 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="container relative mx-auto px-4 py-16 md:py-20">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
                Street Food{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Stories
                </span>
              </h1>
              <p className="mb-8 text-lg text-slate-300 md:text-xl">
                Discover the world's best street food through our curated
                articles, guides, and cultural explorations. From hidden gems to
                trending spots, we cover it all.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-10 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                  Browse Articles
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Categories Filter */}
        <FadeIn delay={0.1}>
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  selectedCategory === category.name
                    ? "bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/30"
                    : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300"
                )}
              >
                {category.icon && <category.icon className="h-4 w-4" />}
                {category.name}
                <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Featured Posts */}
        <FadeIn delay={0.2}>
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">
              Featured Articles
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {featuredPosts
                .filter((post) => post.featured)
                .map((post, index) => (
                  <Card
                    key={post.id}
                    className="group overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur-xl transition-all hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                  >
                    <div className="aspect-video overflow-hidden">
                      <div className="h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                        <Pizza className="h-12 w-12 text-slate-500" />
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-cyan-400">
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <CardTitle className="text-white group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-slate-300">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center">
                          <User className="h-4 w-4 text-slate-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            {post.author}
                          </div>
                          <div className="text-xs text-slate-400">
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        Read More
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </section>
        </FadeIn>

        {/* Recent Posts Grid */}
        <FadeIn delay={0.3}>
          <section>
            <h2 className="mb-6 text-2xl font-bold text-white">
              Recent Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="group overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur-xl transition-all hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-cyan-400">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-white group-hover:text-cyan-400 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center">
                        <User className="h-4 w-4 text-slate-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {post.author}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-slate-400 hover:text-red-400"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        Read
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Newsletter Signup */}
        <FadeIn delay={0.4}>
          <section className="mt-16 rounded-lg border border-cyan-700/50 bg-gradient-to-r from-cyan-950/50 to-blue-950/50 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Stay Updated with Street Food Stories
            </h2>
            <p className="mb-6 text-slate-300">
              Get weekly insights, new articles, and exclusive street food
              discoveries delivered to your inbox.
            </p>
            <div className="mx-auto flex max-w-md gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                Subscribe
              </Button>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
