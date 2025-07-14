"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminApprovedPosts from "@/components/views/dashboard/admin/approved-posts";
import AdminComments from "@/components/views/dashboard/admin/comments";
import AdminPendingPosts from "@/components/views/dashboard/admin/pending-posts";
import AdminPremiumPosts from "@/components/views/dashboard/admin/premium-posts";
import AdminRejectedPosts from "@/components/views/dashboard/admin/rejected-posts";

export default function AdminDashboardPage() {
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
