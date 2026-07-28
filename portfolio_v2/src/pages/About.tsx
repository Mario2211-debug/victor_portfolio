import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { portfolioQueryOptions, formatRange } from "@/lib/portfolio";
import { LoadingState, ErrorState } from "@/components/site/States";
import { Page, Section, SectionLabel } from "@/components/site/Page";
import { Tag } from "@/components/ui/Tag";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { useTitle } from "@/lib/useTitle";
import { copy } from "@/lib/copy";

export default function About() {
  useTitle(`${copy.about.title} — Mário Afonso`);
  const { data, isLoading, error, refetch } = useQuery(portfolioQueryOptions());

  if (isLoading) return <LoadingState shape="list" />;
  if (error || !data)
    return (
      <ErrorState error={(error as Error) ?? new Error("No data")} onRetry={() => refetch()} />
    );

  const { profile, experiences, education, skills } = data;

  return (
    <Page>
      <p className="text-xs tracking-wide text-fg-muted uppercase">{copy.about.eyebrow}</p>
      <h1 className="mt-4 text-2xl font-medium tracking-tight text-fg">{copy.about.title}</h1>
      <p className="mt-4 text-base text-fg-muted">{profile.summary}</p>

      <div className="mt-6">
        <a
          href="/Curriculum.pdf"
          className={buttonVariants({ variant: "outline", size: "sm" })}
          download
        >
          <Download aria-hidden className="size-4" />
          {copy.about.resume}
        </a>
      </div>

      {skills.length > 0 && (
        <Section>
          <SectionLabel>{copy.about.skills}</SectionLabel>
          <ul className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <li key={s._id}>
                <Tag>{s.technology}</Tag>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {experiences.length > 0 && (
        <Section>
          <SectionLabel>{copy.about.experience}</SectionLabel>
          <ul className="space-y-6">
            {experiences.map((e) => (
              <li key={e._id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-base font-medium text-fg">{e.position}</h3>
                    <p className="mt-1 text-xs text-fg-muted">{e.company}</p>
                  </div>
                  <Tag variant="meta">
                    {formatRange(e.startDate, e.endDate, e.isCurrent)}
                  </Tag>
                </div>
                {e.responsibilities && e.responsibilities.length > 0 && (
                  <p className="mt-2 text-sm text-fg-muted">{e.responsibilities.join(" ")}</p>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {education.length > 0 && (
        <Section>
          <SectionLabel>{copy.about.education}</SectionLabel>
          <ul className="space-y-6">
            {education.map((ed) => (
              <li key={ed._id}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-base font-medium text-fg">{ed.degree}</h3>
                    <p className="mt-1 text-xs text-fg-muted">{ed.institution}</p>
                  </div>
                  <Tag variant="meta">
                    {formatRange(ed.startDate, ed.endDate, ed.isCurrent)}
                  </Tag>
                </div>
                {ed.description && (
                  <p className="mt-2 text-sm text-fg-muted">{ed.description}</p>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </Page>
  );
}
