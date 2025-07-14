"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FadeIn } from "@/components/ui/motion";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <FadeIn from="bottom" delay={0.2} className="max-w-2xl w-full">
        <Card className="border-2 border-muted bg-card/50 backdrop-blur-sm shadow-lg overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 bg-secondary/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 -mb-8 -ml-8 bg-primary/20 rounded-full blur-2xl" />

          <CardHeader className="text-center relative z-10">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-primary p-4 text-primary-foreground">
                <Search className="h-10 w-10" />
              </div>
            </div>

            <h1 className="text-6xl font-bold mb-4">
              <span className="text-primary">4</span>
              <span className="text-secondary">0</span>
              <span className="text-primary">4</span>
            </h1>

            <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
            <p className="text-muted-foreground text-lg">
              We couldn't find the page you're looking for.
            </p>
          </CardHeader>

          <CardContent className="relative z-10 space-y-4 text-center px-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-10 h-0.5 bg-gradient-to-r from-transparent to-muted-foreground/50" />
              <div className="w-10 h-0.5 bg-gradient-to-l from-transparent to-muted-foreground/50" />
            </div>

            <p className="text-muted-foreground">
              The page you're trying to access doesn't exist or may have been
              moved.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
              <Button asChild className="flex items-center gap-2">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2"
              >
                <Link href="/posts">
                  <Search className="h-4 w-4" />
                  Browse All Posts
                </Link>
              </Button>
            </div>
          </CardContent>

          <CardFooter className="text-center text-sm text-muted-foreground pb-8 relative z-10">
            <p className="mx-auto">
              Need help?{" "}
              <Link href="/" className="text-primary hover:underline">
                Contact Us
              </Link>
            </p>
          </CardFooter>
        </Card>
      </FadeIn>
    </div>
  );
}
