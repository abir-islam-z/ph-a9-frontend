import { useApiGet, useApiPost, useApiDelete } from "./use-api"
import type { ApiResponse, PaginatedResponse, Review, CreateReviewRequest } from "@/types/api"

// Hook for getting all reviews
export function useReviews(
  params: {
    page?: number
    limit?: number
  } = {},
) {
  const queryParams = new URLSearchParams()

  if (params.page) queryParams.append("page", params.page.toString())
  if (params.limit) queryParams.append("limit", params.limit.toString())

  const queryString = queryParams.toString()
  const url = `/reviews${queryString ? `?${queryString}` : ""}`

  return useApiGet<PaginatedResponse<Review[]>>(url)
}

// Hook for getting reviews by food spot ID
export function useFoodSpotReviews(
  foodSpotId: string | null,
  params: {
    page?: number
    limit?: number
  } = {},
) {
  const queryParams = new URLSearchParams()

  if (params.page) queryParams.append("page", params.page.toString())
  if (params.limit) queryParams.append("limit", params.limit.toString())

  const queryString = queryParams.toString()
  const url = foodSpotId ? `/reviews/foodspot/${foodSpotId}${queryString ? `?${queryString}` : ""}` : null

  return useApiGet<PaginatedResponse<Review[]>>(url)
}

// Hook for creating a review
export function useCreateReview() {
  return useApiPost<ApiResponse<Review>, CreateReviewRequest>("/reviews")
}

// Hook for deleting a review
export function useDeleteReview(id: string) {
  return useApiDelete<ApiResponse<null>>(`/reviews/${id}`)
}
