import { getSession } from "next-auth/react";

// API base URL from environment variable
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api/v1";

// Generic fetch function with authentication and error handling
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${
    endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  }`;

  // Get session for authentication token
  const session = await getSession();

  // Default headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Add auth token if available
  if (session?.accessToken) {
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  // Merge options
  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, fetchOptions);

    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(
          data.message || `API request failed with status ${response.status}`
        );
      }

      return data;
    } else {
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      // For non-JSON responses, return the response object
      return response as unknown as T;
    }
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
}

// Helper function for handling FormData requests
export async function fetchFormData<T>(
  endpoint: string,
  formData: FormData,
  method: "POST" | "PUT" | "PATCH" = "POST"
): Promise<T> {
  const session = await getSession();

  const headers: HeadersInit = {};

  // Add auth token if available
  if (session?.accessToken) {
    headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  const options: RequestInit = {
    method,
    headers,
    body: formData,
  };

  return fetchApi<T>(endpoint, options);
}
