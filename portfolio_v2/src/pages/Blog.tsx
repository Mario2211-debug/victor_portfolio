import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { portfolioQueryOptions, publishedPosts, formatPostDate } from "@/lib/portfolio";
import { LoadingState, ErrorState } from "@/components/site/States";
import { useTitle } from "@/lib/useTitle";

export default function Blog() {
  useTitle("Blog — Mário Afonso");
  const { data, isLoading, error, refetch } = useQuery(portfolioQueryOptions());

  if (isLoading) return <LoadingState />;
  if (error || !data)
    return <ErrorState error={(error as Error) ?? new Error("No data")} onRetry={() => refetch()} />;

  const posts = publishedPosts(data);

  return (
    <main className="bg-background text-foreground flex justify-center px-5 pt-24 pb-16">
      <div className="w-full max-w-[600px]">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Blog</p>
        <h1 className="text-[clamp(2rem,5vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
          Notes &amp; essays.
        </h1>
        <p className="mt-3 text-[15px] text-muted-foreground">
          Occasional writing on engineering, design and the craft of shipping.
        </p>

        {posts.length === 0 ? (
          <p className="mt-10 text-sm text-muted-foreground">No posts published yet.</p>
        ) : (
          <ul className="mt-8 divide-y divide-border/60">
            {posts.map((p) => (
              <li key={p._id} className="border-0">
                <Link
                  to={`/blog/${p.slug}`}
                  className="group block py-4 px-1 hover:border-b transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[15px] text-foreground/90 group-hover:text-foreground truncate">
                      {p.title}
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {[formatPostDate(p.createdAt), p.category, p.description?.trim()]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
