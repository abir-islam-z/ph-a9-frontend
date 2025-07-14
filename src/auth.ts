import { HttpStatusCode } from "axios";
import { jwtDecode } from "jwt-decode";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginWithCredentials } from "./app/actions/login.action";
import { authConfig } from "./auth.config";
import AppException from "./lib/exception";
import { getErrorMessage } from "./lib/getErrorMessage";
import { loginSchema } from "./schemas/login.schema";
import { JwtDecoded } from "./types/jwtDecode.type";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials): Promise<User | null> {
        try {
          const { email, password } = loginSchema.parse(credentials);
          const response = await loginWithCredentials({ email, password });
          const jwtDecoded: JwtDecoded = jwtDecode(response.data?.accessToken);

          const user: User = {
            id: jwtDecoded.userId,
            name: jwtDecoded.name,
            email: jwtDecoded.email,
            role: jwtDecoded.role,
            accessToken: response.data?.accessToken,
            refreshToken: response.data?.refreshToken,
          };

          if (user && user.accessToken) return user;

          return null;
        } catch (error) {
          throw new AppException(
            getErrorMessage(error),
            HttpStatusCode.BadRequest
          );
        }
      },
    }),
  ],
});
