import BlogSection from "@/components/views/home/blog-section";
import Cta from "@/components/views/home/cta";
import ExploreByCategory from "@/components/views/home/explore-by-category";
import FeaturesSection from "@/components/views/home/features-section";
import FoodSpots from "@/components/views/home/food-posts/food-spots";
import HeroSlider from "@/components/views/home/hero-slider";
import PremiumSpots from "@/components/views/home/premium-spots";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 pb-20 pt-0">
      <HeroSlider />
      <ExploreByCategory />
      <FeaturesSection />
      <PremiumSpots />
      <FoodSpots />
      <BlogSection />
      <Cta />
    </div>
  );
}
