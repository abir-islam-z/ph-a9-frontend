import { Skeleton } from "@/components/ui/skeleton";

export default function PricingLoading() {
  return (
    <div className="container max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <div className="space-y-6 text-center">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border rounded-lg cyber-border overflow-hidden"
          >
            <div className="p-6">
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-4 w-48 mb-6" />

              <div className="mb-6">
                <Skeleton className="h-8 w-28" />
              </div>

              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="flex items-center">
                    <Skeleton className="h-4 w-4 mr-2" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-800">
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl bg-slate-900/50 p-6 md:p-8 cyber-border">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i}>
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
