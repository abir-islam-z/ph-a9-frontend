import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function requireAuth(redirectTo = "/auth/login") {
  const session = await getSession()

  if (!session) {
    redirect(redirectTo)
  }

  return session
}

export async function requireAdmin(redirectTo = "/auth/login") {
  const session = await getSession()

  if (!session || session.user.role !== "admin") {
    redirect(redirectTo)
  }

  return session
}

export async function requirePremium(redirectTo = "/premium") {
  const session = await getSession()

  if (!session || (session.user.role !== "premium" && session.user.role !== "admin")) {
    redirect(redirectTo)
  }

  return session
}
