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
import { Textarea } from "@/components/ui/textarea";
import { useAdminPosts } from "@/hooks/use-admin";
import { AlertCircle, Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AdminPendingPosts() {
  const { posts, isLoading, error, fetchPendingPosts, updatePostStatus } =
    useAdminPosts();
  const pendingPosts = posts.filter((post) => post.status === "PENDING");
  const hasFetchedRef = useRef(false);

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    // Only fetch once on component mount
    if (!hasFetchedRef.current) {
      fetchPendingPosts();
      hasFetchedRef.current = true;
    }
  }, [fetchPendingPosts]);

  const handleApproveClick = async (postId: string) => {
    await updatePostStatus(postId, { approvalStatus: "APPROVED" });
  };

  const handleRejectClick = (postId: string) => {
    setSelectedPostId(postId);
    setRejectionReason("");
    setRejectDialogOpen(true);
  };

  const handleConfirmReject = async () => {
    if (selectedPostId) {
      await updatePostStatus(selectedPostId, {
        approvalStatus: "REJECTED",
        rejectionReason: rejectionReason.trim() || "Post rejected by admin",
      });
      setRejectDialogOpen(false);
    }
  };

  if (isLoading && pendingPosts.length === 0) {
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

  if (pendingPosts.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No pending posts found.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {pendingPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {post.author.name}
                  </p>
                </div>
                <Badge>Pending</Badge>
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
            <CardFooter className="flex gap-2">
              <Button
                className="w-full gap-1"
                variant="default"
                onClick={() => handleApproveClick(post.id)}
              >
                <Check className="h-4 w-4" /> Approve
              </Button>
              <Button
                className="w-full gap-1"
                variant="destructive"
                onClick={() => handleRejectClick(post.id)}
              >
                <X className="h-4 w-4" /> Reject
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Post</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this post. This will be
              visible to the post author.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Reason for rejection"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmReject}>
              Reject Post
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
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
