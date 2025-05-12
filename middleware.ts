import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || "your-default-secret-do-not-use-in-production",
  })

  // Admin routes protection
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  // Premium routes protection
  if (request.nextUrl.pathname.startsWith("/premium-spots")) {
    if (!token || (token.role !== "premium" && token.role !== "admin")) {
      return NextResponse.redirect(new URL("/premium", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/premium-spots/:path*"],
}
