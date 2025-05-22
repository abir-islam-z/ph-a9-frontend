import { fetchApi } from "@/lib/api-client";
import type { ApiResponse, Subscription, SubscriptionPlan } from "@/types/api";

export const subscriptionService = {
  // Get all subscription plans
  async getSubscriptionPlans(): Promise<ApiResponse<SubscriptionPlan[]>> {
    return fetchApi<ApiResponse<SubscriptionPlan[]>>("/subscription/plans");
  },

  // Get a specific subscription plan
  async getSubscriptionPlanById(
    planId: string
  ): Promise<ApiResponse<SubscriptionPlan>> {
    return fetchApi<ApiResponse<SubscriptionPlan>>(
      `/subscription/plans/${planId}`
    );
  },

  // Initiate subscription
  async initiateSubscription(planId: string): Promise<ApiResponse<any>> {
    return fetchApi<ApiResponse<any>>("/subscription/initiate", {
      method: "POST",
      body: JSON.stringify({ planId }),
    });
  },

  // Get user subscription history
  async getUserSubscriptionHistory(): Promise<ApiResponse<Subscription[]>> {
    return fetchApi<ApiResponse<Subscription[]>>("/subscription/history");
  },
};
