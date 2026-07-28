import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Etiqueta não interativa: tecnologia, categoria, intervalo de datas.
 * Um só mecanismo de separação — fundo de superfície, sem borda por cima (01).
 */
export function Tag({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "meta";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-surface px-2 py-1 text-xs text-fg-muted",
        variant === "meta" && "numeric whitespace-nowrap",
        className,
      )}
    >
      {children}
    </span>
  );
}
