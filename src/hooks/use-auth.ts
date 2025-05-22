"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useAuth({
  required = false,
  role = null,
  redirectTo = "/auth/login",
}: {
  required?: boolean
  role?: "user" | "premium" | "admin" | null
  redirectTo?: string
} = {}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const isLoading = status === "loading"
  const isAuthenticated = status === "authenticated"

  useEffect(() => {
    if (!isLoading) {
      // If authentication is required and the user is not logged in
      if (required && !isAuthenticated) {
        router.push(redirectTo)
      }

      // If a specific role is required
      if (role && isAuthenticated && session?.user?.role !== role) {
        if (role === "premium" && session?.user?.role === "admin") {
          // Admin can access premium content
        } else {
          router.push(redirectTo)
        }
      }
    }
  }, [isLoading, isAuthenticated, required, role, redirectTo, router, session])

  return {
    session,
    status,
    isLoading,
    isAuthenticated,
    isAdmin: isAuthenticated && session?.user?.role === "admin",
    isPremium: isAuthenticated && (session?.user?.role === "premium" || session?.user?.role === "admin"),
  }
}
