"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Book,
  ChefHat,
  ChevronDown,
  Coffee,
  Compass,
  Pizza,
  Tag,
  Utensils,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const categories = [
  {
    name: "Snacks",
    icon: Pizza,
    href: "/posts?category=SNACKS",
    color: "text-cyan-400 bg-cyan-950/60 border border-cyan-700/50",
    description: "Quick bites and finger foods perfect for on-the-go snacking",
    highlights: ["Street Tacos", "Samosas", "Spring Rolls", "Corn Dogs"],
  },
  {
    name: "Meals",
    icon: Utensils,
    href: "/posts?category=MEALS",
    color: "text-violet-400 bg-violet-950/60 border border-violet-700/50",
    description: "Hearty and satisfying street food meals for any time of day",
    highlights: ["Pad Thai", "Shawarma", "Biryani", "Burger"],
  },
  {
    name: "Sweets",
    icon: ChefHat,
    href: "/posts?category=SWEETS",
    color: "text-rose-400 bg-rose-950/60 border border-rose-700/50",
    description: "Sweet treats and desserts from around the world",
    highlights: ["Gelato", "Churros", "Crepes", "Bubble Waffle"],
  },
  {
    name: "Drinks",
    icon: Coffee,
    href: "/posts?category=DRINKS",
    color: "text-emerald-400 bg-emerald-950/60 border border-emerald-700/50",
    description: "Refreshing beverages and unique drinks from street vendors",
    highlights: ["Boba Tea", "Fresh Juice", "Vietnamese Coffee", "Lassi"],
  },
];

const locations = [
  { name: "Food Markets", href: "/search?loc=markets" },
  { name: "Food Trucks", href: "/search?loc=trucks" },
  { name: "Night Markets", href: "/search?loc=night" },
  { name: "Street Corners", href: "/search?loc=corners" },
  { name: "Food Festivals", href: "/search?loc=festivals" },
];

const price = [
  { name: "Budget ($)", href: "/search?price=$" },
  { name: "Moderate ($$)", href: "/search?price=$$" },
  { name: "Premium ($$$)", href: "/search?price=$$$" },
];
const MotionContent = motion.create(DropdownMenuContent);
export function DropdownMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="focus:ring-0 focus-visible:ring-0 focus:border-none hover:bg-accent/50"
        >
          Categories
          <ChevronDown
            className={cn("ml-1 h-4 w-4", {
              "rotate-180": isOpen,
            })}
          />
        </Button>
      </DropdownMenuTrigger>
      <AnimatePresence>
        <MotionContent
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="w-[40vw] max-w-3xl p-0 border-none bg-card/95shadow-[0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-xl supports-[backdrop-filter]:bg-card/80"
        >
          <div className="cyber-border p-3 md:p-4 rounded-lg">
            <div className="grid gap-2 sm:gap-3 md:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group block space-y-1 rounded-sm cyber-border p-2 transition-colors hover:bg-slate-900/80 hover:shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <div className={cn("rounded-full p-1", category.color)}>
                      <category.icon className="h-3 w-3" />
                    </div>
                    <div className="font-medium text-sm group-hover:underline">
                      {category.name}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {category.description}
                  </div>
                  <div className="mt-1">
                    <span className="text-[10px] font-medium uppercase text-muted-foreground">
                      Popular:
                    </span>
                    <ul className="mt-0.5 space-y-0.5 text-xs">
                      {category.highlights.map((item) => (
                        <li
                          key={item}
                          className="text-secondary-600 dark:text-secondary-400"
                        >
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-3 md:mt-4 grid gap-3 md:gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-1 md:mb-2 flex items-center space-x-2">
                  <Compass className="h-3 w-3 text-muted-foreground" />
                  <h4 className="font-medium text-sm">By Location</h4>
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {locations.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-1 md:mb-2 flex items-center space-x-2">
                  <Tag className="h-3 w-3 text-muted-foreground" />
                  <h4 className="font-medium text-sm">By Price</h4>
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {price.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-3 md:mt-4 rounded-lg bg-muted p-2 md:p-3">
              <div className="flex items-center space-x-2">
                <Book className="h-3 w-3 text-primary-500" />
                <h3 className="font-medium text-sm">Food Guides</h3>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Discover curated guides to the best street food in different
                cities around the world.
              </p>
              <Link
                href="/guides"
                className="mt-2 inline-block text-xs md:text-sm font-medium text-primary-500 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Browse all guides →
              </Link>
            </div>
          </div>
        </MotionContent>
      </AnimatePresence>
    </DropdownMenu>
  );
}
