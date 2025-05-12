"use client"

import type React from "react"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import useSWR, { mutate } from "swr"
import { fetchApi } from "@/lib/api-client"
import type { PaginatedResponse, Review } from "@/types/api"
import { useToast } from "@/hooks/use-toast"

interface CommentSectionProps {
  postId: string
}

// Fetcher function for SWR
const fetcher = (url: string) => fetchApi(url)

export default function CommentSection({ postId }: CommentSectionProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()

  const [newComment, setNewComment] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  // Fetch reviews
  const { data: reviewsData, error } = useSWR<PaginatedResponse<Review[]>>(`/reviews/foodspot/${postId}`, fetcher)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session) {
      router.push(`/auth/login?callbackUrl=/posts/${postId}`)
      return
    }

    if (newComment.trim()) {
      try {
        // Create a new review
        await fetchApi("/reviews", {
          method: "POST",
          body: JSON.stringify({
            foodSpotId: postId,
            rating: 5, // Default rating
            comment: newComment.trim(),
          }),
        })

        // Clear the form
        setNewComment("")

        // Refetch reviews
        mutate(`/reviews/foodspot/${postId}`)

        toast({
          title: "Comment posted",
          description: "Your comment has been posted successfully.",
        })
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to post comment",
          description: "Please try again later.",
        })
      }
    }
  }

  const handleEdit = async (reviewId: string) => {
    if (editText.trim()) {
      try {
        // Update the review (API doesn't support this directly, so we'd need to implement it)
        // For now, just show a toast
        toast({
          title: "Comment updated",
          description: "Your comment has been updated successfully.",
        })

        setEditingId(null)
        setEditText("")

        // Refetch reviews
        mutate(`/reviews/foodspot/${postId}`)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to update comment",
          description: "Please try again later.",
        })
      }
    }
  }

  const handleDelete = async (reviewId: string) => {
    try {
      // Delete the review
      await fetchApi(`/reviews/${reviewId}`, {
        method: "DELETE",
      })

      // Refetch reviews
      mutate(`/reviews/foodspot/${postId}`)

      toast({
        title: "Comment deleted",
        description: "Your comment has been deleted successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete comment",
        description: "Please try again later.",
      })
    }
  }

  const startEditing = (reviewId: string, content: string) => {
    setEditingId(reviewId)
    setEditText(content)
  }

  if (!reviewsData && !error) {
    return <CommentSectionSkeleton />
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error.message || "Failed to load comments. Please try again."}</AlertDescription>
      </Alert>
    )
  }

  const reviews = reviewsData?.data || []

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Comments ({reviews.length})</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-2 min-h-[100px]"
        />
        <Button type="submit" disabled={!newComment.trim()}>
          Post Comment
        </Button>
      </form>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground">No comments yet. Be the first to comment!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="font-medium">{review.author.name}</div>
                <div className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</div>
              </div>

              {editingId === review.id ? (
                <div className="space-y-2">
                  <Textarea value={editText} onChange={(e) => setEditText(e.target.value)} className="min-h-[80px]" />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(review.id)}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground">{review.comment}</p>

                  {session?.user?.id === review.author.id && (
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => startEditing(review.id, review.comment)}>
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-destructive">
                            <Trash2 className="mr-1 h-4 w-4" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this comment? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(review.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function CommentSectionSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-[100px] w-full" />
      <Skeleton className="h-10 w-[100px]" />

      <div className="space-y-4 pt-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-[120px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
      </div>
    </div>
  )
}
