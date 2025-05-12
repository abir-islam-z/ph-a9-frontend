"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PremiumPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (status === "unauthenticated") {
    redirect("/auth/login?callbackUrl=/premium")
  }

  const isPremium = session?.user?.role === "premium"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">Premium Membership</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Upgrade to premium to unlock exclusive food spots and enhanced features
        </p>
      </div>

      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Premium Membership</CardTitle>
            <CardDescription>Unlock all premium features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Access to premium food spots</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Early access to new features</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Ad-free experience</span>
              </div>
              <div className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Priority support</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <span className="text-3xl font-bold">$9.99</span>
              <span className="text-muted-foreground"> / month</span>
            </div>
          </CardContent>
          <CardFooter>
            {isPremium ? (
              <Button className="w-full" variant="outline" disabled>
                You are a Premium Member
              </Button>
            ) : (
              <Button className="w-full">Upgrade to Premium</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
