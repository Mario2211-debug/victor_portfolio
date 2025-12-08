import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { blogAPIPublic } from "@/lib/api-public";
import { BlogPost } from "@/types";
import { format } from "date-fns";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  // Next.js 15+ pode passar params como Promise
  const resolvedParams = await Promise.resolve(params);
  const postId = resolvedParams.id;

  if (!postId) {
    notFound();
  }

  let post: BlogPost | null = null;

  try {
    // Tentar buscar da API (busca por _id ou slug)
    post = await blogAPIPublic.getById(postId);
  } catch (error) {
    // Se falhar, mostrar 404
    console.error("Error fetching post:", error);
  }

  // Se não encontrar post, mostrar 404
  if (!post) {
    notFound();
  }

  const formattedDate = post.date
    ? format(new Date(post.date), "MMMM d, yyyy")
    : null;

  return (
    <article className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
      {/* Back Button */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/blog">← Back to Blog</Link>
        </Button>
      </div>

      {/* Header */}
      <header className="mb-12 max-w-3xl mx-auto">
        <div className="mb-6">
          {post.category && (
            <Badge variant="outline" className="mb-4">
              {post.category}
            </Badge>
          )}
          {formattedDate && (
            <time className="text-sm text-muted-foreground block mb-4">
              {formattedDate}
            </time>
          )}
        </div>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.description}
          </p>
        )}
      </header>

      <Separator className="mb-8 max-w-3xl mx-auto" />

      {/* Featured Image */}
      {post.imageUrl && (
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            {/* Aqui você pode adicionar uma tag <Image> do Next.js quando tiver as imagens reais */}
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`max-w-3xl mx-auto prose-neutral dark:prose-invert prose-lg`}>
        {post.content ? (
          <MarkdownRenderer content={post.content} />
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {post.description}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Separator className="my-12 max-w-3xl mx-auto" />
      <footer className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-medium mb-1">Written by</p>
            <p className="text-sm text-muted-foreground">Victor</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/blog">View All Posts</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </footer>
    </article>
  );
}
