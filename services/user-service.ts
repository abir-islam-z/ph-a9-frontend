import { fetchApi } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse, User, UpdateProfileRequest } from "@/types/api"

export const userService = {
  // Get user profile
  async getUserProfile(): Promise<ApiResponse<User>> {
    return fetchApi<ApiResponse<User>>("/users/profile")
  },

  // Update user profile
  async updateUserProfile(data: UpdateProfileRequest): Promise<ApiResponse<User>> {
    return fetchApi<ApiResponse<User>>("/users/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  // Get all users (admin only)
  async getAllUsers(
    params: {
      page?: number
      limit?: number
    } = {},
  ): Promise<PaginatedResponse<User[]>> {
    const queryParams = new URLSearchParams()

    if (params.page) queryParams.append("page", params.page.toString())
    if (params.limit) queryParams.append("limit", params.limit.toString())

    const queryString = queryParams.toString()
    const endpoint = `/users${queryString ? `?${queryString}` : ""}`

    return fetchApi<PaginatedResponse<User[]>>(endpoint)
  },
}
