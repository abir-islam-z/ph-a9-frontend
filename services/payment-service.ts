import { fetchApi } from "@/lib/api-client";
import type {
  ApiResponse,
  CreatePaymentRequest,
  PaginatedResponse,
  Payment,
  SubscriptionPlan,
} from "@/types/api";

export const paymentService = {
  // Get subscription plans
  async getSubscriptionPlans(): Promise<ApiResponse<SubscriptionPlan[]>> {
    return fetchApi<ApiResponse<SubscriptionPlan[]>>("/payments/plans");
  },

  // Create payment
  async createPayment(
    data: CreatePaymentRequest
  ): Promise<ApiResponse<Payment>> {
    return fetchApi<ApiResponse<Payment>>("/payments/create-payment", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Get user payments
  async getUserPayments(): Promise<ApiResponse<Payment[]>> {
    return fetchApi<ApiResponse<Payment[]>>("/payments/my-payments");
  },

  // Get all payments (admin only)
  async getAllPayments(
    params: {
      page?: number;
      limit?: number;
    } = {}
  ): Promise<PaginatedResponse<Payment[]>> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/payments${queryString ? `?${queryString}` : ""}`;

    return fetchApi<PaginatedResponse<Payment[]>>(endpoint);
  },
};
