// Common response interface
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Pagination metadata
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Paginated response
export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta: PaginationMeta;
}

// Auth interfaces
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

// User interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "PREMIUM" | "ADMIN";
  bio?: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

// Define or update your UpdateProfileRequest interface
export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  profilePicture?: File | string | null;
}

// Food spot interfaces
export interface FoodSpot {
  id: string;
  title: string;
  description: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  category: "SNACKS" | "MEALS" | "SWEETS" | "DRINKS";
  image?: string;
  isPremium: boolean;
  status: "PENDING" | "APPROVED" | "REJECTED";
  upvotes: number;
  downvotes: number;
  averageRating: number;
  reviewCount: number;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  rejectionReason?: string;
}

export interface CreateFoodSpotRequest {
  title: string;
  description: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  category: string;
  image?: File;
}

export interface UpdateFoodSpotRequest {
  title?: string;
  description?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
}

// Review interfaces
export interface Review {
  id: string;
  foodSpotId: string;
  rating: number;
  comment: string;
  images?: string[];
  author: {
    id: string;
    name: string;
    profilePicture?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewRequest {
  foodSpotId: string;
  rating: number;
  comment: string;
  images?: string[];
}

// Vote interfaces
export interface Vote {
  id: string;
  foodSpotId: string;
  userId: string;
  type: "UPVOTE" | "DOWNVOTE";
  createdAt: string;
  updatedAt: string;
}

export interface VoteRequest {
  foodSpotId: string;
}

export interface UserVotes {
  [foodSpotId: string]: "UPVOTE" | "DOWNVOTE";
}

// Payment interfaces
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  durationInDays: number;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  planId: string;
  amount: number;
  currency: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  paymentMethod: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentRequest {
  planId: string;
  amount: number;
  currency: string;
}

// Subscription interfaces
export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  plan: SubscriptionPlan;
}

// Comment interfaces
export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  post: {
    id: string;
    title: string;
  };
  createdAt: string;
  updatedAt: string;
}
