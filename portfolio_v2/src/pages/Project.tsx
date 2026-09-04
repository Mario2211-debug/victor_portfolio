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
import { LoadingState, ErrorState, EmptyState } from "@/components/site/States";
import { Page, Section, SectionLabel } from "@/components/site/Page";
import { Tabs } from "@/components/ui/Tabs";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { useTitle } from "@/lib/useTitle";
import { copy } from "@/lib/copy";

const MILESTONES = [
  { label: "M1", projects: ["Libft", "ft_printf", "get_next_line", "Born2beRoot"] },
  { label: "M2", projects: ["Piscine Python (0 → 10)", "push_swap", "Amazing", "Exam 02"] },
  { label: "M3", projects: ["Fly-in", "Codexion", "Call-me-maybe"] },
  { label: "M4", projects: [] as string[] },
  { label: "M5", projects: [] as string[] },
  { label: "M6", projects: [] as string[] },
];

const MILESTONE_LABELS = MILESTONES.map((m) => m.label);

function NumberedList({ items }: { items: { name: string; description?: string }[] }) {
  return (
    <ol className="space-y-6">
      {items.map((it, idx) => (
        <li key={it.name} className="flex gap-3">
          <span className="numeric mt-1 shrink-0 text-xs text-fg-muted">
            {String(idx + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-fg">{it.name}</h3>
            {it.description && <p className="mt-1 text-sm text-fg-muted">{it.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

function Milestones({ items }: { items: ProjectItem[] }) {
  const [active, setActive] = useState(0);
  const milestone = MILESTONES[active];
  const descriptions = new Map(items.map((it) => [it.name.toLowerCase(), it.description]));

  return (
    <Section>
      <SectionLabel>{copy.project.milestones}</SectionLabel>
      <Tabs
        label={copy.project.milestonesLabel}
        tabs={MILESTONE_LABELS}
        value={active}
        onValueChange={setActive}
      >
        {milestone.projects.length === 0 ? (
          /* Um estado vazio é um convite, não um relatório: leva a pessoa ao
             que existe em vez de a informar de que não existe nada (10). */
          <EmptyState
            title={copy.project.upcomingTitle}
            body={copy.project.upcomingBody}
            action={
              <Button variant="outline" size="sm" onClick={() => setActive(0)}>
                {copy.project.upcomingAction}
              </Button>
            }
          />
        ) : (
          <NumberedList
            items={milestone.projects.map((name) => ({
              name,
              description: descriptions.get(name.toLowerCase()),
            }))}
          />
        )}
      </Tabs>
    </Section>
  );
}

export default function Project() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error, refetch } = useQuery(portfolioQueryOptions());

  const project = findProjectBySlug(data, slug);
  useTitle(project ? `${project.name} — Mário Afonso` : `${copy.project.notFoundTitle}`);

  if (isLoading) return <LoadingState shape="article" />;
  // `!data`, não `error || !data`: uma revalidação falhada com o instantâneo em
  // mão não põe a página em erro — o conteúdo está lá, só não é o mais recente.
  if (!data)
    return (
      <ErrorState error={(error as Error) ?? new Error("No data")} onRetry={() => refetch()} />
    );

  if (!project) {
    return (
      <Page>
        <h1 className="sr-only">{copy.project.notFoundTitle}</h1>
        <EmptyState
          title={copy.project.notFoundTitle}
          body={copy.project.notFoundBody}
          action={
            <Link to="/" className={buttonVariants({ size: "sm" })}>
              {copy.project.backToWork}
            </Link>
          }
        />
      </Page>
    );
  }

  const link = sanitizeUrl(project.link);
  const tags = [...project.technologies, ...(project.tools ?? [])];
  const is42 = project.course === "42 Porto";

  return (
    <Page>
      <article>
        <Link
          to="/"
          className="interactive motion-micro -mx-2 inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm text-fg-muted hover:bg-surface hover:text-fg"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {copy.project.backToWork}
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
            {(project.course ?? project.category) && <Tag>{project.course ?? project.category}</Tag>}
            {project.startDate && (
              <Tag variant="meta">
                {formatRange(project.startDate, project.endDate, project.isCurrent)}
              </Tag>
            )}
          </div>
          <h1 className="mt-3 text-2xl font-medium tracking-tight text-fg">{project.name}</h1>
          <p className="mt-4 text-base text-fg-muted">{project.description}</p>
          {project.context && <p className="mt-2 text-base text-fg-muted">{project.context}</p>}
        </header>

        {tags.length > 0 && (
          <Section>
            <ul className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {is42 ? (
          <Milestones items={project.items ?? []} />
        ) : (
          project.items &&
          project.items.length > 0 && (
            <Section>
              <SectionLabel>{copy.project.highlights}</SectionLabel>
              <NumberedList items={project.items} />
            </Section>
          )
        )}

        {link && (
          <Section>
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "sm" })}
            >
              {copy.project.viewProject}
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </Section>
        )}
      </article>
    </Page>
  );
}
