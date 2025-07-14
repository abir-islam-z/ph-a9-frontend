import { ArrowRight, ChefHat } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "../../ui/motion";

export default function ExploreByCategory() {
  return (
    <FadeIn from="bottom" delay={0.2} className="mb-16 mt-16">
      <h2 className="mb-6 text-2xl font-bold">Explore by Category</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Link
          href="/posts?category=SNACKS"
          className="group overflow-hidden rounded-lg"
        >
          <div className="relative overflow-hidden rounded-xl bg-primary/10 border border-primary/20 p-6 transition-all duration-300 group-hover:bg-primary/15 group-hover:shadow-md">
            <span className="inline-block rounded-full bg-primary p-2 text-primary-foreground">
              <ChefHat className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Snacks
            </h3>
            <p className="text-sm text-foreground/80">
              Quick bites and small treats
            </p>
            <ArrowRight className="absolute bottom-4 right-4 h-5 w-5 transform text-primary transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
        <Link
          href="/posts?category=MEALS"
          className="group overflow-hidden rounded-lg"
        >
          <div className="relative overflow-hidden rounded-xl bg-secondary/10 border border-secondary/20 p-6 transition-all duration-300 group-hover:bg-secondary/15 group-hover:shadow-md">
            <span className="inline-block rounded-full bg-secondary p-2 text-secondary-foreground">
              <ChefHat className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Meals
            </h3>
            <p className="text-sm text-foreground/80">
              Hearty and filling street dishes
            </p>
            <ArrowRight className="absolute bottom-4 right-4 h-5 w-5 transform text-secondary transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
        <Link
          href="/posts?category=SWEETS"
          className="group overflow-hidden rounded-lg"
        >
          <div className="relative overflow-hidden rounded-xl bg-accent/10 border border-accent/20 p-6 transition-all duration-300 group-hover:bg-accent/15 group-hover:shadow-md">
            <span className="inline-block rounded-full bg-accent p-2 text-accent-foreground">
              <ChefHat className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Sweets
            </h3>
            <p className="text-sm text-foreground/80">
              Desserts and sweet treats
            </p>
            <ArrowRight className="absolute bottom-4 right-4 h-5 w-5 transform text-accent transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
        <Link
          href="/posts?category=DRINKS"
          className="group overflow-hidden rounded-lg"
        >
          <div className="relative overflow-hidden rounded-xl bg-primary/10 border border-primary/20 p-6 transition-all duration-300 group-hover:bg-primary/15 group-hover:shadow-md">
            <span className="inline-block rounded-full bg-primary p-2 text-primary-foreground">
              <ChefHat className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Drinks
            </h3>
            <p className="text-sm text-foreground/80">Refreshing beverages</p>
            <ArrowRight className="absolute bottom-4 right-4 h-5 w-5 transform text-primary transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </FadeIn>
  );
}
