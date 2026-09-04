import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { portfolioQueryOptions, publishedPosts, formatPostDate } from "@/lib/portfolio";
import { LoadingState, ErrorState, EmptyState } from "@/components/site/States";
import { Page } from "@/components/site/Page";
import { Markdown } from "@/components/site/Markdown";
import { Tag } from "@/components/ui/Tag";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { useTitle } from "@/lib/useTitle";
import { copy } from "@/lib/copy";

function BackToBlog() {
  return (
    <Link
      to="/blog"
      className="interactive motion-micro -mx-2 inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm text-fg-muted hover:bg-surface hover:text-fg"
    >
      <ArrowLeft aria-hidden className="size-4" />
      {copy.blog.backToBlog}
    </Link>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error, refetch } = useQuery(portfolioQueryOptions());

  const post = data ? publishedPosts(data).find((p) => p.slug === slug) : undefined;
  useTitle(post ? `${post.title} — Mário Afonso` : `${copy.blog.eyebrow} — Mário Afonso`);

  if (isLoading) return <LoadingState shape="article" />;
  // `!data`, não `error || !data`: uma revalidação falhada com o instantâneo em
  // mão não põe a página em erro — o conteúdo está lá, só não é o mais recente.
  if (!data)
    return (
      <ErrorState error={(error as Error) ?? new Error("No data")} onRetry={() => refetch()} />
    );

  if (!post) {
    return (
      <Page>
        <h1 className="sr-only">{copy.blog.notFoundTitle}</h1>
        <EmptyState
          title={copy.blog.notFoundTitle}
          body={copy.blog.notFoundBody}
          action={
            <Link to="/blog" className={buttonVariants({ size: "sm" })}>
              {copy.blog.backToBlog}
            </Link>
          }
        />
      </Page>
    );
  }

  return (
    <Page>
      <article>
        <BackToBlog />

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
            {post.createdAt && (
              <time dateTime={post.createdAt} className="numeric">
                {formatPostDate(post.createdAt)}
              </time>
            )}
            {post.category && <Tag>{post.category}</Tag>}
          </div>
          <h1 className="mt-3 text-2xl font-medium tracking-tight text-fg">{post.title}</h1>
          {post.description?.trim() && (
            <p className="mt-4 text-base text-fg-muted">{post.description.trim()}</p>
          )}
        </header>

        {post.imageUrl?.trim() && (
          /* Proporção reservada antes de a imagem chegar: zero layout shift (07). */
          <img
            src={post.imageUrl}
            alt=""
            loading="lazy"
            draggable={false}
            className="mt-8 aspect-[16/9] w-full rounded-md bg-surface object-cover"
          />
        )}

        <div className="mt-8">
          <Markdown content={post.content ?? ""} />
        </div>
      </article>
    </Page>
  );
}
