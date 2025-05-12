import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ThumbsUp, MessageSquare, Lock } from "lucide-react"
import type { FoodSpot } from "@/types/api"

interface FoodPostCardProps {
  post: FoodSpot
}

export default function FoodPostCard({ post }: FoodPostCardProps) {
  const { data: session } = useSession()
  const isPremium = session?.user?.role === "premium" || session?.user?.role === "admin"
  const isPostPremium = post.isPremium

  // Format price range
  const formatPriceRange = () => {
    if (post.minPrice === post.maxPrice) {
      return `$${post.minPrice}`
    }
    return `$${post.minPrice} - $${post.maxPrice}`
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Link href={`/posts/${post.id}`}>
          <div className="aspect-video w-full overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg?height=225&width=400"}
              alt={post.title}
              width={400}
              height={225}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>

        {isPostPremium && (
          <div className="absolute right-2 top-2">
            <Badge variant="secondary" className="bg-yellow-500 text-white hover:bg-yellow-600">
              <Star className="mr-1 h-3 w-3" /> Premium
            </Badge>
          </div>
        )}

        <div className="absolute left-2 top-2">
          <Badge variant="secondary" className="capitalize">
            {post.category.toLowerCase()}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <Link href={`/posts/${post.id}`} className="hover:underline">
            <h3 className="line-clamp-1 text-lg font-bold">{post.title}</h3>
          </Link>
          <div className="flex items-center">
            <span className="text-sm font-medium">{formatPriceRange()}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        {isPostPremium && !isPremium ? (
          <div className="flex flex-col items-center justify-center py-2 text-center">
            <Lock className="mb-2 h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">This is premium content</p>
            <Link href="/premium">
              <Button variant="link" size="sm" className="mt-1 h-auto p-0">
                Upgrade to view
              </Button>
            </Link>
          </div>
        ) : (
          <p className="line-clamp-2 text-sm text-muted-foreground">{post.description}</p>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <ThumbsUp className="mr-1 h-4 w-4" />
            <span>{post.upvotes}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="mr-1 h-4 w-4" />
            <span>{post.reviewCount}</span>
          </div>
        </div>

        <div className="flex items-center">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(post.averageRating) ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
              />
            ))}
        </div>
      </CardFooter>
    </Card>
  )
}
