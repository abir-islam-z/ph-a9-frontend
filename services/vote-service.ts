import { fetchApi } from "@/lib/api-client"
import type { ApiResponse, Vote, VoteRequest, UserVotes } from "@/types/api"

export const voteService = {
  // Upvote a food spot
  async upvoteFoodSpot(data: VoteRequest): Promise<ApiResponse<Vote>> {
    return fetchApi<ApiResponse<Vote>>("/votes/upvote", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  // Downvote a food spot
  async downvoteFoodSpot(data: VoteRequest): Promise<ApiResponse<Vote>> {
    return fetchApi<ApiResponse<Vote>>("/votes/downvote", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  // Get user votes
  async getUserVotes(): Promise<ApiResponse<UserVotes>> {
    return fetchApi<ApiResponse<UserVotes>>("/votes/user")
  },
}
