"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminPosts } from "@/hooks/use-admin";
import { AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";

export default function AdminRejectedPosts() {
  const { posts, isLoading, error, fetchPosts } = useAdminPosts();
  const rejectedPosts = posts.filter((post) => post.status === "REJECTED");
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // Only fetch once on component mount
    if (!hasFetchedRef.current) {
      fetchPosts();
      hasFetchedRef.current = true;
    }
  }, [fetchPosts]);

  if (isLoading && rejectedPosts.length === 0) {
    return <AdminPostsSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (rejectedPosts.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No rejected posts found.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {rejectedPosts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {post.author.name}
                </p>
              </div>
              <Badge variant="destructive">Rejected</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="absolute inset-0 h-full w-full object-cover opacity-50"
              />
            </div>
            <div className="mt-4">
              <p className="line-clamp-2 text-sm">{post.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline">{post.category}</Badge>
                <Badge variant="outline">
                  ${post.minPrice} - ${post.maxPrice}
                </Badge>
                <Badge variant="outline">{post.location}</Badge>
              </div>
              <div className="mt-4 rounded-md border border-destructive/20 bg-destructive/10 p-3">
                <p className="text-sm font-medium text-destructive">
                  Rejection Reason:
                </p>
                <p className="text-sm text-muted-foreground">
                  {post.rejectionReason || "No reason provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AdminPostsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <Skeleton className="h-6 w-40" />
                <Skeleton className="mt-1 h-4 w-28" />
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-video w-full rounded-md" />
            <div className="mt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-1 h-4 w-full" />
              <div className="mt-2 flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-28" />
              </div>
              <Skeleton className="mt-4 h-20 w-full rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
