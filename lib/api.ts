// Helper function for API calls
export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"
  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`

  // Add default headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    // Handle non-JSON responses
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "API request failed")
      }

      return data
    } else {
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      return response
    }
  } catch (error) {
    console.error("API request error:", error)
    throw error
  }
}

// Mock API data for development/preview
export const mockApi = {
  // Mock food posts
  posts: [
    {
      id: "1",
      title: "Street Tacos",
      description: "Delicious authentic street tacos with fresh ingredients and homemade salsa.",
      location: "123 Main St, Foodville",
      priceRange: "$",
      category: "meals",
      image: "/placeholder.svg?height=400&width=600",
      status: "approved",
      isPremium: false,
      upvotes: 42,
      downvotes: 3,
      rating: 4.5,
      ratingCount: 18,
      commentCount: 7,
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
      priceRange: "$$",
      category: "sweets",
      image: "/placeholder.svg?height=400&width=600",
      status: "approved",
      isPremium: false,
      upvotes: 35,
      downvotes: 2,
      rating: 4.8,
      ratingCount: 22,
      commentCount: 9,
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
      priceRange: "$$$",
      category: "meals",
      image: "/placeholder.svg?height=400&width=600",
      status: "approved",
      isPremium: true,
      upvotes: 56,
      downvotes: 1,
      rating: 4.9,
      ratingCount: 31,
      commentCount: 15,
      author: {
        id: "3",
        name: "Sushi Master",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],

  // Mock comments
  comments: [
    {
      id: "1",
      content: "These tacos are amazing! Definitely worth trying.",
      author: {
        id: "2",
        name: "Sweet Tooth",
      },
      post: {
        id: "1",
        title: "Street Tacos",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      content: "The salsa is so fresh and flavorful!",
      author: {
        id: "3",
        name: "Sushi Master",
      },
      post: {
        id: "1",
        title: "Street Tacos",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
}
