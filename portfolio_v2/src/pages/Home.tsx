import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { portfolioQueryOptions, sanitizeUrl, slugify, formatRange } from "@/lib/portfolio";
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

export default function Home() {
  useTitle();
  const { data, isLoading, error, refetch } = useQuery(portfolioQueryOptions());
  // Lido uma vez na montagem; gasto num efeito, para o render se manter puro.
  const [stagger] = useState(() => !staggerSpent);
  useEffect(() => {
    staggerSpent = true;
  }, []);

  if (isLoading) return <LoadingState shape="home" />;
  if (error || !data)
    return (
      <ErrorState error={(error as Error) ?? new Error("No data")} onRetry={() => refetch()} />
    );

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
    <Page>
      {/* Intro */}
      <section>
        <div className="flex items-center gap-3">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              width={40}
              height={40}
              draggable={false}
              /* Dimensões reservadas: zero layout shift quando a imagem chega.
                 A borda interior impede o avatar de flutuar sobre o fundo (01). */
              className="size-10 shrink-0 rounded-full bg-surface object-cover inset-ring inset-ring-border-subtle"
            />
          ) : (
            <div
              aria-hidden
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-medium"
            >
              {initials}
            </div>
          )}
          <h1 className="text-base font-semibold text-fg">
            {copy.home.greeting(user.name.split(" ")[0])}
          </h1>
        </div>

        <p className="mt-4 text-base text-fg-muted">
          {profile.summary} {copy.home.basedIn(profile.location)}{" "}
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
                  <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
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
            className="mt-2 -ml-2"
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

      {/* Recent work — o momento herói. Uma linha por projeto, percorrível
          inteira a teclado, com a resposta a chegar em pointerdown. */}
      <Section>
        <SectionLabel>{copy.home.recentWork}</SectionLabel>
        {recent.length === 0 ? (
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
          <ul>
            {recent.map((p, index) => {
              const href = sanitizeUrl(p.link);
              const rowClass =
                // Denso no rato, confortável no dedo. As linhas ficaram em 34px depois de
                // lhes tirar os separadores e apertar o `py`, e 34px é abaixo do mínimo de
                // alvo de toque do `07`. Crescer o alvo com o `::after` do `touch-target`
                // não serve aqui: as linhas são adjacentes, e alvos de 44px sobre linhas de
                // 34px sobrepunham-se 5px de cada lado — tocar na margem acertaria na linha
                // errada. Em ponteiro grosseiro cresce a própria linha.
                "interactive motion-micro group -mx-2 flex min-w-0 items-center justify-between gap-4 rounded-md px-2 py-2 pointer-coarse:py-4 hover:bg-surface";
              const inner = (
                <>
                  <span className="min-w-0 truncate text-sm text-fg-muted group-hover:text-fg">
                    {p.name}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="motion-micro size-4 text-fg-muted group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                  />
                </>
              );
              const style =
                stagger && index < STAGGER_LIMIT
                  ? { animationDelay: `${index * STAGGER_MS}ms` }
                  : undefined;
              return (
                <li
                  key={p._id}
                  style={style}
                  className={stagger && index < STAGGER_LIMIT ? "animate-enter" : undefined}
                >
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer" className={rowClass}>
                      {inner}
                    </a>
                  ) : (
                    <Link to={`/projects/${slugify(p.name)}`} className={rowClass}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Section>
    </Page>
  );
}
