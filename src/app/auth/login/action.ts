"use server";

import { fetchApi } from "@/lib/api-client";

export const loginWithCredentials = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetchApi("auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  console.log(response);

  return response;
};
