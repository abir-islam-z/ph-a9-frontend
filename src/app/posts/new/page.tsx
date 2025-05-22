"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import NewPostForm from "@/components/new-post-form"

export default function NewPostPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (status === "unauthenticated") {
    redirect("/auth/login?callbackUrl=/posts/new")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Share a New Food Spot</h1>
      <NewPostForm />
    </div>
  )
}
