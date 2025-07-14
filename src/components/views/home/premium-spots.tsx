"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchApi } from "@/lib/api-client";
import { FoodSpot, PaginatedResponse } from "@/types/api";
import { ChevronRight, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PremiumSpots() {
  const [premiumSpots, setPremiumSpots] = useState<FoodSpot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPremiumSpots = async () => {
      try {
        setIsLoading(true);
        const response = await fetchApi<PaginatedResponse<FoodSpot[]>>(
          "/foodspots?premium=true&limit=4"
        );
        setPremiumSpots(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch premium spots:", err);
        setError("Failed to load premium spots");
        setIsLoading(false);
      }
    };

    fetchPremiumSpots();
  }, []);

  if (isLoading) {
    return <PremiumSpotsSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-4 text-muted-foreground">{error}</div>
    );
  }

  if (premiumSpots.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <FadeIn from="bottom" className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Premium Spots
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our exclusive collection of premium street food spots
            hand-picked for food connoisseurs
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {premiumSpots.map((spot) => (
            <StaggerItem key={spot.id}>
              <Link href={`/posts/${spot.id}`}>
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg border-yellow-200 dark:border-yellow-900 hover:border-yellow-400 dark:hover:border-yellow-700 group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={spot.image || "/placeholder.svg"}
                      alt={spot.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white">
                        <Star className="mr-1 h-3 w-3 fill-white" /> Premium
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-bold line-clamp-1 group-hover:text-orange-500 transition-colors duration-200">
                        {spot.title}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1 text-orange-500" />
                        <span className="line-clamp-1">{spot.location}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {spot.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <Badge variant="outline">
                          ${spot.minPrice} - ${spot.maxPrice}
                        </Badge>
                        <div className="flex items-center text-sm text-yellow-500">
                          <span className="font-medium">Explore</span>
                          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="flex justify-center mt-8">
          <Link href="/pricing">
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg">
              Explore Premium Plans
            </Button>
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

function PremiumSpotsSkeleton() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="text-center mb-10">
          <Skeleton className="h-10 w-64 mx-auto mb-3" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="h-full overflow-hidden animate-pulse">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex items-center justify-between pt-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        <div className="flex justify-center mt-8">
          <Skeleton className="h-10 w-48" />
        </div>
      </div>
    </section>
  );
}
