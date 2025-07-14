"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ROLES } from "@/lib/const";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export default function AccountSettings({ session }: { session: Session }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Account Type</Label>
          <div className="rounded-md bg-muted p-3">
            <p className="font-medium capitalize">{session?.user?.role}</p>
            {session?.user?.role !== ROLES.PREMIUM &&
              session?.user?.role !== ROLES.ADMIN && (
                <p className="mt-1 text-sm text-muted-foreground">
                  <a href="/pricing" className="text-primary hover:underline">
                    Upgrade to Premium
                  </a>{" "}
                  to access exclusive content.
                </p>
              )}
          </div>
        </div>

        {/* {subscriptionData?.data && (
              <div className="space-y-2">
                <Label>Subscription</Label>
                <div className="rounded-md bg-muted p-3">
                  <p className="font-medium">
                    {subscriptionData.data.plan.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {subscriptionData.data.isActive ? "Active" : "Inactive"} •
                    Expires on{" "}
                    {new Date(
                      subscriptionData.data.endDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
 */}
        <div className="space-y-2">
          <Label>Password</Label>
          <div className="flex items-center justify-between rounded-md bg-muted p-3">
            <p className="text-sm text-muted-foreground">
              Change your password
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => redirect("/dashboard/change-password")}
            >
              Change
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
