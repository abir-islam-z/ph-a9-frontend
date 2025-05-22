"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface FilterContextType {
  priceRange: string
  category: string
  sortBy: string
  setFilters: (filters: Partial<{ priceRange: string; category: string; sortBy: string }>) => void
  resetFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [priceRange, setPriceRange] = useState<string>("all")
  const [category, setCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")

  const setFilters = (filters: Partial<{ priceRange: string; category: string; sortBy: string }>) => {
    if (filters.priceRange !== undefined) setPriceRange(filters.priceRange)
    if (filters.category !== undefined) setCategory(filters.category)
    if (filters.sortBy !== undefined) setSortBy(filters.sortBy)
  }

  const resetFilters = () => {
    setPriceRange("all")
    setCategory("all")
    setSortBy("newest")
  }

  return (
    <FilterContext.Provider value={{ priceRange, category, sortBy, setFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider")
  }
  return context
}
