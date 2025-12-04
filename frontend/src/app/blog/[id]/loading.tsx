import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <article className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
      <div className="mb-8">
        <Skeleton className="h-9 w-32" />
      </div>

      <header className="mb-12 max-w-3xl mx-auto">
        <Skeleton className="h-6 w-24 mb-4" />
        <Skeleton className="h-5 w-32 mb-6" />
        <Skeleton className="h-16 w-full mb-6" />
        <Skeleton className="h-6 w-3/4" />
      </header>

      <Separator className="mb-12 max-w-3xl mx-auto" />

      <div className="mb-12 max-w-4xl mx-auto">
        <Skeleton className="aspect-video w-full rounded-lg" />
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    </article>
  );
}

