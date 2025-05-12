"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminPosts } from "@/hooks/use-admin";
import { AlertCircle, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AdminPremiumPosts() {
  const { posts, isLoading, error, fetchPosts, updatePremiumStatus } =
    useAdminPosts();
  const premiumPosts = posts.filter((post) => post.isPremium);
  const hasFetchedRef = useRef(false);

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch once on component mount
    if (!hasFetchedRef.current) {
      fetchPosts();
      hasFetchedRef.current = true;
    }
  }, [fetchPosts]);

  const handleRemovePremium = (postId: string) => {
    setSelectedPostId(postId);
    setRemoveDialogOpen(true);
  };

  const handleConfirmRemove = async () => {
    if (selectedPostId) {
      try {
        const success = await updatePremiumStatus(selectedPostId, false);
        if (success) {
          setRemoveDialogOpen(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (isLoading && premiumPosts.length === 0) {
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

  if (premiumPosts.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No premium posts found.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {premiumPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {post.author.name}
                  </p>
                </div>
                <Badge className="bg-yellow-500 hover:bg-yellow-600">
                  <Star className="mr-1 h-3 w-3" /> Premium
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video overflow-hidden rounded-md">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="absolute inset-0 h-full w-full object-cover"
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
              </div>
            </CardContent>
            <CardFooter>
              <div className="grid w-full gap-2">
                <Button asChild variant="outline">
                  <a
                    href={`/posts/${post.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Post
                  </a>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleRemovePremium(post.id)}
                >
                  Remove Premium Status
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Premium Status</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove the premium status from this post?
              This will make it a regular post and hide it from the premium
              section.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRemoveDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmRemove}>
              Remove Premium Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
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
              <Skeleton className="h-6 w-24" />
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
            </div>
          </CardContent>
          <CardFooter>
            <div className="grid w-full gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
