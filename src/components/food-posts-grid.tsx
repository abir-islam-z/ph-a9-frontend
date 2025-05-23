"use client";
import FoodPostCard from "@/components/food-post-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useFilters } from "@/contexts/filter-context";
import { fetchApi } from "@/lib/api-client";
import type { FoodSpot, PaginatedResponse } from "@/types/api";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import FoodPostsLoading from "./food-posts-loading";

// Fetcher function for SWR
const fetcher = (url: string): Promise<PaginatedResponse<FoodSpot[]>> =>
  fetchApi(url) as Promise<PaginatedResponse<FoodSpot[]>>;

export default function FoodPostsGrid() {
  const searchParams = useSearchParams();
  const { priceRange, category, sortBy } = useFilters();

  // Get search query from URL
  const query = searchParams.get("q") || "";

  // Convert price range to min/max price
  const getPriceRange = () => {
    switch (priceRange) {
      case "$":
        return { minPrice: 0, maxPrice: 10 };
      case "$$":
        return { minPrice: 10, maxPrice: 20 };
      case "$$$":
        return { minPrice: 20, maxPrice: 100 };
      default:
        return {};
    }
  };

  // Get sort parameters
  const getSortParams = () => {
    switch (sortBy) {
      case "newest":
        return { sortBy: "createdAt", sortOrder: "desc" };
      case "popular":
        return { sortBy: "upvotes", sortOrder: "desc" };
      case "rating":
        return { sortBy: "averageRating", sortOrder: "desc" };
      default:
        return { sortBy: "createdAt", sortOrder: "desc" };
    }
  };

  // Build query string
  const buildQueryString = () => {
    const params = new URLSearchParams();

    if (query) params.append("search", query);
    if (category !== "all") params.append("category", category);

    const { minPrice, maxPrice } = getPriceRange();
    if (minPrice !== undefined) params.append("minPrice", minPrice.toString());
    if (maxPrice !== undefined) params.append("maxPrice", maxPrice.toString());

    const { sortBy: sort, sortOrder } = getSortParams();
    if (sort) params.append("sortBy", sort);
    if (sortOrder) params.append("sortOrder", sortOrder);

    params.append("page", "1");
    params.append("limit", "12");

    return params.toString();
  };

  // Fetch food spots with filters
  const { data, error, isLoading } = useSWR<PaginatedResponse<FoodSpot[]>>(
    `/foodspots?${buildQueryString()}`,
    fetcher
  );

  if (isLoading) {
    return <FoodPostsLoading />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error.message || "Failed to load food posts. Please try again."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No food spots found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {data.data.map((post, index) => (
        <FoodPostCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}
