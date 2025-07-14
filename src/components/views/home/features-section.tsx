import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Filter, MapPin, TrendingUp } from "lucide-react";

export default function FeaturesSection() {
  return (
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
                See what's popular right now and get real community ratings and
                reviews.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </FadeIn>
  );
}
