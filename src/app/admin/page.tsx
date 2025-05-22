"use client";

import AdminApprovedPosts from "@/components/admin/approved-posts";
import AdminComments from "@/components/admin/comments";
import AdminPendingPosts from "@/components/admin/pending-posts";
import AdminPremiumPosts from "@/components/admin/premium-posts";
import AdminRejectedPosts from "@/components/admin/rejected-posts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();

  console.log("Session data:", session);
  console.log("Session status:", status);

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  // if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
  //   redirect("/auth/login?callbackUrl=/admin");
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

      <Tabs defaultValue="pending">
        <TabsList className="mb-6 grid w-full grid-cols-5">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <AdminPendingPosts />
        </TabsContent>

        <TabsContent value="approved">
          <AdminApprovedPosts />
        </TabsContent>

        <TabsContent value="rejected">
          <AdminRejectedPosts />
        </TabsContent>

        <TabsContent value="premium">
          <AdminPremiumPosts />
        </TabsContent>

        <TabsContent value="comments">
          <AdminComments />
        </TabsContent>
      </Tabs>
    </div>
  );
}
