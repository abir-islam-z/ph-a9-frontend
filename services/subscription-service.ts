import { fetchApi } from "@/lib/api-client"
import type { ApiResponse, Subscription } from "@/types/api"

export const subscriptionService = {
  // Get user subscription
  async getUserSubscription(): Promise<ApiResponse<Subscription>> {
    return fetchApi<ApiResponse<Subscription>>("/subscription/me")
  },
}
