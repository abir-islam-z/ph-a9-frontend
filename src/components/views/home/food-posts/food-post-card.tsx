import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FoodSpot } from "@/types/api";
import { Lock, MapPin, MessageSquare, Star, ThumbsUp } from "lucide-react";
import { motion } from "motion/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface FoodPostCardProps {
  post: FoodSpot;
  index?: number;
}

export default function FoodPostCard({ post, index = 0 }: FoodPostCardProps) {
  const { data: session } = useSession();
  const isPremium =
    session?.user?.role === "premium" || session?.user?.role === "admin";
  const isPostPremium = post.isPremium;

  // Format price range
  const formatPriceRange = () => {
    if (post.minPrice === post.maxPrice) {
      return `$${post.minPrice}`;
    }
    return `$${post.minPrice} - $${post.maxPrice}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="group h-full overflow-hidden cyber-border transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,224,255,0.3)] bg-card">
        <div className="relative">
          <Link href={`/posts/${post.id}`}>
            <div className="aspect-video w-full overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={post.image || "/placeholder.svg?height=225&width=400"}
                  alt={post.title}
                  width={400}
                  height={225}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </Link>

          {isPostPremium && (
            <div className="absolute right-2 top-2">
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 shadow-[0_0_10px_rgba(245,158,11,0.5)] hover:from-amber-400 hover:to-yellow-400 border-none"
              >
                <Star className="mr-1 h-3 w-3 fill-white" /> Premium
              </Badge>
            </div>
          )}

          <div className="absolute left-2 top-2">
            <Badge
              variant="outline"
              className={cn(
                "capitalize backdrop-blur-md transition-colors border",
                post.category.toLowerCase() === "snacks" &&
                  "bg-cyan-950/80 text-cyan-300 border-cyan-700/50 shadow-[0_0_8px_rgba(0,224,255,0.3)]",
                post.category.toLowerCase() === "meals" &&
                  "bg-violet-950/80 text-violet-300 border-violet-700/50 shadow-[0_0_8px_rgba(139,92,246,0.3)]",
                post.category.toLowerCase() === "sweets" &&
                  "bg-rose-950/80 text-rose-300 border-rose-700/50 shadow-[0_0_8px_rgba(244,63,94,0.3)]",
                post.category.toLowerCase() === "drinks" &&
                  "bg-emerald-950/80 text-emerald-300 border-emerald-700/50 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
              )}
            >
              {post.category.toLowerCase()}
            </Badge>
          </div>
        </div>

        <CardHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <Link
              href={`/posts/${post.id}`}
              className="group-hover:text-cyan-400"
            >
              <h3 className="line-clamp-1 text-lg font-bold transition-colors">
                {post.title}
              </h3>
            </Link>
            <div className="flex items-center">
              <span className="rounded-sm bg-amber-950/80 border border-amber-600/30 px-2 py-0.5 text-xs font-semibold text-amber-300">
                {formatPriceRange()}
              </span>
            </div>
          </div>
          {post.location && (
            <div className="mt-1 flex items-center text-xs text-cyan-400/70">
              <MapPin className="mr-1 h-3 w-3 text-cyan-500/70" />
              <span className="line-clamp-1">{post.location}</span>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-4 pt-2">
          {isPostPremium && !isPremium ? (
            <div className="flex flex-col items-center justify-center py-3 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mb-2 rounded-sm border border-amber-500/50 bg-amber-950/30 p-2 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              >
                <Lock className="h-5 w-5" />
              </motion.div>
              <p className="text-sm text-cyan-300/80">Premium content</p>
              <Link href="/pricing">
                <Button
                  variant="link"
                  size="sm"
                  className="mt-1 h-auto p-0 text-amber-400 hover:text-amber-300"
                >
                  Upgrade to view
                </Button>
              </Link>
            </div>
          ) : (
            <p className="line-clamp-2 text-sm text-cyan-100/70">
              {post.description}
            </p>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-cyan-900/30 bg-slate-900/50 p-4 transition-colors">
          {/* Engagement metrics with consistent spacing */}
          <div className="flex items-center gap-4 text-sm text-cyan-400/80">
            <div className="flex items-center gap-1.5">
              <ThumbsUp className="h-4 w-4 text-cyan-500/70" />
              <span>{post.upvotes}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-cyan-500/70" />
              <span>{post.reviewCount}</span>
            </div>
          </div>

          {/* Star rating with proper alignment */}
          <div className="flex items-center">
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4 transition-colors",
                      i < Math.round(post.averageRating)
                        ? "fill-amber-500 text-amber-500"
                        : "text-slate-700"
                    )}
                  />
                ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
