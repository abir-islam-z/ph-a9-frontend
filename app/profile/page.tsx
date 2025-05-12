"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import useSWR, { mutate } from "swr"
import { fetchApi } from "@/lib/api-client"
import type { ApiResponse, User, Subscription } from "@/types/api"

// Fetcher function for SWR
const fetcher = (url: string) => fetchApi(url)

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Fetch user profile data
  const { data: profileData, error: profileError } = useSWR<ApiResponse<User>>(
    status === "authenticated" ? "/users/profile" : null,
    fetcher,
  )

  // Fetch user subscription data
  const { data: subscriptionData } = useSWR<ApiResponse<Subscription>>(
    status === "authenticated" ? "/subscription/me" : null,
    fetcher,
  )

  // Form state
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")

  // Initialize form with profile data
  useEffect(() => {
    if (profileData?.data) {
      setName(profileData.data.name || "")
      setBio(profileData.data.bio || "")
    }
  }, [profileData])

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (status === "unauthenticated") {
    redirect("/auth/login?callbackUrl=/profile")
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetchApi("/users/profile", {
        method: "PATCH",
        body: JSON.stringify({
          name,
          bio,
        }),
      })

      if (response.success) {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        })

        // Refresh profile data
        mutate("/users/profile")
      } else {
        toast({
          variant: "destructive",
          title: "Failed to update profile",
          description: response.message || "Please try again later.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update profile",
        description: "Please try again later.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Your Profile</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <form onSubmit={handleUpdateProfile}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={profileData?.data?.email || session?.user?.email || ""} disabled />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Account Type</Label>
              <div className="rounded-md bg-muted p-3">
                <p className="font-medium capitalize">{session?.user?.role}</p>
                {session?.user?.role !== "PREMIUM" && session?.user?.role !== "ADMIN" && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    <a href="/premium" className="text-primary hover:underline">
                      Upgrade to Premium
                    </a>{" "}
                    to access exclusive content.
                  </p>
                )}
              </div>
            </div>

            {subscriptionData?.data && (
              <div className="space-y-2">
                <Label>Subscription</Label>
                <div className="rounded-md bg-muted p-3">
                  <p className="font-medium">{subscriptionData.data.plan.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {subscriptionData.data.isActive ? "Active" : "Inactive"} • Expires on{" "}
                    {new Date(subscriptionData.data.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Password</Label>
              <div className="flex items-center justify-between rounded-md bg-muted p-3">
                <p className="text-sm text-muted-foreground">Change your password</p>
                <Button variant="outline" size="sm" onClick={() => redirect("/auth/change-password")}>
                  Change
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
