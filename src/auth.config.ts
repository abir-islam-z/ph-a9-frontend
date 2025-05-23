import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 days
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn =
        !!auth?.user?.accessToken && auth?.user?.role === "admin";
      return isLoggedIn;
    },

    async jwt({ token, user }) {
      console.log("JWT callback", { token, user });
      return { ...token, ...user };
    },
    async session({ session, token }) {
      console.log("Session callback", { session, token });
      session.user = token as any;
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
