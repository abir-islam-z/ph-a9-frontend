import { fetchApi } from "@/lib/api-client";
import type {
  ApiResponse,
  CreateReviewRequest,
  PaginatedResponse,
  Review,
} from "@/types/api";

export const reviewService = {
  // Get all reviews with pagination
  async getAllReviews(
    params: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    } = {}
  ): Promise<PaginatedResponse<Review[]>> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const queryString = queryParams.toString();
    const endpoint = `/reviews${queryString ? `?${queryString}` : ""}`;

    return fetchApi<PaginatedResponse<Review[]>>(endpoint);
  },

  // Get review by ID
  async getReviewById(id: string): Promise<ApiResponse<Review>> {
    return fetchApi<ApiResponse<Review>>(`/reviews/${id}`);
  },

  // Get user reviews
  async getUserReviews(
    params: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    } = {}
  ): Promise<PaginatedResponse<Review[]>> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const queryString = queryParams.toString();
    const endpoint = `/reviews/user${queryString ? `?${queryString}` : ""}`;

    return fetchApi<PaginatedResponse<Review[]>>(endpoint);
  },

  // Get reviews by food spot ID
  async getFoodSpotReviews(
    foodSpotId: string,
    params: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    } = {}
  ): Promise<PaginatedResponse<Review[]>> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const queryString = queryParams.toString();
    const endpoint = `/reviews/foodspot/${foodSpotId}${
      queryString ? `?${queryString}` : ""
    }`;

    return fetchApi<PaginatedResponse<Review[]>>(endpoint);
  },

  // Create review
  async createReview(data: CreateReviewRequest): Promise<ApiResponse<Review>> {
    return fetchApi<ApiResponse<Review>>("/reviews", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Update review
  async updateReview(
    id: string,
    data: { rating?: number; comment?: string }
  ): Promise<ApiResponse<Review>> {
    return fetchApi<ApiResponse<Review>>(`/reviews/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  // Delete review
  async deleteReview(id: string): Promise<ApiResponse<null>> {
    return fetchApi<ApiResponse<null>>(`/reviews/${id}`, {
      method: "DELETE",
    });
  },
};
