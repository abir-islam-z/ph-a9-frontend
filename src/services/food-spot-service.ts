import { fetchApi, fetchFormData } from "@/lib/api-client";
import type {
  ApiResponse,
  CreateFoodSpotRequest,
  FoodSpot,
  PaginatedResponse,
  UpdateFoodSpotRequest,
} from "@/types/api";

export const foodSpotService = {
  // Get all food spots with filtering and pagination
  async getAllFoodSpots(
    params: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
      searchTerm?: string;
      category?: string;
      priceRange?: string;
      averageRating?: number;
      isFeatured?: boolean;
      isPublished?: boolean;
    } = {}
  ): Promise<PaginatedResponse<FoodSpot[]>> {
    const queryParams = new URLSearchParams();

    // Add query parameters if they exist
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);
    if (params.searchTerm) queryParams.append("searchTerm", params.searchTerm);
    if (params.category) queryParams.append("category", params.category);
    if (params.priceRange) queryParams.append("priceRange", params.priceRange);
    if (params.averageRating)
      queryParams.append("averageRating", params.averageRating.toString());
    if (params.isFeatured)
      queryParams.append("isFeatured", params.isFeatured.toString());
    if (params.isPublished)
      queryParams.append("isPublished", params.isPublished.toString());

    const queryString = queryParams.toString();
    const endpoint = `/foodspots${queryString ? `?${queryString}` : ""}`;

    return fetchApi<PaginatedResponse<FoodSpot[]>>(endpoint);
  },

  // Get user's food spots
  async getUserFoodSpots(
    params: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    } = {}
  ): Promise<PaginatedResponse<FoodSpot[]>> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const queryString = queryParams.toString();
    const endpoint = `/foodspots/user/my-food-spots${
      queryString ? `?${queryString}` : ""
    }`;

    return fetchApi<PaginatedResponse<FoodSpot[]>>(endpoint);
  },

  // Get pending food spots (admin only)
  async getPendingFoodSpots(
    params: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    } = {}
  ): Promise<PaginatedResponse<FoodSpot[]>> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const queryString = queryParams.toString();
    const endpoint = `/foodspots/admin/pending${
      queryString ? `?${queryString}` : ""
    }`;

    return fetchApi<PaginatedResponse<FoodSpot[]>>(endpoint);
  },

  // Get food spot by ID
  async getFoodSpotById(id: string): Promise<ApiResponse<FoodSpot>> {
    return fetchApi<ApiResponse<FoodSpot>>(`/foodspots/${id}`);
  },

  // Create food spot
  async createFoodSpot(
    data: CreateFoodSpotRequest
  ): Promise<ApiResponse<FoodSpot>> {
    const formData = new FormData();

    // Add form data fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("minPrice", data.minPrice.toString());
    formData.append("maxPrice", data.maxPrice.toString());
    formData.append("category", data.category);

    // Add image if it exists
    if (data.image) {
      formData.append("image", data.image);
    }

    return fetchFormData<ApiResponse<FoodSpot>>("/foodspots", formData);
  },

  // Update food spot
  async updateFoodSpot(
    id: string,
    data: UpdateFoodSpotRequest
  ): Promise<ApiResponse<FoodSpot>> {
    return fetchApi<ApiResponse<FoodSpot>>(`/foodspots/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  // Delete food spot
  async deleteFoodSpot(id: string): Promise<ApiResponse<null>> {
    return fetchApi<ApiResponse<null>>(`/foodspots/${id}`, {
      method: "DELETE",
    });
  },

  // Add review to food spot
  async addReview(
    foodSpotId: string,
    data: { rating: number; comment: string }
  ): Promise<ApiResponse<any>> {
    return fetchApi<ApiResponse<any>>(`/foodspots/${foodSpotId}/reviews`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Add vote to food spot
  async addVote(
    foodSpotId: string,
    data: { type: "UPVOTE" | "DOWNVOTE" }
  ): Promise<ApiResponse<any>> {
    return fetchApi<ApiResponse<any>>(`/foodspots/${foodSpotId}/votes`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Update approval status (admin only)
  async updateApprovalStatus(
    id: string,
    data: { approvalStatus: "APPROVED" | "REJECTED"; rejectionReason?: string }
  ): Promise<ApiResponse<FoodSpot>> {
    return fetchApi<ApiResponse<FoodSpot>>(`/foodspots/admin/${id}/approval`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  // Update premium status (admin only)
  async updatePremiumStatus(
    id: string,
    data: { isPremium: boolean }
  ): Promise<ApiResponse<FoodSpot>> {
    return fetchApi<ApiResponse<FoodSpot>>(`/foodspots/admin/${id}/premium`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};
