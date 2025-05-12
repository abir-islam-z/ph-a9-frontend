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
import { AlertCircle, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AdminApprovedPosts() {
  const approvedPosts = posts.filter(
    (post) => post.status === "approved" && !post.isPremium
  );
  const hasFetchedRef = useRef(false);

  const [premiumDialogOpen, setPremiumDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch once on component mount
    if (!hasFetchedRef.current) {
      dispatch(fetchAdminPosts());
      hasFetchedRef.current = true;
    }
  }, [dispatch]);

  const openPremiumDialog = (postId: string) => {
    setSelectedPostId(postId);
    setPremiumDialogOpen(true);
  };

  const handleMarkPremium = () => {
    if (selectedPostId) {
      dispatch(
        updatePostStatus({
          postId: selectedPostId,
          isPremium: true,
        })
      );
      setPremiumDialogOpen(false);
    }
  };

  if (status === "loading" && approvedPosts.length === 0) {
    return <AdminPostsSkeleton />;
  }

  if (status === "failed") {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error || "Failed to load posts. Please try again."}
        </AlertDescription>
      </Alert>
    );
  }

  if (approvedPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No approved posts</h3>
        <p className="text-muted-foreground">Approved posts will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {approvedPosts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{post.title}</CardTitle>
              <Badge variant="outline" className="bg-green-100">
                Approved
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              By {post.author.name} •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                {post.image && (
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="mb-4 h-48 w-full rounded-md object-cover"
                  />
                )}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{post.priceRange}</Badge>
                  <Badge variant="outline" className="capitalize">
                    {post.category}
                  </Badge>
                  <Badge variant="outline">{post.location}</Badge>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground">{post.description}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => openPremiumDialog(post.id)}
            >
              <Star className="mr-2 h-4 w-4 text-yellow-500" />
              Mark as Premium
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Dialog open={premiumDialogOpen} onOpenChange={setPremiumDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark as Premium</DialogTitle>
            <DialogDescription>
              This will make the post only visible to premium users. Are you
              sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPremiumDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleMarkPremium}>Mark as Premium</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AdminPostsSkeleton() {
  return (
    <div className="space-y-6">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Skeleton className="mb-4 h-48 w-full rounded-md" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Skeleton className="h-9 w-36" />
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
