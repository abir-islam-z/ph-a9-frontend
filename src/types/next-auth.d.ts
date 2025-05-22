// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    user: User;
    accessToken?: string;
  }

  interface JWT {
    id?: string;
    role?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}
