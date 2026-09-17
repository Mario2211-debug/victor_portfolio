import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import {
  portfolioQueryOptions,
  sanitizeUrl,
  slugify,
  formatRange,
  groupProjects,
  PROFILE_PHOTO_URL,
  type Project,
  type ProjectGroup,
} from "@/lib/portfolio";
import { LoadingState, ErrorState, EmptyState } from "@/components/site/States";
import { Page, Section, SectionLabel } from "@/components/site/Page";
import { Disclosure } from "@/components/ui/Disclosure";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { useTitle } from "@/lib/useTitle";
import { copy } from "@/lib/copy";
/** Stagger só na primeira montagem da sessão: à décima visita é espera (06). */
let staggerSpent = false;
const STAGGER_MS = 30;
const STAGGER_LIMIT = 6;
/**
 * Linhas visíveis por grupo. O resto fica atrás de um disclosure com contador:
 * a Home continua a ler-se em menos de um minuto mesmo com a 42 inteira listada.
 */
const GROUP_VISIBLE = 4;

function groupLabel(group: ProjectGroup) {
  if (group.kind === "clients") return copy.home.groupClients;
  if (group.kind === "products") return copy.home.groupProducts;
  return group.label ?? copy.home.groupCoursework;
}

function ProjectRow({ project, staggerIndex }: { project: Project; staggerIndex?: number }) {
  const href = sanitizeUrl(project.link);
  const stack = project.technologies.slice(0, 2).join(" · ");
  const rowClass =
    // Denso no rato, confortável no dedo. As linhas ficaram em 34px depois de
    // lhes tirar os separadores e apertar o `py`, e 34px é abaixo do mínimo de
    // alvo de toque do `07`. Crescer o alvo com o `::after` do `touch-target`
    // não serve aqui: as linhas são adjacentes, e alvos de 44px sobre linhas de
    // 34px sobrepunham-se 5px de cada lado — tocar na margem acertaria na linha
    // errada. Em ponteiro grosseiro cresce a própria linha.
    "interactive motion-micro group -mx-2 flex min-w-0 items-center justify-between gap-4 rounded-md px-2 py-1 pointer-coarse:py-4 hover:bg-surface";
  const inner = (
    <>
      <span className="min-w-0 truncate text-sm text-fg-muted group-hover:text-fg">
        {project.name}
      </span>
      <span className="flex shrink-0 items-center gap-3">
        {/* A stack é contexto, não navegação: some no telemóvel antes de o nome truncar. */}
        {stack && <span className="hidden text-xs text-fg-muted sm:inline">{stack}</span>}
        <ArrowUpRight
          aria-hidden
          className="motion-micro size-4 text-fg-muted group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
        />
      </span>
    </>
  );
  const animate = staggerIndex !== undefined && staggerIndex < STAGGER_LIMIT;
  return (
    <li
      style={animate ? { animationDelay: `${staggerIndex * STAGGER_MS}ms` } : undefined}
      className={animate ? "animate-enter" : undefined}
    >
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className={rowClass}>
          {inner}
        </a>
      ) : (
        <Link to={`/projects/${slugify(project.name)}`} className={rowClass}>
          {inner}
        </Link>
      )}
    </li>
  );
}

export default function Home() {
  useTitle();
  const { data, isLoading, error, refetch } = useQuery(portfolioQueryOptions());
  // Lido uma vez na montagem; gasto num efeito, para o render se manter puro.
  const [stagger] = useState(() => !staggerSpent);
  useEffect(() => {
    staggerSpent = true;
  }, []);

  if (isLoading) return <LoadingState shape="home" />;
  // `!data`, não `error || !data`: uma revalidação falhada com o instantâneo em
  // mão não põe a página em erro — o conteúdo está lá, só não é o mais recente.
  if (!data)
    return (
      <ErrorState error={(error as Error) ?? new Error("No data")} onRetry={() => refetch()} />
    );

  const { user, profile, experiences, projects } = data;
  const linkedin = sanitizeUrl(profile.contact?.linkedin);
  const email = profile.contact?.email;
  const contactHref = linkedin ?? (email ? `mailto:${email}` : undefined);
  const current = experiences.find((e) => e.isCurrent) ?? experiences[0];
  const previous = experiences.filter((e) => e._id !== current?._id);
  const groups = groupProjects(projects);
  // O stagger atravessa os grupos: conta só as linhas visíveis dos grupos anteriores.
  const staggerOffsets = groups.map((_, i) =>
    groups.slice(0, i).reduce((n, g) => n + Math.min(g.projects.length, GROUP_VISIBLE), 0),
  );

  return (
    <Page>
      {/* Intro */}
      <section>
        <div className="flex flex-1 items-center gap-3">
          <img
            src={PROFILE_PHOTO_URL}
            alt=""
            width={60}
            height={60}
            draggable={false}
            /* Dimensões reservadas: zero layout shift quando a imagem chega.
               A borda interior impede o avatar de flutuar sobre o fundo (01) —
               e aqui separa o fundo branco da foto do fundo escuro do tema. */
            className="size-15 shrink-0 rounded-full bg-surface object-cover inset-ring inset-ring-border-subtle"
          />
          <div className="flex flex-col">
            <h1 className="text-base font-semibold text-fg">
            {copy.home.greeting(user.name.split(" ")[0])}
          </h1>
          <p className="text-fg-muted">{copy.home.role}</p>
          </div>
        </div>

        <p className="mt-8 text-base text-fg-muted">
          {profile.summary}{" "}
          {contactHref && (
            <a
              href={contactHref}
              target={linkedin ? "_blank" : undefined}
              rel={linkedin ? "noreferrer" : undefined}
              className="motion-micro rounded-md text-fg underline decoration-fg-muted underline-offset-4 hover:decoration-fg"
            >
              {copy.home.sayHello}
            </a>
          )}
        </p>
      </section>

      {/* Work */}
      <Section>
        <SectionLabel>{copy.home.work}</SectionLabel>
        {current && (
          /* Um só mecanismo de separação: fundo. Sem borda por cima (01). */
          <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1 rounded-md bg-surface px-4 py-3">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm font-medium text-fg">
                {/* O único laranja visível do produto: isto é o presente.
                    `aria-hidden` porque não acrescenta informação — o intervalo
                    de datas já diz "Present", e um estado nunca deve depender só
                    de cor (09). O ponto reforça, não informa. */}
                {current.isCurrent && (
                  <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent-hover" />
                )}
                {current.position}
              </p>
              <p className="mt-1 text-xs text-fg-muted">{current.company}</p>
            </div>
            <p className="numeric shrink-0 text-xs text-fg-muted">
              {formatRange(current.startDate, current.endDate, current.isCurrent)}
            </p>
          </div>
        )}

        {previous.length > 0 && (
          <Disclosure
            label={copy.home.previousRoles}
            count={previous.length}
            className="mt-2"
          >
            <ul className="mt-3 space-y-4 px-2">
              {previous.map((e) => (
                <li key={e._id} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-fg">{e.position}</p>
                    <p className="mt-1 text-xs text-fg-muted">{e.company}</p>
                  </div>
                  <span className="numeric shrink-0 text-xs text-fg-muted">
                    {formatRange(e.startDate, e.endDate, e.isCurrent)}
                  </span>
                </li>
              ))}
            </ul>
          </Disclosure>
        )}
      </Section>

      {/* Projetos — o momento herói. Agrupados pelo contexto em que foram feitos
          (clientes, produtos próprios, um grupo por curso); dentro de cada grupo,
          uma linha por projeto, percorrível inteira a teclado. */}
      <Section>
        <SectionLabel>{copy.home.projects}</SectionLabel>
        {projects.length === 0 ? (
          <EmptyState
            title={copy.home.noProjectsTitle}
            body={copy.home.noProjectsBody}
            action={
              contactHref && (
                <a href={contactHref} className={buttonVariants({ size: "sm" })}>
                  {copy.home.noProjectsAction}
                </a>
              )
            }
          />
        ) : (
          <div className="space-y-6">
            {groups.map((group, groupIndex) => {
              const shown = group.projects.slice(0, GROUP_VISIBLE);
              const more = group.projects.slice(GROUP_VISIBLE);
              return (
                <div key={group.key}>
                  <h3 className="mb-1 text-sm font-medium text-fg">{groupLabel(group)}</h3>
                  <ul>
                    {shown.map((p, index) => (
                      <ProjectRow
                        key={p._id}
                        project={p}
                        staggerIndex={stagger ? staggerOffsets[groupIndex] + index : undefined}
                      />
                    ))}
                  </ul>
                  {more.length > 0 && (
                    <Disclosure label={copy.home.moreProjects} count={more.length} className="mt-1">
                      <ul>
                        {more.map((p) => (
                          <ProjectRow key={p._id} project={p} />
                        ))}
                      </ul>
                    </Disclosure>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </Page>
  );
}
