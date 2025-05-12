import { fetchApi } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse, Review, CreateReviewRequest } from "@/types/api"

export const reviewService = {
  // Get all reviews with pagination
  async getAllReviews(
    params: {
      page?: number
      limit?: number
    } = {},
  ): Promise<PaginatedResponse<Review[]>> {
    const queryParams = new URLSearchParams()

    if (params.page) queryParams.append("page", params.page.toString())
    if (params.limit) queryParams.append("limit", params.limit.toString())

    const queryString = queryParams.toString()
    const endpoint = `/reviews${queryString ? `?${queryString}` : ""}`

    return fetchApi<PaginatedResponse<Review[]>>(endpoint)
  },

  // Get reviews by food spot ID
  async getReviewsByFoodSpotId(
    foodSpotId: string,
    params: {
      page?: number
      limit?: number
    } = {},
  ): Promise<PaginatedResponse<Review[]>> {
    const queryParams = new URLSearchParams()

    if (params.page) queryParams.append("page", params.page.toString())
    if (params.limit) queryParams.append("limit", params.limit.toString())

    const queryString = queryParams.toString()
    const endpoint = `/reviews/foodspot/${foodSpotId}${queryString ? `?${queryString}` : ""}`

    return fetchApi<PaginatedResponse<Review[]>>(endpoint)
  },

  // Create review
  async createReview(data: CreateReviewRequest): Promise<ApiResponse<Review>> {
    return fetchApi<ApiResponse<Review>>("/reviews", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  // Delete review
  async deleteReview(id: string): Promise<ApiResponse<null>> {
    return fetchApi<ApiResponse<null>>(`/reviews/${id}`, {
      method: "DELETE",
    })
  },
}
