"use client";

import { foodSpotService } from "@/services/food-spot-service";
import { reviewService } from "@/services/review-service";
import type { FoodSpot } from "@/types/api";
import { useState } from "react";

export function useAdminPosts() {
  const [posts, setPosts] = useState<FoodSpot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await foodSpotService.getAllFoodSpots();
      setPosts(response.data || []);
    } catch (err) {
      setError("Failed to fetch food spots");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPendingPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await foodSpotService.getPendingFoodSpots();
      setPosts(response.data || []);
    } catch (err) {
      setError("Failed to fetch pending food spots");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePostStatus = async (
    id: string,
    data: { approvalStatus: "APPROVED" | "REJECTED"; rejectionReason?: string }
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      await foodSpotService.updateApprovalStatus(id, data);
      // Refresh the posts list after updating
      fetchPosts();
    } catch (err) {
      setError("Failed to update approval status");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePremiumStatus = async (id: string, isPremium: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      await foodSpotService.updatePremiumStatus(id, { isPremium });
      // Refresh the posts list after updating
      fetchPosts();
      return true;
    } catch (err) {
      setError("Failed to update premium status");
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
    fetchPendingPosts,
    updatePostStatus,
    updatePremiumStatus,
  };
}

export function useAdminComments() {
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await reviewService.getAllReviews();
      setComments(response.data || []);
    } catch (err) {
      setError("Failed to fetch reviews");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await reviewService.deleteReview(id);
      // Refresh the comments list after deletion
      fetchComments();
    } catch (err) {
      setError("Failed to delete review");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    comments,
    isLoading,
    error,
    fetchComments,
    deleteComment,
  };
}
