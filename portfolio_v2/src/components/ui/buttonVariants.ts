import { cn } from "@/lib/utils";

/**
 * Variantes do botão, declaradas (`04`) e num módulo próprio: uma ação de
 * navegação usa estas classes num `<a>`, porque um `<button>` dentro de um
 * `<a>` é um bug de acessibilidade, não um detalhe.
 */

export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "icon";

const base =
  "interactive touch-target motion-micro inline-flex items-center justify-center gap-2 " +
  "font-medium whitespace-nowrap active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100";

const variants: Record<ButtonVariant, string> = {
  /** Um por ecrã. Se há dois, um deles não é primário (01). */
  solid: "bg-solid text-on-solid hover:bg-solid-hover rounded-full",
  outline:
    "border border-border bg-transparent text-fg hover:bg-surface hover:border-border-hover rounded-full",
  /** Sem fundo nenhum, em repouso ou em hover — só o ícone/texto muda de passo.
      É o que os controlos do header usam: desde que a barra deixou de ter
      contentor, a única superfície ali é o item ativo, e um botão preenchido
      ao lado passava a competir com ele. */
  ghost: "text-fg-muted hover:text-fg rounded-md",
  link:
    "text-fg underline underline-offset-4 decoration-fg-muted hover:decoration-fg " +
    "rounded-md px-0 h-auto",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  icon: "size-10 p-0 rounded-full",
};

export function buttonVariants({
  variant = "solid",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  // A variante vem depois do tamanho: é ela que decide o raio quando os dois
  // o declaram (`icon` é pílula por defeito, `surface` não).
  return cn(base, variant === "link" ? "" : sizes[size], variants[variant], className);
}
