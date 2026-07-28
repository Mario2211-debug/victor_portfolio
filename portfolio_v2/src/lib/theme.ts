import { useCallback, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

/**
 * Dark is the default: `index.html` resolves the stored preference and stamps
 * `.light` on <html> before the first paint, so there is no theme flash
 * (07 — estabilidade visual). This module only has to stay in sync with it.
 */
export function currentTheme(): Theme {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function setTheme(theme: Theme) {
  document.documentElement.classList.toggle("light", theme === "light");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the theme still applies for this visit.
  }
  emit();
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => "dark" as Theme);
  const toggle = useCallback(() => {
    setTheme(currentTheme() === "light" ? "dark" : "light");
  }, []);
  return { theme, toggle };
}
