import { fetchApi, fetchFormData } from "@/lib/api-client";
import type {
  ApiResponse,
  PaginatedResponse,
  UpdateProfileRequest,
  User,
} from "@/types/api";

export const userService = {
  // Get user profile
  async getUserProfile(): Promise<ApiResponse<User>> {
    return fetchApi<ApiResponse<User>>("/users/profile");
  },

  // Update user profile
  async updateUserProfile(
    data: UpdateProfileRequest
  ): Promise<ApiResponse<User>> {
    if (data.profilePicture instanceof File) {
      // Use form data for file uploads
      const formData = new FormData();

      if (data.name) formData.append("name", data.name);
      if (data.bio) formData.append("bio", data.bio);
      if (data.profilePicture)
        formData.append("profilePicture", data.profilePicture);

      return fetchFormData<ApiResponse<User>>(
        "/users/profile",
        formData,
        "PATCH"
      );
    }

    return fetchApi<ApiResponse<User>>("/users/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  // Get all users (admin only)
  async getAllUsers(
    params: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    } = {}
  ): Promise<PaginatedResponse<User[]>> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const queryString = queryParams.toString();
    const endpoint = `/users${queryString ? `?${queryString}` : ""}`;

    return fetchApi<PaginatedResponse<User[]>>(endpoint);
  },

  // Get user by ID (admin only)
  async getUserById(id: string): Promise<ApiResponse<User>> {
    return fetchApi<ApiResponse<User>>(`/users/${id}`);
  },

  // Update user (admin only)
  async updateUser(
    id: string,
    data: {
      status?: "ACTIVE" | "INACTIVE" | "BLOCKED";
    }
  ): Promise<ApiResponse<User>> {
    return fetchApi<ApiResponse<User>>(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  // Update user premium status (admin only)
  async updatePremiumStatus(
    id: string,
    data: {
      isPremium: boolean;
      subscriptionDuration?: number;
    }
  ): Promise<ApiResponse<User>> {
    return fetchApi<ApiResponse<User>>(`/users/${id}/premium-status`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};
