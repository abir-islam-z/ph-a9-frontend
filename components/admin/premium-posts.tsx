"use client"

import { useEffect, useState, useRef } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchAdminPosts, updatePostStatus } from "@/redux/slices/adminSlice"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function AdminPremiumPosts() {
  const dispatch = useAppDispatch()
  const { posts, status, error } = useAppSelector((state) => state.admin)
  const premiumPosts = posts.filter((post) => post.isPremium)
  const hasFetchedRef = useRef(false)

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)

  useEffect(() => {
    // Only fetch once on component mount
    if (!hasFetchedRef.current) {
      dispatch(fetchAdminPosts())
      hasFetchedRef.current = true
    }
  }, [dispatch])

  const openRemoveDialog = (postId: string) => {
    setSelectedPostId(postId)
    setRemoveDialogOpen(true)
  }

  const handleRemovePremium = () => {
    if (selectedPostId) {
      dispatch(
        updatePostStatus({
          postId: selectedPostId,
          isPremium: false,
        }),
      )
      setRemoveDialogOpen(false)
    }
  }

  if (status === "loading" && premiumPosts.length === 0) {
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

  if (premiumPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No premium posts</h3>
        <p className="text-muted-foreground">Premium posts will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {premiumPosts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{post.title}</CardTitle>
              <Badge className="bg-yellow-100 text-yellow-800">
                <Star className="mr-1 h-3 w-3" /> Premium
              </Badge>
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
          <CardFooter className="flex justify-end">
            <Button variant="outline" onClick={() => openRemoveDialog(post.id)}>
              Remove Premium Status
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Dialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Premium Status</DialogTitle>
            <DialogDescription>
              This will make the post visible to all users. Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemoveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRemovePremium}>Remove Premium Status</Button>
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
            <CardFooter className="flex justify-end">
              <Skeleton className="h-9 w-36" />
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}
