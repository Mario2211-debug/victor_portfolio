import { Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { portfolioQueryOptions } from "@/lib/portfolio";

export function ContactBubble() {
  const { data } = useQuery(portfolioQueryOptions());
  const email = data?.profile.contact?.email;

  if (!email) return null;

  return (
    <a
      href={`mailto:${email}`}
      aria-label="Contact me by email"
      title="Contact me"
      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border/80 bg-background/70 backdrop-blur-md text-muted-foreground hover:text-foreground transition-colors"
    >
      <Mail className="size-4" />
    </a>
  );
}
