import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * FASE 2 — Primitivo composto.
 *
 * Não há aqui um dialog, select ou popover para reconstruir (o `04` proíbe-o e
 * com razão), mas um disclosure tem contrato próprio e tinha de o cumprir:
 * `aria-expanded`, `aria-controls`, e `Esc` fecha o que está aberto.
 *
 * A entrada anima só `opacity` e `transform` — a altura não é animada de
 * propósito: `height` força layout a cada frame (06).
 */
export function Disclosure({
  label,
  count,
  children,
  className,
}: {
  label: string;
  count?: number;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const panelId = `${id}-panel`;

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape" && open) {
      e.stopPropagation();
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  return (
    <div className={className} onKeyDown={onKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "interactive touch-target motion-micro group inline-flex items-center gap-2",
          "rounded-md px-2 py-2 text-xs text-fg-muted hover:text-fg hover:bg-surface",
        )}
      >
        <ChevronDown
          aria-hidden
          className={cn("size-4 motion-micro", open && "rotate-180")}
        />
        {label}
        {count !== undefined && (
          <span className="numeric inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-surface px-1 text-xs text-fg-muted">
            {count}
          </span>
        )}
      </button>

      {/* `hidden` em vez de desmontar: o conteúdo mantém o estado e o leitor de
          ecrã encontra sempre a região referida por aria-controls.
          A entrada é uma *animação*, não uma transição: de `display:none` para
          visível o browser não tem estado inicial para interpolar, e uma
          `transition` simplesmente não corre. */}
      <div id={panelId} hidden={!open} className={cn(open && "animate-enter")}>
        {children}
      </div>
    </div>
  );
}
