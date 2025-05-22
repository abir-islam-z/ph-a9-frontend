"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam) {
      switch (errorParam) {
        case "Configuration":
          setError("There is a problem with the server configuration.")
          break
        case "AccessDenied":
          setError("You do not have access to this resource.")
          break
        case "Verification":
          setError("The verification link may have been used or is invalid.")
          break
        case "CredentialsSignin":
          setError("The email or password you entered is incorrect.")
          break
        default:
          setError("An unexpected error occurred.")
          break
      }
    }
  }, [searchParams])

  return (
    <div className="container mx-auto flex max-w-md flex-col space-y-6 px-4 py-8">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-bold">Authentication Error</h1>
        <p className="text-sm text-muted-foreground">There was a problem signing you in.</p>
      </div>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error || "An unexpected authentication error occurred."}</AlertDescription>
      </Alert>

      <div className="flex flex-col space-y-4">
        <Link href="/auth/login">
          <Button className="w-full">Try Again</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="w-full">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
