"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { fetchApi } from "@/lib/api-client";
import type { ApiResponse, FoodSpot, UserVotes } from "@/types/api";
import {
  AlertCircle,
  Lock,
  MapPin,
  Star,
  ThumbsDown,
  ThumbsUp,
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
const fetcher = (url: string) => fetchApi(url);

export default function PostDetail({ id }: PostDetailProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();

  // Fetch food spot data
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
      const currentVotes = { ...userVotesData?.data } || {};

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
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{formatPriceRange()}</Badge>
          <Badge className="capitalize">{post.category.toLowerCase()}</Badge>
          {isPostPremium && (
            <Badge variant="secondary" className="bg-yellow-500 text-white">
              <Star className="mr-1 h-3 w-3" /> Premium
            </Badge>
          )}
        </div>
      </div>

      <div className="mb-6 relative">
        <Image
          src={post.image || "/placeholder.svg?height=400&width=800"}
          alt={post.title}
          width={800}
          height={400}
          className="w-full rounded-lg object-cover"
          style={{ height: "400px" }}
        />
      </div>

      {isPostPremium && !isPremium ? (
        <Card className="mb-6 p-6 text-center">
          <div className="flex flex-col items-center justify-center py-4">
            <Lock className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-bold">Premium Content</h3>
            <p className="mb-4 text-muted-foreground">
              This content is only available to premium members
            </p>
            <Link href="/premium">
              <Button>Upgrade to Premium</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="mb-2 text-xl font-bold">Description</h2>
            <p className="text-muted-foreground">{post.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-bold">Location</h2>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="mr-2 h-5 w-5" />
              <span>{post.location}</span>
            </div>
          </div>
        </>
      )}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={userVote === "UPVOTE" ? "default" : "outline"}
              size="sm"
              onClick={() => handleVote("UPVOTE")}
            >
              <ThumbsUp className="mr-1 h-4 w-4" />
              <span>{post.upvotes}</span>
            </Button>
            <Button
              variant={userVote === "DOWNVOTE" ? "default" : "outline"}
              size="sm"
              onClick={() => handleVote("DOWNVOTE")}
            >
              <ThumbsDown className="mr-1 h-4 w-4" />
              <span>{post.downvotes}</span>
            </Button>
          </div>
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
                    }`}
                  />
                ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({post.reviewCount} ratings)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostDetailSkeleton() {
  return (
    <div className="mb-8 space-y-4">
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-[400px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
