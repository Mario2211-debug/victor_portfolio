import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { portfolioQueryOptions, publishedPosts, formatPostDate } from "@/lib/portfolio";
import { LoadingState, ErrorState, EmptyState } from "@/components/site/States";
import { Page } from "@/components/site/Page";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { useTitle } from "@/lib/useTitle";
import { copy } from "@/lib/copy";

export default function Blog() {
  useTitle(`${copy.blog.title} — Mário Afonso`);
  const { data, isLoading, error, refetch } = useQuery(portfolioQueryOptions());

  if (isLoading) return <LoadingState shape="list" />;
  if (error || !data)
    return (
      <ErrorState error={(error as Error) ?? new Error("No data")} onRetry={() => refetch()} />
    );

  const posts = publishedPosts(data);

  return (
    <Page>
      <h1 className="mt-4 text-2xl font-medium tracking-tight text-fg">{copy.blog.title}</h1>
      <p className="mt-4 text-base text-fg-muted">{copy.blog.intro}</p>

      {posts.length === 0 ? (
        <EmptyState
          className="mt-12"
          title={copy.blog.emptyTitle}
          body={copy.blog.emptyBody}
          action={
            <Link to="/" className={buttonVariants({ size: "sm" })}>
              {copy.blog.emptyAction}
            </Link>
          }
        />
      ) : (
        <ul className="mt-12">
          {posts.map((p) => (
            <li key={p._id}>
              <Link
                to={`/blog/${p.slug}`}
                className="interactive motion-micro group -mx-2 block rounded-md px-2 py-3 hover:bg-surface"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="min-w-0 truncate text-base text-fg-muted group-hover:text-fg">
                    {p.title}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="motion-micro size-4 text-fg-muted group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                  />
                </div>
                <p className="mt-1 text-xs text-fg-muted">
                  {[formatPostDate(p.createdAt), p.category, p.description?.trim()]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}
