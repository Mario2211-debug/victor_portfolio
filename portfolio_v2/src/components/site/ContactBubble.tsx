import { Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { portfolioQueryOptions } from "@/lib/portfolio";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { copy } from "@/lib/copy";

export function ContactBubble() {
  const { data } = useQuery(portfolioQueryOptions());
  const email = data?.profile.contact?.email;

  if (!email) return null;

  return (
    <a
      href={`mailto:${email}`}
      aria-label={copy.nav.email}
      title={copy.nav.email}
      className={buttonVariants({ variant: "ghost", size: "icon" })}
    >
      <Mail aria-hidden className="size-4" />
    </a>
  );
}
