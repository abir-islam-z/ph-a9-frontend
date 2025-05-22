import { useApiGet, useApiPost } from "./use-api"
import type { ApiResponse, Vote, VoteRequest, UserVotes } from "@/types/api"

// Hook for getting user votes
export function useUserVotes() {
  return useApiGet<ApiResponse<UserVotes>>("/votes/user")
}

// Hook for upvoting a food spot
export function useUpvote() {
  return useApiPost<ApiResponse<Vote>, VoteRequest>("/votes/upvote")
}

// Hook for downvoting a food spot
export function useDownvote() {
  return useApiPost<ApiResponse<Vote>, VoteRequest>("/votes/downvote")
}
