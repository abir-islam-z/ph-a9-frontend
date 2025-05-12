import { fetchApi, fetchFormData } from "@/lib/api-client"
import type {
  ApiResponse,
  PaginatedResponse,
  FoodSpot,
  CreateFoodSpotRequest,
  UpdateFoodSpotRequest,
} from "@/types/api"

export const foodSpotService = {
  // Get all food spots with filtering and pagination
  async getAllFoodSpots(
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
  ): Promise<PaginatedResponse<FoodSpot[]>> {
    const queryParams = new URLSearchParams()

    // Add query parameters if they exist
    if (params.page) queryParams.append("page", params.page.toString())
    if (params.limit) queryParams.append("limit", params.limit.toString())
    if (params.sortBy) queryParams.append("sortBy", params.sortBy)
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder)
    if (params.search) queryParams.append("search", params.search)
    if (params.category) queryParams.append("category", params.category)
    if (params.minPrice) queryParams.append("minPrice", params.minPrice.toString())
    if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice.toString())

    const queryString = queryParams.toString()
    const endpoint = `/foodspots${queryString ? `?${queryString}` : ""}`

    return fetchApi<PaginatedResponse<FoodSpot[]>>(endpoint)
  },

  // Get food spot by ID
  async getFoodSpotById(id: string): Promise<ApiResponse<FoodSpot>> {
    return fetchApi<ApiResponse<FoodSpot>>(`/foodspots/${id}`)
  },

  // Create food spot
  async createFoodSpot(data: CreateFoodSpotRequest): Promise<ApiResponse<FoodSpot>> {
    const formData = new FormData()

    // Add form data fields
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("location", data.location)
    formData.append("minPrice", data.minPrice.toString())
    formData.append("maxPrice", data.maxPrice.toString())
    formData.append("category", data.category)

    // Add image if it exists
    if (data.image) {
      formData.append("image", data.image)
    }

    return fetchFormData<ApiResponse<FoodSpot>>("/foodspots", formData)
  },

  // Update food spot
  async updateFoodSpot(id: string, data: UpdateFoodSpotRequest): Promise<ApiResponse<FoodSpot>> {
    return fetchApi<ApiResponse<FoodSpot>>(`/foodspots/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  },

  // Delete food spot
  async deleteFoodSpot(id: string): Promise<ApiResponse<null>> {
    return fetchApi<ApiResponse<null>>(`/foodspots/${id}`, {
      method: "DELETE",
    })
  },
}
