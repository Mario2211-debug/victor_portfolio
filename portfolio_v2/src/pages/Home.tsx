import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { portfolioQueryOptions, sanitizeUrl, slugify, formatRange } from "@/lib/portfolio";
import { LoadingState, ErrorState } from "@/components/site/States";
import { useTitle } from "@/lib/useTitle";

export default function Home() {
  useTitle();
  const { data, isLoading, error, refetch } = useQuery(portfolioQueryOptions());
  const [showPrev, setShowPrev] = useState(false);

  if (isLoading) return <LoadingState />;
  if (error || !data)
    return <ErrorState error={(error as Error) ?? new Error("No data")} onRetry={() => refetch()} />;

  const { user, profile, experiences, projects } = data;
  const linkedin = sanitizeUrl(profile.contact?.linkedin);
  const email = profile.contact?.email;
  const contactHref = linkedin ?? (email ? `mailto:${email}` : undefined);
  const current = experiences.find((e) => e.isCurrent) ?? experiences[0];
  const previous = experiences.filter((e) => e._id !== current?._id);
  const recent = projects.slice(0, 7);
  const initials = user.name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <main className="bg-background text-foreground flex justify-center px-5 pt-30 pb-10">
      <div className="w-full max-w-[500px]">
        {/* Intro */}
        <section>
          <div className="flex items-center gap-3">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="size-10 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="size-10 rounded-full bg-secondary flex items-center justify-center text-xs font-medium shrink-0">
                {initials}
              </div>
            )}
            <span className="text-[15px] font-semibold text-foreground">
              Hey, I'm {user.name.split(" ")[0]}.
            </span>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {profile.summary} Based in {profile.location}.{" "}
            {contactHref && (
              <a
                href={contactHref}
                target={linkedin ? "_blank" : undefined}
                rel={linkedin ? "noreferrer" : undefined}
                className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
              >
                Say hello
              </a>
            )}
          </p>
        </section>

        {/* Work */}
        <section className="mt-5">
          <SectionLabel>Work</SectionLabel>
          {current && (
            <div className="rounded-lg border border-border bg-secondary/40 px-4 py-3 flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
              <div className="min-w-0">
                <p className="text-sm font-medium">{current.position}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{current.company}</p>
              </div>
              <p className="text-xs text-muted-foreground shrink-0">
                {formatRange(current.startDate, current.endDate, current.isCurrent)}
              </p>
            </div>
          )}
          {previous.length > 0 && (
            <div className="mt-2">
              <button
                onClick={() => setShowPrev((v) => !v)}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md"
              >
                <ChevronDown
                  className={`size-3.5 transition-transform ${showPrev ? "rotate-180" : ""}`}
                />
                Previous roles
                <span className="ml-0.5 inline-flex items-center justify-center min-w-5 h-4 px-1 rounded bg-secondary text-[10px]">
                  {previous.length}
                </span>
              </button>
              {showPrev && (
                <ul className="mt-4 space-y-6">
                  {previous.map((e) => (
                    <li key={e._id} className="flex items-start justify-between gap-3 px-2">
                      <div className="min-w-0">
                        <p className="text-xs text-foreground/80">{e.position}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{e.company}</p>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {formatRange(e.startDate, e.endDate, e.isCurrent)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>

        {/* Recent work */}
        <section className="mt-10">
          <SectionLabel>Recent work</SectionLabel>
          <ul className="divide-y divide-border/60">
            {recent.map((p) => {
              const href = sanitizeUrl(p.link);
              const itemClass =
                "group flex items-center justify-between gap-4 py-2 px-1 hover:border-b transition-colors min-w-0";
              const label = (
                <>
                  <span className="text-[14px] text-foreground/90 group-hover:text-foreground truncate min-w-0">
                    {p.name}
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              );
              return (
                <li key={p._id} className="border-0">
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer" className={itemClass}>
                      {label}
                    </a>
                  ) : (
                    <Link to={`/projects/${slugify(p.name)}`} className={itemClass}>
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {children}
      </span>
      <span className="flex-1 h-px bg-border/60" />
    </div>
  );
}
