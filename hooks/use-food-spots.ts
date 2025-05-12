import { useApiGet, useApiPost, useApiPatch, useApiDelete } from "./use-api"
import type {
  ApiResponse,
  PaginatedResponse,
  FoodSpot,
  CreateFoodSpotRequest,
  UpdateFoodSpotRequest,
} from "@/types/api"
import { fetchFormData } from "@/lib/api-client"

// Hook for getting all food spots
export function useFoodSpots(
  params: {
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: "asc" | "desc"
    search?: string
    category?: string
    minPrice?: number
    maxPrice?: number
  } = {},
) {
  const queryParams = new URLSearchParams()

  if (params.page) queryParams.append("page", params.page.toString())
  if (params.limit) queryParams.append("limit", params.limit.toString())
  if (params.sortBy) queryParams.append("sortBy", params.sortBy)
  if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder)
  if (params.search) queryParams.append("search", params.search)
  if (params.category) queryParams.append("category", params.category)
  if (params.minPrice) queryParams.append("minPrice", params.minPrice.toString())
  if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice.toString())

  const queryString = queryParams.toString()
  const url = `/foodspots${queryString ? `?${queryString}` : ""}`

  return useApiGet<PaginatedResponse<FoodSpot[]>>(url)
}

// Hook for getting a food spot by ID
export function useFoodSpot(id: string | null) {
  return useApiGet<ApiResponse<FoodSpot>>(id ? `/foodspots/${id}` : null)
}

// Hook for creating a food spot
export function useCreateFoodSpot() {
  const { trigger, ...rest } = useApiPost<ApiResponse<FoodSpot>, CreateFoodSpotRequest>("/foodspots")

  const createFoodSpot = async (data: CreateFoodSpotRequest) => {
    const formData = new FormData()

    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("location", data.location)
    formData.append("minPrice", data.minPrice.toString())
    formData.append("maxPrice", data.maxPrice.toString())
    formData.append("category", data.category)

    if (data.image) {
      formData.append("image", data.image)
    }

    return fetchFormData<ApiResponse<FoodSpot>>("/foodspots", formData)
  }

  return { createFoodSpot, ...rest }
}

// Hook for updating a food spot
export function useUpdateFoodSpot(id: string) {
  return useApiPatch<ApiResponse<FoodSpot>, UpdateFoodSpotRequest>(`/foodspots/${id}`)
}

// Hook for deleting a food spot
export function useDeleteFoodSpot(id: string) {
  return useApiDelete<ApiResponse<null>>(`/foodspots/${id}`)
}
