"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FadeIn } from "@/components/ui/motion";
import PersistentSlideIn from "@/components/ui/persistent-slide-in";
import { cn } from "@/lib/utils";
import { ChefHat, Clock, Search, Star, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Discover & Share",
    subtitle: "Amazing Street Food",
    description:
      "Find, rate, and share the best street food spots in your area. Join our community of food enthusiasts!",
    gradient: "from-sky-950 via-blue-900 to-indigo-950 bg-grid-blue",
    buttons: [
      {
        href: "/posts/new",
        label: "Share a Food Spot",
        icon: <ChefHat className="h-5 w-5" />,
        variant: "primary",
      },
      {
        href: "/search",
        label: "Search Food",
        icon: <Search className="h-5 w-5" />,
        variant: "outline",
      },
    ],
    decoration: "primary",
  },
  {
    id: 2,
    title: "Trending Now",
    subtitle: "Popular Street Food",
    description:
      "See what's hot right now! Discover the most popular street food spots as rated by our community.",
    gradient: "from-indigo-950 via-purple-900 to-fuchsia-950 bg-grid-purple",
    buttons: [
      {
        href: "/search?sort=trending",
        label: "View Trending",
        icon: <TrendingUp className="h-5 w-5" />,
        variant: "primary",
      },
      {
        href: "/search?sort=new",
        label: "Newest Spots",
        icon: <Clock className="h-5 w-5" />,
        variant: "outline",
      },
    ],
    decoration: "secondary",
  },
  {
    id: 3,
    title: "Join Our Community",
    subtitle: "Share Your Experiences",
    description:
      "Become part of a growing community of street food lovers. Rate, review, and connect with fellow foodies!",
    gradient: "from-cyan-950 via-teal-900 to-emerald-950 bg-grid-teal",
    buttons: [
      {
        href: "/auth/register",
        label: "Join Now",
        icon: <Users className="h-5 w-5" />,
        variant: "primary",
      },
      {
        href: "/posts",
        label: "Browse Posts",
        icon: <Search className="h-5 w-5" />,
        variant: "outline",
      },
    ],
    decoration: "accent",
  },
  {
    id: 4,
    title: "Premium Features",
    subtitle: "Unlock Exclusive Content",
    description:
      "Get access to premium features, hidden gems, and special recommendations with our premium subscription.",
    gradient: "from-rose-950 via-pink-900 to-red-950 bg-grid-pink",
    buttons: [
      {
        href: "/premium",
        label: "Go Premium",
        icon: <Star className="h-5 w-5" />,
        variant: "primary",
      },
      {
        href: "/premium/features",
        label: "Learn More",
        icon: <Search className="h-5 w-5" />,
        variant: "outline",
      },
    ],
    decoration: "rose",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  // Pause autoplay when user interacts
  const handleManualNavigation = (index: number) => {
    setCurrentSlide(index);
    setAutoPlay(false);
    // Resume autoplay after user inactivity
    setTimeout(() => setAutoPlay(true), 10000);
  };

  return (
    <FadeIn from="bottom" duration={0.7} className="relative mt-8 md:mt-16">
      <div className="min-h-[400px] md:min-h-[450px]">
        <Carousel
          className="relative overflow-hidden rounded-3xl shadow-lg h-full"
          opts={{
            align: "center",
            loop: true,
            skipSnaps: false,
          }}
          setApi={(api) => {
            if (api) {
              api.on("select", () => {
                setCurrentSlide(api.selectedScrollSnap());
              });
            }
          }}
        >
          <CarouselContent className="h-full">
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="h-full">
                <section
                  className={cn(
                    "relative overflow-hidden bg-gradient-to-r px-5 py-12 md:px-8 md:py-16 lg:px-12 h-full flex items-center justify-center",
                    slide.gradient
                  )}
                >
                  <div className="relative z-10 max-w-2xl mx-auto md:mx-0">
                    <PersistentSlideIn
                      active={currentSlide === slide.id - 1}
                      from="top"
                      duration={0.8}
                    >
                      <h1 className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-cyan-100">
                        <span className="block treasure-highlight text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                          {slide.title}
                        </span>
                        {slide.subtitle}
                      </h1>
                    </PersistentSlideIn>

                    <PersistentSlideIn
                      active={currentSlide === slide.id - 1}
                      from="left"
                      duration={0.8}
                      delay={0.1}
                    >
                      <p className="mb-6 md:mb-8 max-w-xl text-base md:text-lg text-neutral-600">
                        {slide.description}
                      </p>
                    </PersistentSlideIn>

                    <PersistentSlideIn
                      active={currentSlide === slide.id - 1}
                      from="bottom"
                      duration={0.8}
                      delay={0.2}
                    >
                      <div className="flex flex-wrap items-center gap-3 md:gap-4">
                        {slide.buttons.map((button, idx) => (
                          <Link href={button.href} key={idx}>
                            <Button
                              size="lg"
                              className={cn(
                                "gap-2 rounded-sm px-4 md:px-6 text-sm md:text-base border transition-all duration-300",
                                button.variant === "primary"
                                  ? "bg-cyan-900/70 text-cyan-100 hover:bg-cyan-800 border-cyan-500/50 shadow-[0_0_10px_rgba(0,224,255,0.3)] hover:shadow-[0_0_15px_rgba(0,224,255,0.5)]"
                                  : "bg-transparent text-cyan-300 hover:bg-cyan-950/50 border-cyan-700/50"
                              )}
                              variant={
                                button.variant === "primary"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {button.icon}
                              {button.label}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </PersistentSlideIn>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute bottom-0 right-0 top-0 hidden w-1/3 translate-x-1/4 lg:block opacity-80">
                    <div
                      className={cn(
                        "absolute -top-16 right-0 h-72 w-72 rounded-full blur-xl",
                        slide.decoration === "primary"
                          ? "bg-cyan-400/30 shadow-cyan-400/50"
                          : slide.decoration === "secondary"
                          ? "bg-purple-400/30 shadow-purple-400/50"
                          : slide.decoration === "accent"
                          ? "bg-teal-400/30 shadow-teal-400/50"
                          : "bg-pink-400/30 shadow-pink-400/50"
                      )}
                      style={{
                        boxShadow:
                          slide.decoration === "primary"
                            ? "0 0 50px rgba(34, 211, 238, 0.3)"
                            : slide.decoration === "secondary"
                            ? "0 0 50px rgba(168, 85, 247, 0.3)"
                            : slide.decoration === "accent"
                            ? "0 0 50px rgba(20, 184, 166, 0.3)"
                            : "0 0 50px rgba(236, 72, 153, 0.3)",
                      }}
                    ></div>
                    <div
                      className={cn(
                        "absolute -bottom-8 right-8 h-48 w-48 rounded-full blur-lg",
                        slide.decoration === "primary"
                          ? "bg-blue-500/40"
                          : slide.decoration === "secondary"
                          ? "bg-indigo-500/40"
                          : slide.decoration === "accent"
                          ? "bg-emerald-500/40"
                          : "bg-rose-500/40"
                      )}
                    ></div>
                    <div
                      className={cn(
                        "absolute left-8 top-1/3 h-24 w-24 rounded-full blur-md",
                        slide.decoration === "primary"
                          ? "bg-sky-400/50"
                          : slide.decoration === "secondary"
                          ? "bg-violet-400/50"
                          : slide.decoration === "accent"
                          ? "bg-cyan-400/50"
                          : "bg-orange-400/50"
                      )}
                    ></div>
                  </div>
                </section>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom navigation controls */}
          <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleManualNavigation(idx)}
                className={cn(
                  "h-2.5 w-2.5 rounded-sm transition-all",
                  currentSlide === idx
                    ? "w-12 bg-cyan-500 shadow-[0_0_10px_rgba(0,224,255,0.7)]"
                    : "bg-cyan-800/50 hover:bg-cyan-600 border border-cyan-600/30"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 hidden border border-cyan-500/50 bg-slate-900/80 text-cyan-400 hover:bg-slate-800 hover:text-cyan-300 sm:flex md:left-4 h-10 w-10 shadow-[0_0_10px_rgba(0,224,255,0.4)]" />
          <CarouselNext className="right-2 top-1/2 -translate-y-1/2 hidden border border-cyan-500/50 bg-slate-900/80 text-cyan-400 hover:bg-slate-800 hover:text-cyan-300 sm:flex md:right-4 h-10 w-10 shadow-[0_0_10px_rgba(0,224,255,0.4)]" />
        </Carousel>
      </div>
    </FadeIn>
  );
}
