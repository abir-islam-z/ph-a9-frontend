"use server";

import { signIn } from "@/auth";
import { fetchApi } from "@/lib/api-client";
import AppException from "@/lib/exception";
import { HttpStatusCode } from "axios";
import { AuthError } from "next-auth";

type RegisterResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    id: string;
    name: string;
    email: string;
  };
};

export const registerWithCredentials = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = (await fetchApi("auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })) as unknown as Promise<RegisterResponse>;

  return response;
};

export async function register(formData: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    // Register the user first
    const registerResponse = await registerWithCredentials(formData);

    // If registration is successful, automatically sign in
    if (registerResponse) {
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirectTo: "/profile",
      });
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      throw new AppException(error.message, HttpStatusCode.BadRequest);
    }
    throw error;
  }
}
