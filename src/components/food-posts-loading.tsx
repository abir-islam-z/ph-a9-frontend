"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export default function FoodPostsLoading() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="overflow-hidden rounded-xl border-2 border-muted bg-card"
          >
            <div className="relative">
              <div
                className={cn(
                  "aspect-video w-full overflow-hidden bg-gradient-to-r from-muted/60 to-muted",
                  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent"
                )}
              />
              <div className="absolute left-2 top-2">
                <div className="h-5 w-16 rounded-full bg-muted-foreground/10" />
              </div>
            </div>
            <div className="p-4">
              <div className="mb-2 h-5 w-3/4 rounded-md bg-muted-foreground/10" />
              <div className="mb-4 h-4 w-1/2 rounded-md bg-muted-foreground/10" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-muted-foreground/10" />
                <div className="h-3 w-5/6 rounded bg-muted-foreground/10" />
                <div className="h-3 w-4/6 rounded bg-muted-foreground/10" />
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-muted-foreground/10 bg-muted/30 p-4">
              <div className="flex items-center space-x-4">
                <div className="h-4 w-8 rounded bg-muted-foreground/10" />
                <div className="h-4 w-8 rounded bg-muted-foreground/10" />
              </div>
              <div className="flex space-x-1">
                {Array(5)
                  .fill(0)
                  .map((_, j) => (
                    <div
                      key={j}
                      className="h-4 w-4 rounded-full bg-muted-foreground/10"
                    />
                  ))}
              </div>
            </div>
          </motion.div>
        ))}
    </div>
  );
}
