"use client"

import { useEffect, useState, useRef } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchAdminPosts, updatePostStatus } from "@/redux/slices/adminSlice"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Check, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function AdminPendingPosts() {
  const dispatch = useAppDispatch()
  const { posts, status, error } = useAppSelector((state) => state.admin)
  const pendingPosts = posts.filter((post) => post.status === "pending")
  const hasFetchedRef = useRef(false)

  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")

  useEffect(() => {
    // Only fetch once on component mount
    if (!hasFetchedRef.current) {
      dispatch(fetchAdminPosts())
      hasFetchedRef.current = true
    }
  }, [dispatch])

  const handleApprove = (postId: string) => {
    dispatch(
      updatePostStatus({
        postId,
        status: "approved",
      }),
    )
  }

  const openRejectDialog = (postId: string) => {
    setSelectedPostId(postId)
    setRejectionReason("")
    setRejectDialogOpen(true)
  }

  const handleReject = () => {
    if (selectedPostId) {
      dispatch(
        updatePostStatus({
          postId: selectedPostId,
          status: "rejected",
          reason: rejectionReason.trim() || "Does not meet our guidelines",
        }),
      )
      setRejectDialogOpen(false)
    }
  }

  if (status === "loading" && pendingPosts.length === 0) {
    return <AdminPostsSkeleton />
  }

  if (status === "failed") {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error || "Failed to load posts. Please try again."}</AlertDescription>
      </Alert>
    )
  }

  if (pendingPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No pending posts</h3>
        <p className="text-muted-foreground">All posts have been reviewed</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {pendingPosts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{post.title}</CardTitle>
              <Badge>Pending</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
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
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => openRejectDialog(post.id)}>
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button onClick={() => handleApprove(post.id)}>
              <Check className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Post</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this post. This will be visible to the user.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Reason for rejection..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
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
            <CardFooter className="flex justify-end gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}
