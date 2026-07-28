import { useState, type ReactNode } from "react";
import { Page, Section } from "@/components/site/Page";
import { Button } from "@/components/ui/Button";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";
import { FALLBACK_CONTACT_URL } from "@/lib/portfolio";
import { copy } from "@/lib/copy";

/**
 * FASE 4 — Os quatro estados.
 *
 * O caminho feliz é a parte fácil. Isto é a fase que se salta e é a fase onde
 * se ganha, por isso está tudo num sítio só: loading, vazio e erro.
 */

/* --------------------------------------------------------------------------
   Loading — skeleton, não spinner.
   A forma é a da página que vem a caminho, para que a chegada dos dados não
   seja um salto de layout (08 — Doherty).
   -------------------------------------------------------------------------- */

export type LoadingShape = "home" | "list" | "article";

export function LoadingState({ shape = "home" }: { shape?: LoadingShape }) {
  return (
    <Page>
      <div role="status" aria-live="polite" aria-busy="true">
        <span className="sr-only">{copy.states.loading}</span>

        {shape === "home" && (
          <>
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <SkeletonText className="w-40" />
            </div>
            <div className="mt-4 space-y-2">
              <SkeletonText className="w-full" />
              <SkeletonText className="w-11/12" />
              <SkeletonText className="w-2/3" />
            </div>
            <Section>
              <SkeletonText className="mb-4 w-16" />
              <Skeleton className="h-16 w-full" />
            </Section>
            <Section>
              <SkeletonText className="mb-4 w-24" />
              <ListSkeleton rows={6} />
            </Section>
          </>
        )}

        {shape === "list" && (
          <>
            <SkeletonText className="w-12" />
            <Skeleton className="mt-4 h-8 w-3/5" />
            <SkeletonText className="mt-4 w-4/5" />
            <div className="mt-12">
              <ListSkeleton rows={5} tall />
            </div>
          </>
        )}

        {shape === "article" && (
          <>
            <SkeletonText className="w-24" />
            <Skeleton className="mt-8 h-8 w-11/12" />
            <div className="mt-4 space-y-2">
              <SkeletonText className="w-full" />
              <SkeletonText className="w-5/6" />
            </div>
            <div className="mt-12 space-y-3">
              {Array.from({ length: 8 }, (_, i) => (
                <SkeletonText key={i} className={i % 4 === 3 ? "w-2/3" : "w-full"} />
              ))}
            </div>
          </>
        )}
      </div>
    </Page>
  );
}

function ListSkeleton({ rows, tall = false }: { rows: number; tall?: boolean }) {
  const widths = ["w-2/3", "w-1/2", "w-3/5", "w-5/12", "w-7/12", "w-1/2"];
  return (
    <ul>
      {Array.from({ length: rows }, (_, i) => (
        <li key={i} className={tall ? "py-3" : "py-2"}>
          <SkeletonText className={widths[i % widths.length]} />
          {tall && <SkeletonText className="mt-2 w-1/3" />}
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------------------------------------------------
   Vazio — o que é isto + uma ação. "Sem dados" é uma falha (10).
   -------------------------------------------------------------------------- */

export function EmptyState({
  title,
  body,
  action,
  className,
}: {
  title: string;
  body: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-sm font-medium text-fg">{title}</p>
      <p className="mt-1 text-sm text-fg-muted">{body}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Erro — o que aconteceu + o que fazer a seguir. Nunca um código sozinho: o
   detalhe técnico fica em terciário, para quem o quiser reportar (10).
   Ao fim de três tentativas deixa de sugerir o que já não vai resultar.
   -------------------------------------------------------------------------- */

const MAX_RETRIES = 3;

export function ErrorState({
  error,
  onRetry,
}: {
  error: Error;
  /** Devolve a promessa da retentativa: é ela que sustenta o estado "Retrying…". */
  onRetry: () => void | Promise<unknown>;
}) {
  const [attempts, setAttempts] = useState(0);
  const [retrying, setRetrying] = useState(false);
  const exhausted = attempts >= MAX_RETRIES;

  async function retry() {
    setRetrying(true);
    setAttempts((n) => n + 1);
    try {
      await onRetry();
    } finally {
      setRetrying(false);
    }
  }

  return (
    <Page>
      <div role="alert">
        <p className="text-xs tracking-wide text-danger-fg uppercase">{copy.states.errorEyebrow}</p>
        <h1 className="mt-4 text-2xl font-medium tracking-tight text-fg">
          {copy.states.errorTitle}
        </h1>
        <p className="mt-4 text-base text-fg-muted">
          {exhausted ? copy.states.errorGiveUpBody : copy.states.errorBody}
        </p>

        <div className="mt-8">
          {exhausted ? (
            /* Ação de navegação = link, nunca um <button> a fingir (09). */
            <a
              href={FALLBACK_CONTACT_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants()}
            >
              {copy.states.errorGiveUpAction}
            </a>
          ) : (
            /* Largura reservada: o botão em loading não encolhe (07). */
            <Button onClick={retry} disabled={retrying} className="min-w-28">
              {retrying ? copy.states.errorRetrying : copy.states.errorRetry}
            </Button>
          )}
        </div>

        <p className="mt-8 text-xs text-fg-muted">{copy.states.errorDetail(error.message)}</p>
      </div>
    </Page>
  );
}
