import { useApiGet } from "./use-api"
import type { ApiResponse, Subscription } from "@/types/api"

// Hook for getting user subscription
export function useUserSubscription() {
  return useApiGet<ApiResponse<Subscription>>("/subscription/me")
}
