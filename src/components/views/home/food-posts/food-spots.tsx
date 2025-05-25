import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import FilterBar from "../../../shared/filter-bar";
import FoodPostsGrid from "./food-posts-grid";
import FoodPostsLoading from "./food-posts-loading";

export default function FoodSpots() {
  return (
    <FadeIn from="bottom" delay={0.4} className="mb-16">
      <div className="mb-8">
        <FilterBar />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Popular Food Spots</h2>
        <Link href="/posts">
          <Button variant="outline" className="gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <Suspense fallback={<FoodPostsLoading />}>
        <FoodPostsGrid />
      </Suspense>
    </FadeIn>
  );
}
