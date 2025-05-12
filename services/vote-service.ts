import { fetchApi } from "@/lib/api-client";
import type {
  ApiResponse,
  PaginatedResponse,
  UserVotes,
  Vote,
} from "@/types/api";

export const voteService = {
  // Create or update a vote
  async createOrUpdateVote(data: {
    foodSpotId: string;
    type: "UPVOTE" | "DOWNVOTE";
  }): Promise<ApiResponse<Vote>> {
    return fetchApi<ApiResponse<Vote>>("/votes", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Remove vote from a food spot
  async deleteVote(foodSpotId: string): Promise<ApiResponse<null>> {
    return fetchApi<ApiResponse<null>>(`/votes/${foodSpotId}`, {
      method: "DELETE",
    });
  },

  // Get user votes
  async getUserVotes(): Promise<ApiResponse<UserVotes>> {
    return fetchApi<ApiResponse<UserVotes>>("/votes/user/my-votes");
  },

  // Get votes for a specific food spot
  async getFoodSpotVotes(
    foodSpotId: string
  ): Promise<ApiResponse<{ upvotes: number; downvotes: number }>> {
    return fetchApi<ApiResponse<{ upvotes: number; downvotes: number }>>(
      `/votes/food-spot/${foodSpotId}`
    );
  },

  // Get all votes (admin only)
  async getAllVotes(
    params: {
      page?: number;
      limit?: number;
    } = {}
  ): Promise<PaginatedResponse<Vote[]>> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/votes${queryString ? `?${queryString}` : ""}`;

    return fetchApi<PaginatedResponse<Vote[]>>(endpoint);
  },
};
