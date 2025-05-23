"use client";

import { loginSchema, TLoginFormValues } from "@/app/auth/login/login.schema";
import EZButton from "@/components/shared/FormBuilder/EZButton";
import { EZForm } from "@/components/shared/FormBuilder/EZForm";
import EZInput from "@/components/shared/FormBuilder/EZInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { authenticate } from "./action";

export default function LoginPage() {
  const defaultValues: TLoginFormValues = {
    email: "",
    password: "",
  };

  async function onSubmit(data: TLoginFormValues) {
    try {
      console.log("Login data", data);
      await authenticate(data);
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="container mx-auto flex max-w-md flex-col space-y-6 px-4 py-8">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to access your account
        </p>
      </div>

      <EZForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={zodResolver(loginSchema)}
      >
        <EZInput
          type="email"
          name="email"
          label="Email"
          placeholder="john@gmail.com"
        />
        <EZInput
          type="password"
          name="password"
          label="Password"
          placeholder="••••••••"
        />
        <EZButton className="w-full">Login</EZButton>
      </EZForm>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="font-medium underline">
          Register
        </Link>
      </div>
    </div>
  );
}
