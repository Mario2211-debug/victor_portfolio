import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-8">
        <Skeleton className="h-9 w-32" />
      </div>

      <div className="mb-12">
        <Skeleton className="h-16 w-3/4 mb-4" />
        <div className="flex gap-3 mb-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-6 w-full max-w-3xl" />
        <Skeleton className="h-6 w-2/3 max-w-3xl mt-2" />
      </div>

      <Separator className="mb-12" />

      <div className="grid gap-8 md:grid-cols-3 mb-12">
        <div className="md:col-span-2 space-y-8">
          <div>
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div>
            <Skeleton className="h-8 w-40 mb-4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>

        <div className="space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  );
}

