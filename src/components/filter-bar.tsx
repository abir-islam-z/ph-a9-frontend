"use client"

import { useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFilters } from "@/contexts/filter-context"

export default function FilterBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { priceRange, category, sortBy, setFilters } = useFilters()

  // Initialize filters from URL params
  useEffect(() => {
    const priceParam = searchParams.get("price")
    const categoryParam = searchParams.get("category")
    const sortParam = searchParams.get("sort")

    setFilters({
      priceRange: priceParam || "all",
      category: categoryParam || "all",
      sortBy: sortParam || "newest",
    })
  }, [searchParams, setFilters])

  // Update URL when filters change
  const updateFilters = (key: string, value: string) => {
    // First update the context state
    setFilters({
      [key === "price" ? "priceRange" : key]: value,
    })

    // Then update the URL
    const params = new URLSearchParams(searchParams.toString())

    if (value === "all") {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="mb-8 flex flex-wrap gap-4">
      <div className="w-full sm:w-auto">
        <Select value={priceRange} onValueChange={(value) => updateFilters("price", value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="$">$ (Budget)</SelectItem>
            <SelectItem value="$$">$$ (Moderate)</SelectItem>
            <SelectItem value="$$$">$$$ (Expensive)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-auto">
        <Select value={category} onValueChange={(value) => updateFilters("category", value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
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
      </div>

      <div className="w-full sm:w-auto">
        <Select value={sortBy} onValueChange={(value) => updateFilters("sort", value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
