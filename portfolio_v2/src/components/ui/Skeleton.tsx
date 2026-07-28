import { cn } from "@/lib/utils";

/**
 * Skeleton, não spinner (Fase 4 + Doherty no `08`): mostra a forma do que vem
 * a caminho, para que a chegada dos dados não seja um salto de layout.
 */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-skeleton rounded-md bg-surface", className)} aria-hidden />;
}

/** Uma linha de texto de altura fixa — evita reflow quando o texto real chega. */
export function SkeletonText({ className }: { className?: string }) {
  return <Skeleton className={cn("h-3", className)} />;
}
