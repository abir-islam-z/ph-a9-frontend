import { useApiGet, useApiPost } from "./use-api"
import type { ApiResponse, PaginatedResponse, SubscriptionPlan, Payment, CreatePaymentRequest } from "@/types/api"

// Hook for getting subscription plans
export function useSubscriptionPlans() {
  return useApiGet<ApiResponse<SubscriptionPlan[]>>("/payments/plans")
}

// Hook for getting all payments (admin only)
export function useAllPayments() {
  return useApiGet<PaginatedResponse<Payment[]>>("/payments")
}

// Hook for getting user payments
export function useUserPayments() {
  return useApiGet<ApiResponse<Payment[]>>("/payments/my-payments")
}

// Hook for creating a payment
export function useCreatePayment() {
  return useApiPost<ApiResponse<Payment>, CreatePaymentRequest>("/payments/create-payment")
}
