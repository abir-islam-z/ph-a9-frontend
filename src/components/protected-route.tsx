"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "USER" | "PREMIUM" | "ADMIN";
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/auth/login",
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (!isLoading) {
      // If user is not authenticated, redirect to login
      if (!isAuthenticated) {
        router.push(
          `${redirectTo}?callbackUrl=${encodeURIComponent(
            window.location.pathname
          )}`
        );
        return;
      }

      // If a specific role is required
      if (requiredRole && session?.user?.role !== requiredRole) {
        // Special case: admin can access premium content
        if (requiredRole === "PREMIUM" && session?.user?.role === "ADMIN") {
          return;
        }

        router.push(redirectTo);
      }
    }
  }, [isLoading, isAuthenticated, requiredRole, redirectTo, router, session]);

  // Show loading state while checking authentication
  if (isLoading || !isAuthenticated) {
    return <div className="container mx-auto p-8 text-center">Loading...</div>;
  }

  // If role is required and user doesn't have it (except admin for premium content)
  if (
    requiredRole &&
    session?.user?.role !== requiredRole &&
    !(requiredRole === "PREMIUM" && session?.user?.role === "ADMIN")
  ) {
    return null;
  }

  // User is authenticated and has the required role
  return <>{children}</>;
}
