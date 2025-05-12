export interface JwtDecoded {
  userId: string;
  role: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}
