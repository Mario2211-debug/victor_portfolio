import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  portfolioQueryOptions,
  findProjectBySlug,
  formatRange,
  sanitizeUrl,
  type ProjectItem,
} from "@/lib/portfolio";
import { LoadingState, ErrorState } from "@/components/site/States";
import { useTitle } from "@/lib/useTitle";
import { cn } from "@/lib/utils";

const MILESTONES = [
  { label: "M1", projects: ["Libft", "ft_printf", "get_next_line", "Born2beRoot"] },
  { label: "M2", projects: ["Piscine Python (0 → 10)", "push_swap", "Amazing", "Exam 02"] },
  { label: "M3", projects: ["Fly-in", "Codexion", "Call-me-maybe"] },
  { label: "M4", projects: [] as string[] },
  { label: "M5", projects: [] as string[] },
  { label: "M6", projects: [] as string[] },
];

function M42Milestones({ items }: { items: ProjectItem[] }) {
  const [active, setActive] = useState(0);
  const milestone = MILESTONES[active];
  const descriptions = new Map(items.map((it) => [it.name.toLowerCase(), it.description]));

  return (
    <section className="mt-10">
      <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        Milestones
      </p>
      <div className="flex flex-wrap gap-1">
        {MILESTONES.map((m, idx) => (
          <button
            key={m.label}
            onClick={() => setActive(idx)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs border border-border/60 transition-colors",
              idx === active
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {milestone.projects.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">Under construction.</p>
        ) : (
          <ol className="space-y-5">
            {milestone.projects.map((name, idx) => {
              const description = descriptions.get(name.toLowerCase());
              return (
                <li key={name} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-xs text-muted-foreground tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground/90">{name}</p>
                    {description && (
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
}

export default function Project() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error, refetch } = useQuery(portfolioQueryOptions());

  const project = findProjectBySlug(data, slug);
  useTitle(project ? `${project.name} — Mário Afonso` : "Project — Mário Afonso");

  if (isLoading) return <LoadingState />;
  if (error || !data)
    return <ErrorState error={(error as Error) ?? new Error("No data")} onRetry={() => refetch()} />;

  if (!project) {
    return (
      <main className="bg-background text-foreground flex justify-center px-5 pt-24 pb-16">
        <div className="w-full max-w-[640px]">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to work
          </Link>
          <h1 className="mt-8 text-2xl font-semibold tracking-tight">Project not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This project doesn't exist or is no longer listed.
          </p>
        </div>
      </main>
    );
  }

  const link = sanitizeUrl(project.link);
  const tags = [...project.technologies, ...(project.tools ?? [])];
  const is42 = project.course === "42 Porto";

  return (
    <main className="bg-background text-foreground flex justify-center px-5 pt-24 pb-20">
      <article className="w-full max-w-[640px]">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to work
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {(project.course ?? project.category) && (
              <span className="inline-flex items-center rounded-md border border-border/60 bg-secondary/30 px-2 py-0.5">
                {project.course ?? project.category}
              </span>
            )}
            {project.startDate && (
              <>
                <span className="opacity-40">·</span>
                <span>{formatRange(project.startDate, project.endDate, project.isCurrent)}</span>
              </>
            )}
          </div>
          <h1 className="mt-3 text-[clamp(1.9rem,4.5vw,2.6rem)] leading-[1.08] tracking-[-0.02em] font-medium">
            {project.name}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          {project.context && (
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              {project.context}
            </p>
          )}
        </header>

        {tags.length > 0 && (
          <section className="mt-8 border-t border-border/60 pt-6">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-md border border-border/60 bg-secondary/30 px-2.5 py-1 text-xs text-foreground/85"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {is42 ? (
          <M42Milestones items={project.items ?? []} />
        ) : (
          project.items &&
          project.items.length > 0 && (
            <section className="mt-10">
              <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Highlights
              </p>
              <ol className="space-y-5">
                {project.items.map((it, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-0.5 shrink-0 text-xs text-muted-foreground tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground/90">{it.name}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                        {it.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )
        )}

        {link && (
          <div className="mt-10 border-t border-border/60 pt-6">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
            >
              View project
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        )}
      </article>
    </main>
  );
}
