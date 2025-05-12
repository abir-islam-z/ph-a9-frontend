import { fetchApi } from "@/lib/api-client"
import type { ApiResponse, PaginatedResponse, SubscriptionPlan, Payment, CreatePaymentRequest } from "@/types/api"

export const paymentService = {
  // Get subscription plans
  async getSubscriptionPlans(): Promise<ApiResponse<SubscriptionPlan[]>> {
    return fetchApi<ApiResponse<SubscriptionPlan[]>>("/payments/plans")
  },

  // Get all payments (admin only)
  async getAllPayments(): Promise<PaginatedResponse<Payment[]>> {
    return fetchApi<PaginatedResponse<Payment[]>>("/payments")
  },

  // Get user payments
  async getUserPayments(): Promise<ApiResponse<Payment[]>> {
    return fetchApi<ApiResponse<Payment[]>>("/payments/my-payments")
  },

  // Create payment
  async createPayment(data: CreatePaymentRequest): Promise<ApiResponse<Payment>> {
    return fetchApi<ApiResponse<Payment>>("/payments/create-payment", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },
}
