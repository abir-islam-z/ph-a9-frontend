"use client";

import ProtectedRoute from "@/components/protected-route";

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN" redirectTo="/auth/login">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
        {/* Admin dashboard content */}
      </div>
    </ProtectedRoute>
  );
}
