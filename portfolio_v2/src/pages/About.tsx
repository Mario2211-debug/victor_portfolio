import { useQuery } from "@tanstack/react-query";
import { portfolioQueryOptions, formatRange } from "@/lib/portfolio";
import { LoadingState, ErrorState } from "@/components/site/States";
import { useTitle } from "@/lib/useTitle";

export default function About() {
  useTitle("About — Mário Afonso");
  const { data, isLoading, error, refetch } = useQuery(portfolioQueryOptions());
  if (isLoading) return <LoadingState />;
  if (error || !data)
    return <ErrorState error={(error as Error) ?? new Error("No data")} onRetry={() => refetch()} />;

  const { profile, experiences, education, skills } = data;

  return (
    <main className="bg-background text-foreground flex justify-center px-5 pt-24 pb-16">
      <div className="w-full max-w-[600px]">
        <h1 className="text-[clamp(2.25rem,6vw,3rem)] leading-[1.02] tracking-[-0.03em] font-medium">
          About Me
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{profile.summary}</p>

        {skills.length > 0 && (
          <section className="mt-12">
            <SectionLabel>Skills &amp; Technologies</SectionLabel>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s._id}
                  className="inline-flex items-center rounded-md border border-border/60 bg-secondary/30 px-2.5 py-1 text-xs text-foreground/85"
                >
                  {s.technology}
                </span>
              ))}
            </div>
          </section>
        )}

        {experiences.length > 0 && (
          <section className="mt-12">
            <SectionLabel>Experience</SectionLabel>
            <ul className="space-y-6">
              {experiences.map((e) => (
                <li key={e._id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[15px] font-medium leading-tight">{e.position}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{e.company}</p>
                    </div>
                    <span className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/40 border border-border/60 rounded px-1.5 py-0.5">
                      {formatRange(e.startDate, e.endDate, e.isCurrent)}
                    </span>
                  </div>
                  {e.responsibilities && e.responsibilities.length > 0 && (
                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                      {e.responsibilities.join(" ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {education.length > 0 && (
          <section className="mt-12">
            <SectionLabel>Education</SectionLabel>
            <ul className="space-y-6">
              {education.map((ed) => (
                <li key={ed._id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[15px] font-medium leading-tight">{ed.degree}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{ed.institution}</p>
                    </div>
                    <span className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/40 border border-border/60 rounded px-1.5 py-0.5">
                      {formatRange(ed.startDate, ed.endDate, ed.isCurrent)}
                    </span>
                  </div>
                  {ed.description && (
                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                      {ed.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {children}
      </span>
      <span className="flex-1 h-px bg-border/60" />
    </div>
  );
}
