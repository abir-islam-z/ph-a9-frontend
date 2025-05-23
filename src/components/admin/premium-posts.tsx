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
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminPosts } from "@/hooks/use-admin";
import { AlertCircle, Calendar, DollarSign, MapPin, Star } from "lucide-react";
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
      <FadeIn from="bottom">
        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/40 dark:to-yellow-900/40 border-yellow-200 dark:border-yellow-800">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center py-8">
              <div className="mb-4 p-4 rounded-full bg-yellow-100 dark:bg-yellow-900/40">
                <Star className="h-10 w-10 text-yellow-500" />
              </div>
              <p className="text-center text-muted-foreground">
                No premium posts found.
              </p>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Premium posts will appear here when they are created.
              </p>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    );
  }

  return (
    <>
      <FadeIn from="bottom">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Premium Posts</h2>
          <p className="text-muted-foreground">
            Manage posts with premium status. These posts are exclusively
            available to premium subscribers.
          </p>
        </div>
      </FadeIn>

      <StaggerContainer className="grid gap-4 md:grid-cols-2">
        {premiumPosts.map((post) => (
          <StaggerItem key={post.id}>
            <Card className="h-full group border-yellow-200 dark:border-yellow-900 hover:border-yellow-400 dark:hover:border-yellow-700 transition-all duration-300 hover:shadow-lg overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="line-clamp-1 group-hover:text-orange-500 transition-colors duration-200">
                      {post.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {post.author.name}
                    </p>
                  </div>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white">
                    <Star className="mr-1 h-3 w-3 fill-white" /> Premium
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="relative aspect-video overflow-hidden rounded-md group-hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="mt-4">
                  <p className="line-clamp-2 text-sm">{post.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <div className="flex items-center text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      <MapPin className="h-3 w-3 mr-1" />
                      {post.location}
                    </div>
                    <div className="flex items-center text-xs px-2 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                      <DollarSign className="h-3 w-3 mr-1" />${post.minPrice} -
                      ${post.maxPrice}
                    </div>
                    <div className="flex items-center text-xs px-2 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="grid w-full gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 hover:from-blue-100 hover:to-blue-200 transition-all duration-300"
                  >
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
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300"
                  >
                    Remove Premium Status
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <Dialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove Premium Status</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove the premium status from this post?
              This will make it a regular post and hide it from the premium
              section.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setRemoveDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmRemove}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
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
        <Card key={i} className="h-full animate-pulse">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <Skeleton className="h-6 w-40 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
                <Skeleton className="mt-1 h-4 w-28 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
              </div>
              <Skeleton className="h-6 w-24 bg-gradient-to-r from-yellow-200 to-yellow-300 dark:from-yellow-800 dark:to-yellow-700" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-video w-full rounded-md bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
            <div className="mt-4">
              <Skeleton className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
              <Skeleton className="mt-1 h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
              <div className="mt-2 flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
                <Skeleton className="h-6 w-24 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
                <Skeleton className="h-6 w-28 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="grid w-full gap-2">
              <Skeleton className="h-10 w-full bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-700" />
              <Skeleton className="h-10 w-full bg-gradient-to-r from-red-200 to-red-300 dark:from-red-800 dark:to-red-700" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
