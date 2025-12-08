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
import { blogAPIPublic } from "@/lib/api-public";
import { BlogPost } from "@/types";
import { format } from "date-fns";

export async function RecentPosts() {
  let posts: BlogPost[] = [];

  try {
    const response = await blogAPIPublic.getAll({ limit: 3 });
    if (Array.isArray(response)) {
      posts = response;
    } else {
      posts = response;
    }
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    // Em caso de erro, posts permanece vazio
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto grid items-center gap-8 pb-12 pt-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="flex max-w-[800px] flex-col items-start gap-2">
        <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          Recent Articles
        </h2>
        <p className="max-w-[650px] text-base text-muted-foreground leading-relaxed sm:text-lg">
          Latest thoughts and insights on design, development, and building
          digital products.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <Card
            key={post._id}
            className="flex flex-col transition-all hover:shadow-md"
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                {post.category && (
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                )}
                {post.date && (
                  <time className="text-xs text-muted-foreground">
                    {format(new Date(post.date), "MMM d")}
                  </time>
                )}
              </div>
              <CardTitle className="text-lg line-clamp-2">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription className="line-clamp-2">
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

      <div className="flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/blog">View All Articles</Link>
        </Button>
      </div>
    </section>
  );
}
