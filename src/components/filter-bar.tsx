"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilters } from "@/contexts/filter-context";
import { motion } from "motion/react";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { priceRange, category, sortBy, setFilters, resetFilters } =
    useFilters();

  // Initialize filters from URL params
  useEffect(() => {
    const priceParam = searchParams.get("price");
    const categoryParam = searchParams.get("category");
    const sortParam = searchParams.get("sort");

    setFilters({
      priceRange: priceParam || "all",
      category: categoryParam || "all",
      sortBy: sortParam || "newest",
    });
  }, [searchParams, setFilters]);

  // Update URL when filters change
  const updateFilters = (key: string, value: string) => {
    // First update the context state
    setFilters({
      [key === "price" ? "priceRange" : key]: value,
    });

    // Then update the URL
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    resetFilters();
    router.push(pathname);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="mb-8 rounded-xl bg-muted/50 p-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <SlidersHorizontal className="h-4 w-4" />
          Filter & Sort
        </div>
        {(priceRange !== "all" ||
          category !== "all" ||
          sortBy !== "newest") && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1 text-xs"
            onClick={handleReset}
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <motion.div className="w-full sm:w-auto" variants={itemVariants}>
          <Select
            value={priceRange}
            onValueChange={(value) => updateFilters("price", value)}
          >
            <SelectTrigger className="h-9 w-full border-muted-foreground/20 bg-background sm:w-[140px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="$">$ (Budget)</SelectItem>
              <SelectItem value="$$">$$ (Moderate)</SelectItem>
              <SelectItem value="$$$">$$$ (Expensive)</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div className="w-full sm:w-auto" variants={itemVariants}>
          <Select
            value={category}
            onValueChange={(value) => updateFilters("category", value)}
          >
            <SelectTrigger className="h-9 w-full border-muted-foreground/20 bg-background sm:w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="SNACKS">Snacks</SelectItem>
              <SelectItem value="MEALS">Meals</SelectItem>
              <SelectItem value="SWEETS">Sweets</SelectItem>
              <SelectItem value="DRINKS">Drinks</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div className="w-full sm:w-auto" variants={itemVariants}>
          <Select
            value={sortBy}
            onValueChange={(value) => updateFilters("sort", value)}
          >
            <SelectTrigger className="h-9 w-full border-muted-foreground/20 bg-background sm:w-[140px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </div>
    </motion.div>
  );
}
