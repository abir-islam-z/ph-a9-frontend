"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Calendar, ChevronRight, Clock, Heart, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Sample data - in a real app, this would come from an API
const featuredBlogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Bangkok Street Food",
    excerpt:
      "Discover the hidden gems of Bangkok's street food scene, from authentic pad thai vendors to secret som tam spots that locals love.",
    category: "Street Food Guide",
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "8 min read",
    slug: "bangkok-street-food-guide",
  },
  {
    id: 2,
    title: "5 Must-Try Taco Trucks in Los Angeles",
    excerpt:
      "From carnitas to fish tacos, explore the best mobile food vendors in LA that serve authentic Mexican street food.",
    category: "Food Reviews",
    author: "Miguel Rodriguez",
    date: "2024-01-12",
    readTime: "6 min read",
    slug: "best-la-taco-trucks",
  },
  {
    id: 3,
    title: "Street Food Photography: Capturing the Perfect Shot",
    excerpt:
      "Learn professional techniques for photographing street food that will make your Instagram followers hungry.",
    category: "Tips & Tricks",
    author: "Alex Kim",
    date: "2024-01-10",
    readTime: "10 min read",
    slug: "street-food-photography-tips",
  },
];

export default function BlogSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demo purposes
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-12">
      <FadeIn>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Latest from Our{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Blog
              </span>
            </h2>
            <p className="mt-2 text-slate-300">
              Street food stories, guides, and culinary adventures
            </p>
          </div>
          <Link href="/blog">
            <Button
              variant="outline"
              className="border-cyan-700/30 bg-slate-800/50 text-cyan-400 hover:bg-slate-700/50 hover:text-cyan-300"
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <BlogSectionSkeleton />
        ) : (
          <StaggerContainer
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.1}
          >
            {featuredBlogPosts.map((post) => (
              <StaggerItem key={post.id}>
                <BlogPostCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </FadeIn>
    </section>
  );
}

function BlogPostCard({ post }: { post: (typeof featuredBlogPosts)[0] }) {
  return (
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
            <div className="text-sm font-medium text-white">{post.author}</div>
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
  );
}

function BlogSectionSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card
          key={i}
          className="overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur-xl"
        >
          <CardHeader className="border-b border-slate-700/50 p-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-24 bg-slate-700 rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-transparent"></div>
              <div className="h-4 w-16 bg-slate-700 rounded animate-pulse"></div>
            </div>
            <div className="h-6 w-full bg-slate-700 rounded animate-pulse mt-2"></div>
          </CardHeader>

          <CardContent className="p-4">
            <div className="h-4 w-full bg-slate-700 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-slate-700 rounded animate-pulse mt-2"></div>
          </CardContent>

          <CardFooter className="border-t border-slate-700/50 bg-slate-800/80 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-slate-700 animate-pulse"></div>
              <div>
                <div className="h-4 w-20 bg-slate-700 rounded animate-pulse"></div>
                <div className="h-3 w-16 bg-slate-700 rounded animate-pulse mt-1"></div>
              </div>
            </div>
            <div className="h-8 w-16 bg-slate-700 rounded animate-pulse"></div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
