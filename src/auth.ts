import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginWithCredentials } from "./app/auth/login/action";
import { loginSchema } from "./app/auth/login/login.schema";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials): Promise<any> {
        try {
          const { email, password } = loginSchema.parse(credentials);
          const user = await loginWithCredentials({ email, password });

          if (user && user.data?.accessToken) return user.data;

          return null;
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
});
