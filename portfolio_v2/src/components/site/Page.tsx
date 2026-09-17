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

/**
 * Rótulo de secção: pequeno, terciário, em sentence case.
 *
 * Era uma eyebrow em maiúsculas com `tracking-wide` (0.18em). Num produto denso
 * essa combinação destoa — o tracking largo é um padrão de cabeçalho editorial,
 * e ao lado de linhas de lista apertadas lê-se como outro sistema. O papel de
 * "isto é um rótulo, não conteúdo" já é feito pelo tamanho e pela cor.
 * As eyebrows de estado (`Error`, `404`) mantêm as maiúsculas: aí são um sinal,
 * não uma etiqueta de secção.
 */
export function SectionLabel({ children }: { children: ReactNode }) {
  return <h2 className="mb-3 text-xs font-medium text-fg-muted">{children}</h2>;
}
