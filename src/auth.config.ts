import type { NextAuthConfig } from "next-auth";
export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 days
  },
  callbacks: {
    authorized: async ({ auth, request }) => {
      if (auth?.user.accessToken) {
        return true;
      }
      return false;
    },
    session: async ({ session, token, user }) => {
      session.user = token as any;
      return session;
    },
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
