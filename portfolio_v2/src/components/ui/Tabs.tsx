import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * FASE 2 — Primitivo composto: tabs com teclado completo (`04`).
 *
 * Roving tabindex: `Tab` entra e sai do grupo de uma vez; as setas percorrem,
 * `Home`/`End` saltam para os extremos. O separador ativo não é comunicado só
 * por cor — ganha superfície, peso e `aria-selected` (09).
 */
export function Tabs({
  label,
  tabs,
  value,
  onValueChange,
  children,
}: {
  label: string;
  tabs: readonly string[];
  value: number;
  onValueChange: (index: number) => void;
  children: ReactNode;
}) {
  const id = useId();
  const listRef = useRef<HTMLDivElement>(null);

  function focusTab(index: number) {
    onValueChange(index);
    const el = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index];
    el?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = tabs.length - 1;
    const next = {
      ArrowRight: value === last ? 0 : value + 1,
      ArrowLeft: value === 0 ? last : value - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    focusTab(next);
  }

  return (
    <>
      <div
        ref={listRef}
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-1"
      >
        {tabs.map((tab, index) => {
          const selected = index === value;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              id={`${id}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${id}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onValueChange(index)}
              className={cn(
                "interactive touch-target motion-micro numeric rounded-full px-3 py-2 text-xs",
                selected
                  ? "bg-surface-active font-medium text-fg"
                  : "text-fg-muted hover:bg-surface hover:text-fg",
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-${value}`}
        aria-labelledby={`${id}-tab-${value}`}
        tabIndex={0}
        className="mt-6 focus-visible:outline-none"
      >
        {children}
      </div>
    </>
  );
}
