import FilterBar from "@/components/shared/filter-bar";
import FoodPostsGrid from "@/components/views/home/food-posts/food-posts-grid";
import FoodPostsLoading from "@/components/views/home/food-posts/food-posts-loading";
import { Suspense } from "react";

export default function PostsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">All Food Spots</h1>

      <FilterBar />

      <Suspense fallback={<FoodPostsLoading />}>
        <FoodPostsGrid />
      </Suspense>
    </div>
  );
}
