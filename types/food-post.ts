export interface FoodPost {
  id: string
  title: string
  description: string
  location: string
  priceRange: string
  category: string
  image?: string
  status: "pending" | "approved" | "rejected"
  isPremium: boolean
  upvotes: number
  downvotes: number
  rating: number
  ratingCount: number
  commentCount: number
  author: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
  rejectionReason?: string
}
