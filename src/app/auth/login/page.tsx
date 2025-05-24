"use client";

import { loginSchema, TLoginFormValues } from "@/app/auth/login/login.schema";
import EZButton from "@/components/shared/FormBuilder/EZButton";
import { EZForm } from "@/components/shared/FormBuilder/EZForm";
import EZInput from "@/components/shared/FormBuilder/EZInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FadeIn } from "@/components/ui/motion";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChefHat, Lock, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { authenticate } from "./action";

export default function LoginPage() {
  const defaultValues: TLoginFormValues = {
    email: "",
    password: "",
  };

  // Create state for form values that we can update with the demo credentials
  const [formValues, setFormValues] = React.useState(defaultValues);
  // Add loading states for each demo button
  const [loadingState, setLoadingState] = React.useState<{
    user: boolean;
    premium: boolean;
    admin: boolean;
  }>({ user: false, premium: false, admin: false });

  async function onSubmit(data: TLoginFormValues) {
    try {
      console.log("Login data", data);
      await authenticate(data);
    } catch (error) {
      throw error;
    }
  }

  const handleDemoLogin = async (type: "user" | "premium" | "admin") => {
    // Set loading state for the specific button
    setLoadingState((prev) => ({ ...prev, [type]: true }));

    // Set form values and submit automatically
    const credentials = {
      email: `${type}@example.com`,
      password: "Password123!",
    };

    // Update form values first
    setFormValues(credentials);

    // Then immediately authenticate with the credentials
    try {
      await authenticate(credentials);
    } catch (error) {
      console.error(`Demo login error for ${type}:`, error);
      // Reset loading state on error
      setLoadingState((prev) => ({ ...prev, [type]: false }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn from="bottom" delay={0.2} className="max-w-md mx-auto">
        <Card className="border-2 cyber-border border-muted bg-card/50 backdrop-blur-sm shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-primary p-2 text-primary-foreground">
                <ChefHat className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to your Street Food Finder account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <EZForm
              onSubmit={onSubmit}
              defaultValues={formValues}
              resolver={zodResolver(loginSchema)}
              key={formValues.email} // Add key to force re-render when demo values change
            >
              <div className="space-y-2">
                <EZInput
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="your.email@example.com"
                  className="relative"
                />
                <EZInput
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="••••••••"
                  className="relative"
                />
              </div>
              {/* We don't need this notification anymore since login happens automatically */}
              <div className="pt-2">
                <EZButton className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Sign In
                </EZButton>
              </div>
            </EZForm>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-2 text-xs text-muted-foreground">
                  OR TRY DEMO ACCOUNTS
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="bg-muted/50 border-primary/20 hover:bg-primary/10 flex items-center justify-center gap-2"
                onClick={() => handleDemoLogin("user")}
                title="Logs in as user@example.com / Password123!"
                disabled={
                  loadingState.user ||
                  loadingState.premium ||
                  loadingState.admin
                }
              >
                {loadingState.user ? (
                  <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin mr-2" />
                ) : (
                  <User size={16} className="text-primary" />
                )}
                <span>Regular User Demo</span>
              </Button>

              <Button
                variant="outline"
                className="bg-muted/50 border-secondary/20 hover:bg-secondary/10 flex items-center justify-center gap-2"
                onClick={() => handleDemoLogin("premium")}
                title="Logs in as premium@example.com / Password123!"
                disabled={
                  loadingState.user ||
                  loadingState.premium ||
                  loadingState.admin
                }
              >
                {loadingState.premium ? (
                  <div className="h-4 w-4 rounded-full border-2 border-secondary border-t-transparent animate-spin mr-2" />
                ) : (
                  <ChefHat size={16} className="text-secondary" />
                )}
                <span>Premium User Demo</span>
              </Button>

              <Button
                variant="outline"
                className="bg-muted/50 border-accent/20 hover:bg-accent/10 flex items-center justify-center gap-2"
                onClick={() => handleDemoLogin("admin")}
                title="Logs in as admin@example.com / Password123!"
                disabled={
                  loadingState.user ||
                  loadingState.premium ||
                  loadingState.admin
                }
              >
                {loadingState.admin ? (
                  <div className="h-4 w-4 rounded-full border-2 border-accent border-t-transparent animate-spin mr-2" />
                ) : (
                  <Lock size={16} className="text-accent" />
                )}
                <span>Admin User Demo</span>
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 text-center text-sm">
            <div>
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-primary hover:underline font-medium"
              >
                Register
              </Link>
            </div>
            <div>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground hover:underline text-xs"
              >
                Back to homepage
              </Link>
            </div>
          </CardFooter>
        </Card>
      </FadeIn>
    </div>
  );
}
