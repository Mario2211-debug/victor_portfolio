import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * FASE 3 — Layout e densidade.
 *
 * Uma só largura de coluna em todo o produto. Antes eram três (500 / 600 / 640),
 * o que é a razão mais comum para um produto parecer feito por três pessoas
 * diferentes. A decisão de densidade da Fase 0 — **denso** — vive aqui.
 *
 * Ritmo: 48px entre secções, 16px do rótulo ao conteúdo, 12px dentro de um
 * grupo. O espaço entre grupos é sempre maior que o espaço dentro do grupo (01).
 */
export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <main id="content" tabIndex={-1} className={cn("flex justify-center px-6 pt-page-top pb-12", className)}>
      <div className="w-full max-w-measure">{children}</div>
    </main>
  );
}

/** Distância padrão entre secções. Nenhuma página inventa a sua. */
export function Section({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("mt-12", className)}>{children}</section>;
}

/** Eyebrow: maiúsculas pequenas, tracking positivo, texto terciário (03). */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 text-xs font-normal tracking-wide text-fg-muted uppercase">{children}</h2>
  );
}
