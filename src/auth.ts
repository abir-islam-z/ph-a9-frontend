import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./app/auth/login/login.schema";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = loginSchema.parse(credentials);
        const user = await loginWithCredentials({ email, password });

        return null;
      },
    }),
  ],
});
