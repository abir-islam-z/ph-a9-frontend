import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import FoodPostsGrid from "@/components/food-posts-grid"
import FoodPostsLoading from "@/components/food-posts-loading"
import FilterBar from "@/components/filter-bar"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Discover Amazing Street Food</h1>
        <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground">
          Find, rate, and share the best street food spots in your area. Join our community of food enthusiasts!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/posts/new">
            <Button size="lg">Share a Food Spot</Button>
          </Link>
          <Link href="/search">
            <Button size="lg" variant="outline">
              <Search className="mr-2 h-4 w-4" />
              Search Food
            </Button>
          </Link>
        </div>
      </section>

      <FilterBar />

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Popular Food Spots</h2>
          <Link href="/posts">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>

        <Suspense fallback={<FoodPostsLoading />}>
          <FoodPostsGrid />
        </Suspense>
      </section>
    </div>
  )
}
