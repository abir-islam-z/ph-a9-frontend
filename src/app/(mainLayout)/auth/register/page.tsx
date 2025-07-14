"use client";

import EZButton from "@/components/shared/FormBuilder/EZButton";
import { EZForm } from "@/components/shared/FormBuilder/EZForm";
import EZInput from "@/components/shared/FormBuilder/EZInput";
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
import { User } from "lucide-react";
import Link from "next/link";
import {
  registerSchema,
  TRegisterFormValues,
} from "../../../../schemas/register.schema";
import { register } from "../../../actions/register.action";

export default function RegisterPage() {
  const defaultValues: TRegisterFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  async function onSubmit(data: TRegisterFormValues) {
    try {
      console.log("Register data", data);
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn from="bottom" delay={0.2} className="max-w-md mx-auto">
        <Card className="border-2 cyber-border border-muted bg-card/50 backdrop-blur-sm shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-primary p-2 text-primary-foreground">
                <User className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Join the Street Food Finder community
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <EZForm
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              resolver={zodResolver(registerSchema)}
            >
              <div className="space-y-2">
                <EZInput
                  type="text"
                  name="name"
                  label="Full Name"
                  placeholder="John Doe"
                  className="relative"
                />
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
                <EZInput
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="••••••••"
                  className="relative"
                />
              </div>
              <div className="pt-2">
                <EZButton className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Create Account
                </EZButton>
              </div>
            </EZForm>

            <Separator className="my-4" />

            <div className="flex flex-col items-center space-y-3">
              <p className="text-xs text-muted-foreground">
                By creating an account, you agree to our
              </p>
              <div className="flex gap-2 text-xs">
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                <span className="text-muted-foreground">and</span>
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 text-center text-sm">
            <div>
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-primary hover:underline font-medium"
              >
                Sign In
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
