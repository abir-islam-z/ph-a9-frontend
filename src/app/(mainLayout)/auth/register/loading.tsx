"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RegisterLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card className="border-2 cyber-border border-muted bg-card/50 backdrop-blur-sm shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-2">
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-full mt-4" />
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-center space-x-2">
                <Skeleton className="h-px flex-1" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-px flex-1" />
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <Skeleton className="h-3 w-48" />
              <div className="flex gap-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <div className="flex justify-center gap-2 items-center">
              <Skeleton className="h-3 w-36" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-3 w-24 mx-auto" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
