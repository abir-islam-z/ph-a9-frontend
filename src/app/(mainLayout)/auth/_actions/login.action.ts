"use server";

import { signIn, signOut } from "@/auth";
import { fetchApi } from "@/lib/api-client";
import AppException from "@/lib/exception";
import { HttpStatusCode } from "axios";
import { AuthError } from "next-auth";

type LoginResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
};

export const loginWithCredentials = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = (await fetchApi("auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  })) as unknown as Promise<LoginResponse>;

  return response;
};

export async function authenticate(formData: {
  email: string;
  password: string;
}) {
  console.log(formData);
  try {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirectTo: "/profile",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      throw new AppException(error.message, HttpStatusCode.BadRequest);
    }
    throw error;
  }
}

export async function doLogout() {
  await signOut();
}
