"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FadeIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { fetchApi } from "@/lib/api-client";
import type { ApiResponse, FoodSpot, UserVotes } from "@/types/api";
import {
  AlertCircle,
  Clock,
  Lock,
  MapPin,
  Share2,
  Star,
  ThumbsDown,
  ThumbsUp,
  Utensils,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";

interface PostDetailProps {
  id: string;
}

// Fetcher function for SWR
// Define a properly typed fetcher function that works with SWR
const fetcher = <T,>(url: string): Promise<T> => fetchApi<T>(url);

export default function PostDetail({ id }: PostDetailProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();

  // Fetch food spot data
  // Fetch food spot data with proper typing
  const { data: foodSpotData, error: foodSpotError } = useSWR<
    ApiResponse<FoodSpot>
  >(`/foodspots/${id}`, fetcher);

  // Fetch user votes
  const { data: userVotesData } = useSWR<ApiResponse<UserVotes>>(
    session ? "/votes/user" : null,
    fetcher
  );

  const isPremium =
    session?.user?.role === "premium" || session?.user?.role === "admin";
  const isPostPremium = foodSpotData?.data?.isPremium;
  const userVote = userVotesData?.data?.[id];

  const handleVote = async (voteType: "UPVOTE" | "DOWNVOTE") => {
    if (!session) {
      router.push(`/auth/login?callbackUrl=/posts/${id}`);
      return;
    }

    try {
      // Determine if we're adding or removing a vote
      const isRemovingVote = userVote === voteType;

      // Optimistically update UI
      const currentVotes = userVotesData?.data ? { ...userVotesData.data } : {};

      if (isRemovingVote) {
        delete currentVotes[id];
      } else {
        currentVotes[id] = voteType;
      }

      // Update the cache
      mutate(
        "/votes/user",
        { success: true, message: "Vote updated", data: currentVotes },
        false
      );

      // Make the API call
      await fetchApi(`/votes/${voteType.toLowerCase()}`, {
        method: "POST",
        body: JSON.stringify({ foodSpotId: id }),
      });

      // Refetch the food spot to get updated vote counts
      mutate(`/foodspots/${id}`);

      toast({
        title: "Vote recorded",
        description: isRemovingVote
          ? "Your vote has been removed"
          : `You ${
              voteType === "UPVOTE" ? "upvoted" : "downvoted"
            } this food spot.`,
      });
    } catch (error) {
      // Revert optimistic update on error
      mutate("/votes/user");

      toast({
        variant: "destructive",
        title: "Failed to vote",
        description: "Please try again later.",
      });
    }
  };

  if (!foodSpotData && !foodSpotError) {
    return <PostDetailSkeleton />;
  }

  if (foodSpotError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {foodSpotError.message ||
            "Failed to load post details. Please try again."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!foodSpotData?.data) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">Post not found</h3>
        <p className="text-muted-foreground">
          The post you're looking for doesn't exist or has been removed
        </p>
      </div>
    );
  }

  const post = foodSpotData.data;

  // Format price range
  const formatPriceRange = () => {
    if (post.minPrice === post.maxPrice) {
      return `$${post.minPrice}`;
    }
    return `$${post.minPrice} - $${post.maxPrice}`;
  };

  return (
    <div className="mb-8">
      <FadeIn
        from="top"
        duration={0.6}
        className="mb-4 flex flex-wrap items-center justify-between gap-2"
      >
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900"
          >
            {formatPriceRange()}
          </Badge>
          <Badge className="capitalize bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            {post.category.toLowerCase()}
          </Badge>
          {isPostPremium && (
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white animate-pulse"
            >
              <Star className="mr-1 h-3 w-3" /> Premium
            </Badge>
          )}
        </div>
      </FadeIn>

      <FadeIn
        from="bottom"
        delay={0.1}
        className="mb-6 relative rounded-xl overflow-hidden shadow-lg"
      >
        <div className="relative">
          <Image
            src={post.image || "/placeholder.svg?height=400&width=800"}
            alt={post.title}
            width={800}
            height={400}
            className="w-full rounded-lg object-cover transition-transform hover:scale-105 duration-700"
            style={{ height: "400px" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </FadeIn>

      {isPostPremium && !isPremium ? (
        <ScaleIn className="mb-6" delay={0.2}>
          <Card className="p-6 text-center border-2 border-yellow-500/20 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="mb-4 p-4 rounded-full bg-yellow-100 dark:bg-yellow-900/40">
                <Lock className="h-12 w-12 text-yellow-500" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Premium Content</h3>
              <p className="mb-6 text-muted-foreground max-w-md mx-auto">
                This exclusive content is only available to premium members.
                Upgrade now to discover this hidden gem!
              </p>
              <Link href="/premium">
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  Upgrade to Premium
                </Button>
              </Link>
            </div>
          </Card>
        </ScaleIn>
      ) : (
        <StaggerContainer delay={0.3} className="space-y-6">
          <StaggerItem>
            <div className="mb-6 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/40 p-5 rounded-lg">
              <h2 className="mb-2 text-xl font-bold flex items-center">
                <Utensils className="mr-2 h-5 w-5 text-orange-500" />
                Description
              </h2>
              <p className="text-muted-foreground">{post.description}</p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40 p-5 rounded-lg">
              <h2 className="mb-2 text-xl font-bold flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-blue-500" />
                Location
              </h2>
              <div className="flex items-center text-muted-foreground">
                <span>{post.location}</span>
              </div>
            </div>
          </StaggerItem>

          {post.description.includes("Hours:") && (
            <StaggerItem>
              <div className="mb-6 bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-950/40 dark:to-teal-900/40 p-5 rounded-lg">
                <h2 className="mb-2 text-xl font-bold flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-teal-500" />
                  Opening Hours
                </h2>
                <div className="text-muted-foreground">
                  <span>
                    {post.description.split("Hours:")[1] || "Not specified"}
                  </span>
                </div>
              </div>
            </StaggerItem>
          )}
        </StaggerContainer>
      )}

      <ScaleIn
        delay={0.5}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950/40 dark:to-slate-900/40 rounded-lg"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={userVote === "UPVOTE" ? "default" : "outline"}
              size="sm"
              onClick={() => handleVote("UPVOTE")}
              className={
                userVote === "UPVOTE" ? "bg-green-500 hover:bg-green-600" : ""
              }
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              <span>{post.upvotes}</span>
            </Button>
            <Button
              variant={userVote === "DOWNVOTE" ? "default" : "outline"}
              size="sm"
              onClick={() => handleVote("DOWNVOTE")}
              className={
                userVote === "DOWNVOTE" ? "bg-red-500 hover:bg-red-600" : ""
              }
            >
              <ThumbsDown className="mr-1 h-4 w-4" />
              <span>{post.downvotes}</span>
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: post.title,
                  text: post.description,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                toast({
                  title: "Link copied",
                  description: "Link copied to clipboard",
                });
              }
            }}
            className="ml-2"
          >
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </Button>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Rating:</span>
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(post.averageRating)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted"
                    } transition-transform hover:scale-110 duration-200`}
                  />
                ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({post.reviewCount} ratings)
            </span>
          </div>
        </div>
      </ScaleIn>
    </div>
  );
}

function PostDetailSkeleton() {
  return (
    <div className="mb-8 space-y-4 animate-pulse">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Skeleton className="h-10 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
          <Skeleton className="h-6 w-20 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
        </div>
      </div>
      <Skeleton className="h-[400px] w-full rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
        <Skeleton className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
        <Skeleton className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
        <Skeleton className="h-4 w-2/3 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
        <Skeleton className="h-4 w-1/2 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700" />
      </div>
    </div>
  );
}
