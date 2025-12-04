import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-32">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="text-6xl font-bold tracking-tight md:text-8xl">
          404
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Page Not Found
        </h2>
        <p className="text-lg text-muted-foreground max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 pt-4">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/projects">View Projects</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

