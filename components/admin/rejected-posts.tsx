"use client"

import { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchAdminPosts } from "@/redux/slices/adminSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AdminRejectedPosts() {
  const dispatch = useAppDispatch()
  const { posts, status, error } = useAppSelector((state) => state.admin)
  const rejectedPosts = posts.filter((post) => post.status === "rejected")
  const hasFetchedRef = useRef(false)

  useEffect(() => {
    // Only fetch once on component mount
    if (!hasFetchedRef.current) {
      dispatch(fetchAdminPosts())
      hasFetchedRef.current = true
    }
  }, [dispatch])

  if (status === "loading" && rejectedPosts.length === 0) {
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

  if (rejectedPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No rejected posts</h3>
        <p className="text-muted-foreground">Rejected posts will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {rejectedPosts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{post.title}</CardTitle>
              <Badge variant="outline" className="bg-red-100">
                Rejected
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

                <div className="mt-4">
                  <h4 className="text-sm font-medium">Rejection Reason:</h4>
                  <p className="text-sm text-red-500">{post.rejectionReason || "No reason provided"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
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
          </Card>
        ))}
    </div>
  )
}
