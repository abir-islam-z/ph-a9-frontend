import { JwtDecoded } from "@/types/jwtDecode.type";
import { jwtDecode } from "jwt-decode";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

// Define the NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Call the API to authenticate the user
          const response = await fetch(
            "https://street-food-phi.vercel.app/api/v1/auth/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

          if (response.ok && data.success) {
            const { token } = data.data;
            const cookieStore = await cookies();
            const refreshToken = cookieStore.get("refreshToken")?.value;

            console.log("Token:", token);
            console.log("Refresh Token:", refreshToken);

            const decoded = jwtDecode(token) as JwtDecoded;

            // Return the user with tokens
            return {
              id: decoded?.userId,
              name: decoded.name,
              email: decoded.email,
              role: decoded.role,
              accessToken: token,
              refreshToken: refreshToken,
            };
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1 hour
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, try to refresh it
      try {
        const response = await fetch(
          "https://street-food-phi.vercel.app/api/v1/auth/refresh-token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.refreshToken}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok && data.success) {
          return {
            ...token,
            accessToken: data.data.accessToken,
            accessTokenExpires: Date.now() + 60 * 60 * 1000, // 1 hour
          };
        }

        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      } catch (error) {
        console.error("Error refreshing access token:", error);
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

// Create the handler using the authOptions
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
