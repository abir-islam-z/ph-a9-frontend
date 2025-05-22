import { useApiGet, useApiPatch } from "./use-api"
import type { ApiResponse, PaginatedResponse, User, UpdateProfileRequest } from "@/types/api"

// Hook for getting user profile
export function useUserProfile() {
  return useApiGet<ApiResponse<User>>("/users/profile")
}

// Hook for updating user profile
export function useUpdateProfile() {
  return useApiPatch<ApiResponse<User>, UpdateProfileRequest>("/users/profile")
}

// Hook for getting all users (admin only)
export function useAllUsers(
  params: {
    page?: number
    limit?: number
  } = {},
) {
  const queryParams = new URLSearchParams()

  if (params.page) queryParams.append("page", params.page.toString())
  if (params.limit) queryParams.append("limit", params.limit.toString())

  const queryString = queryParams.toString()
  const url = `/users${queryString ? `?${queryString}` : ""}`

  return useApiGet<PaginatedResponse<User[]>>(url)
}
