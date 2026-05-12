import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { portfolioQueryOptions, publishedPosts, formatPostDate } from "@/lib/portfolio";
import { LoadingState, ErrorState } from "@/components/site/States";
import { Markdown } from "@/components/site/Markdown";
import { useTitle } from "@/lib/useTitle";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error, refetch } = useQuery(portfolioQueryOptions());

  const post = data ? publishedPosts(data).find((p) => p.slug === slug) : undefined;
  useTitle(post ? `${post.title} — Mário Afonso` : "Post — Mário Afonso");

  if (isLoading) return <LoadingState />;
  if (error || !data)
    return <ErrorState error={(error as Error) ?? new Error("No data")} onRetry={() => refetch()} />;

  if (!post) {
    return (
      <main className="bg-background text-foreground flex justify-center px-5 pt-24 pb-16">
        <div className="w-full max-w-[640px]">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>
          <h1 className="mt-8 text-2xl font-semibold tracking-tight">Post not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This post doesn't exist or hasn't been published.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground flex justify-center px-5 pt-24 pb-20">
      <article className="w-full max-w-[640px]">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to blog
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {post.createdAt && <span>{formatPostDate(post.createdAt)}</span>}
            {post.category && (
              <>
                <span className="opacity-40">·</span>
                <span className="inline-flex items-center rounded-md border border-border/60 bg-secondary/30 px-2 py-0.5">
                  {post.category}
                </span>
              </>
            )}
          </div>
          <h1 className="mt-3 text-[clamp(1.9rem,4.5vw,2.6rem)] leading-[1.08] tracking-[-0.02em] font-medium">
            {post.title}
          </h1>
          {post.description?.trim() && (
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {post.description.trim()}
            </p>
          )}
        </header>

        {post.imageUrl?.trim() && (
          <img
            src={post.imageUrl}
            alt=""
            className="mt-8 w-full rounded-lg border border-border/60 object-cover"
          />
        )}

        <div className="mt-6 border-t border-border/60 pt-2">
          <Markdown content={post.content ?? ""} />
        </div>
      </article>
    </main>
  );
}
