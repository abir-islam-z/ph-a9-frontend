import type { FoodSpot } from "@/types/api"
import type { Comment } from "@/types/api"

// Mock API data for development/preview
export const mockApi = {
  // Mock food spots
  foodSpots: [
    {
      id: "1",
      title: "Street Tacos",
      description: "Delicious authentic street tacos with fresh ingredients and homemade salsa.",
      location: "123 Main St, Foodville",
      minPrice: 5,
      maxPrice: 10,
      category: "MEALS",
      image: "/placeholder.svg?height=400&width=600",
      status: "APPROVED",
      isPremium: false,
      upvotes: 42,
      downvotes: 3,
      averageRating: 4.5,
      reviewCount: 18,
      author: {
        id: "1",
        name: "Foodie User",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Gourmet Ice Cream",
      description: "Handcrafted ice cream with unique flavors and premium ingredients.",
      location: "456 Dessert Ave, Sweetville",
      minPrice: 8,
      maxPrice: 15,
      category: "SWEETS",
      image: "/placeholder.svg?height=400&width=600",
      status: "APPROVED",
      isPremium: false,
      upvotes: 35,
      downvotes: 2,
      averageRating: 4.8,
      reviewCount: 22,
      author: {
        id: "2",
        name: "Sweet Tooth",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Premium Sushi Stand",
      description: "High-quality sushi made with fresh fish and traditional techniques.",
      location: "789 Ocean Blvd, Fishtown",
      minPrice: 20,
      maxPrice: 40,
      category: "MEALS",
      image: "/placeholder.svg?height=400&width=600",
      status: "APPROVED",
      isPremium: true,
      upvotes: 56,
      downvotes: 1,
      averageRating: 4.9,
      reviewCount: 31,
      author: {
        id: "3",
        name: "Sushi Master",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ] as FoodSpot[],

  // Mock reviews/comments
  reviews: [
    {
      id: "1",
      foodSpotId: "1",
      rating: 5,
      comment: "These tacos are amazing! Definitely worth trying.",
      author: {
        id: "2",
        name: "Sweet Tooth",
        profilePicture: "/placeholder.svg?height=50&width=50",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      foodSpotId: "1",
      rating: 4,
      comment: "The salsa is so fresh and flavorful!",
      author: {
        id: "3",
        name: "Sushi Master",
        profilePicture: "/placeholder.svg?height=50&width=50",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ] as Comment[],

  // Mock user votes
  userVotes: {
    "1": "UPVOTE",
    "2": "DOWNVOTE",
  },

  // Mock subscription plans
  subscriptionPlans: [
    {
      id: "1",
      name: "Premium Monthly",
      description: "Access to all premium content for one month",
      price: 9.99,
      currency: "USD",
      durationInDays: 30,
      features: ["Access to premium food spots", "Early access to new features", "Ad-free experience"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
}

// Mock API service
export const mockApiService = {
  // Food spots
  getFoodSpots: async (params: any = {}) => {
    // Filter by search query
    let filteredSpots = [...mockApi.foodSpots]

    if (params.search) {
      const searchLower = params.search.toLowerCase()
      filteredSpots = filteredSpots.filter(
        (spot) =>
          spot.title.toLowerCase().includes(searchLower) ||
          spot.description.toLowerCase().includes(searchLower) ||
          spot.location.toLowerCase().includes(searchLower),
      )
    }

    // Filter by category
    if (params.category && params.category !== "all") {
      filteredSpots = filteredSpots.filter((spot) => spot.category.toLowerCase() === params.category.toLowerCase())
    }

    // Filter by price range
    if (params.minPrice) {
      filteredSpots = filteredSpots.filter((spot) => spot.minPrice >= params.minPrice)
    }
    if (params.maxPrice) {
      filteredSpots = filteredSpots.filter((spot) => spot.maxPrice <= params.maxPrice)
    }

    // Sort results
    if (params.sortBy) {
      if (params.sortBy === "newest") {
        filteredSpots.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      } else if (params.sortBy === "popular") {
        filteredSpots.sort((a, b) => b.upvotes - a.upvotes)
      } else if (params.sortBy === "rating") {
        filteredSpots.sort((a, b) => b.averageRating - a.averageRating)
      }
    }

    return {
      success: true,
      message: "Food spots retrieved successfully",
      data: filteredSpots,
      meta: {
        currentPage: 1,
        totalPages: 1,
        totalItems: filteredSpots.length,
        itemsPerPage: filteredSpots.length,
      },
    }
  },

  getFoodSpotById: async (id: string) => {
    const foodSpot = mockApi.foodSpots.find((spot) => spot.id === id)

    if (!foodSpot) {
      throw new Error("Food spot not found")
    }

    return {
      success: true,
      message: "Food spot retrieved successfully",
      data: foodSpot,
    }
  },

  // Reviews
  getReviewsByFoodSpotId: async (foodSpotId: string) => {
    const reviews = mockApi.reviews.filter((review) => review.foodSpotId === foodSpotId)

    return {
      success: true,
      message: "Reviews retrieved successfully",
      data: reviews,
      meta: {
        currentPage: 1,
        totalPages: 1,
        totalItems: reviews.length,
        itemsPerPage: reviews.length,
      },
    }
  },

  // Votes
  getUserVotes: async () => {
    return {
      success: true,
      message: "User votes retrieved successfully",
      data: mockApi.userVotes,
    }
  },
}
