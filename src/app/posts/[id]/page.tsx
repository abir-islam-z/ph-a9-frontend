import { Suspense } from "react"
import PostDetail from "@/components/post-detail"
import CommentSection from "@/components/comment-section"
import { Skeleton } from "@/components/ui/skeleton"

export default function PostDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<PostDetailSkeleton />}>
        <PostDetail id={params.id} />
      </Suspense>

      <Suspense fallback={<CommentSectionSkeleton />}>
        <CommentSection postId={params.id} />
      </Suspense>
    </div>
  )
}

function PostDetailSkeleton() {
  return (
    <div className="mb-8 space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-64 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}

function CommentSectionSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <div className="space-y-2">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
      </div>
    </div>
  )
}
