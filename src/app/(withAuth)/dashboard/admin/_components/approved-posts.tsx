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

export default function AdminApprovedPosts() {
  const { posts, isLoading, error, fetchPosts, updatePremiumStatus } =
    useAdminPosts();
  const approvedPosts = posts.filter(
    (post) => post.status === "APPROVED" && !post.isPremium
  );
  const hasFetchedRef = useRef(false);

  const [premiumDialogOpen, setPremiumDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch once on component mount
    if (!hasFetchedRef.current) {
      fetchPosts();
      hasFetchedRef.current = true;
    }
  }, [fetchPosts]);

  const handlePromoteToPremium = (postId: string) => {
    setSelectedPostId(postId);
    setPremiumDialogOpen(true);
  };

  const handleConfirmPromote = async () => {
    if (selectedPostId) {
      try {
        const success = await updatePremiumStatus(selectedPostId, true);
        if (success) {
          setPremiumDialogOpen(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (isLoading && approvedPosts.length === 0) {
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

  if (approvedPosts.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No approved posts found.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {approvedPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {post.author.name}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="border-green-500 text-green-500"
                >
                  Approved
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
                <Button onClick={() => handlePromoteToPremium(post.id)}>
                  <Star className="mr-2 h-4 w-4" />
                  Promote to Premium
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={premiumDialogOpen} onOpenChange={setPremiumDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promote to Premium</DialogTitle>
            <DialogDescription>
              Are you sure you want to promote this post to premium status?
              Premium posts will be featured in the premium section and shown
              first in search results.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPremiumDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmPromote}>
              <Star className="mr-2 h-4 w-4" />
              Promote to Premium
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
