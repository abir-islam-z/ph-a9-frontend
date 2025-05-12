import { fetchApi } from "@/lib/api-client";
import type {
  ApiResponse,
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
} from "@/types/api";

export const authService = {
  // Register a new user
  async register(data: RegisterRequest): Promise<ApiResponse<{ user: any }>> {
    return fetchApi<ApiResponse<{ user: any }>>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Login user
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return fetchApi<ApiResponse<LoginResponse>>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Change password
  async changePassword(
    data: ChangePasswordRequest
  ): Promise<ApiResponse<null>> {
    return fetchApi<ApiResponse<null>>("/auth/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Refresh token
  async refreshToken(): Promise<ApiResponse<RefreshTokenResponse>> {
    return fetchApi<ApiResponse<RefreshTokenResponse>>("/auth/refresh-token", {
      method: "POST",
    });
  },
};
