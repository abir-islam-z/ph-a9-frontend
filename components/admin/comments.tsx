"use client"

import { useEffect, useState, useRef } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchAllComments, deleteComment } from "@/redux/slices/adminSlice"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function AdminComments() {
  const dispatch = useAppDispatch()
  const { comments, commentsStatus, commentsError } = useAppSelector((state) => state.admin)
  const hasFetchedRef = useRef(false)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null)

  useEffect(() => {
    // Only fetch once on component mount
    if (!hasFetchedRef.current) {
      dispatch(fetchAllComments())
      hasFetchedRef.current = true
    }
  }, [dispatch])

  const openDeleteDialog = (commentId: string) => {
    setSelectedCommentId(commentId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteComment = () => {
    if (selectedCommentId) {
      dispatch(deleteComment(selectedCommentId))
      setDeleteDialogOpen(false)
    }
  }

  if (commentsStatus === "loading" && comments.length === 0) {
    return <AdminCommentsSkeleton />
  }

  if (commentsStatus === "failed") {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{commentsError || "Failed to load comments. Please try again."}</AlertDescription>
      </Alert>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No comments</h3>
        <p className="text-muted-foreground">There are no comments to moderate</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">{comment.author.name}</div>
              <div className="text-sm text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="text-sm text-muted-foreground">On post: {comment.post.title}</div>
          </CardHeader>
          <CardContent className="p-4 py-2">
            <p>{comment.content}</p>
          </CardContent>
          <CardFooter className="p-4 pt-2 flex justify-end">
            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => openDeleteDialog(comment.id)}>
              <Trash2 className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
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
              onClick={handleDeleteComment}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function AdminCommentsSkeleton() {
  return (
    <div className="space-y-4">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Card key={i}>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-[120px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent className="p-4 py-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
            <CardFooter className="p-4 pt-2 flex justify-end">
              <Skeleton className="h-8 w-[80px]" />
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}
