import FilterBar from "@/components/filter-bar";
import FoodPostsGrid from "@/components/food-posts-grid";
import FoodPostsLoading from "@/components/food-posts-loading";
import HeroSlider from "@/components/hero-slider";
import ExploreByCategory from "@/components/home/explore-by-category";
import PremiumSpots from "@/components/premium-spots";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { ArrowRight, Filter, MapPin, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 pb-20 pt-0">
      {/* Hero Slider Section */}
      <HeroSlider />

      <ExploreByCategory />

      {/* Features Section */}
      <FadeIn from="bottom" delay={0.3} className="mb-16">
        <div className="rounded-2xl bg-muted/50 p-8">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Why Use Street Foodie?
          </h2>
          <StaggerContainer className="grid gap-8 md:grid-cols-3">
            <StaggerItem>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-500">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Discover Hidden Gems
                </h3>
                <p className="text-muted-foreground">
                  Find authentic street food spots that locals love but tourists
                  rarely discover.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-secondary-100 p-3 text-secondary-500">
                  <Filter className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Filter By Preferences
                </h3>
                <p className="text-muted-foreground">
                  Search by food category, price range, or location to find
                  exactly what you're craving.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-accent-100 p-3 text-accent-500">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Trending Spots</h3>
                <p className="text-muted-foreground">
                  See what's popular right now and get real community ratings
                  and reviews.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </FadeIn>

      {/* Premium Spots Section */}
      <PremiumSpots />

      {/* Food Spots Section */}
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

      {/* CTA Section */}
      <FadeIn from="bottom" delay={0.5}>
        <section className="rounded-xl bg-gradient-to-r from-primary-600 to-secondary-700 px-6 py-12 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Join Our Food Community</h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-50">
            Share your own discoveries, rate your favorite spots, and connect
            with other food enthusiasts.
          </p>
          <Link href="/auth/register">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 rounded-full px-8"
            >
              Sign Up Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </section>
      </FadeIn>
    </div>
  );
}
