"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search } from "@/components/ui/search";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { useDebounce } from "@/hooks/use-debounce";
import { format } from "date-fns";

const ITEMS_PER_PAGE = 9;

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce da busca
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Buscar posts usando SWR
  const { posts, totalPages, isLoading, isError, error, refresh } = useBlogPosts({
    category: selectedCategory || undefined,
    search: debouncedSearch || undefined,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  // Extrair categorias únicas dos posts
  const categories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.category).filter(Boolean))),
    [posts]
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset para primeira página ao buscar
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-4">
          Blog
        </h1>
        <p className="text-base text-muted-foreground max-w-[650px] leading-relaxed sm:text-lg">
          Thoughts, insights, and learnings about design, development, and
          building digital products.
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Search
          placeholder="Search articles..."
          value={searchQuery}
          onSearch={handleSearch}
          className="max-w-md"
        />
      </div>

      {/* Categories */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setSelectedCategory(null);
            setCurrentPage(1);
          }}
        >
          All Posts
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSelectedCategory(category || null);
              setCurrentPage(1);
            }}
          >
            {category}
          </Button>
        ))}
      </div>

      <Separator className="mb-6" />

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-48 w-full rounded-t-lg" />
              <CardHeader>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <div className="text-center py-16">
          <p className="text-destructive mb-4">
            {error?.message || "Failed to load posts. Please try again later."}
          </p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      )}

      {/* Posts Grid */}
      {!isLoading && !isError && (
        <>
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="flex flex-col items-center gap-4">
                <svg
                  className="h-12 w-12 text-muted-foreground/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="space-y-2">
                  <p className="text-base font-medium text-foreground">
                    No posts found
                  </p>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Try adjusting your filters or search terms to find what you&apos;re looking for.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                  <Card
                    key={post._id}
                    className="flex flex-col transition-all hover:shadow-md group"
                  >
                    {post.imageUrl && (
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-muted">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        {post.category && (
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                        )}
                        {post.date && (
                          <time className="text-xs text-muted-foreground">
                            {format(new Date(post.date), "MMM d, yyyy")}
                          </time>
                        )}
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <CardDescription className="line-clamp-3">
                        {post.description}
                      </CardDescription>
                    </CardContent>
                    <CardContent>
                      <Button variant="ghost" size="sm" className="w-full" asChild>
                        <Link href={`/blog/${post.slug || post._id}`}>
                          Read Article <span className="ml-1">→</span>
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return <span key={page}>...</span>;
                      }
                      return null;
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
