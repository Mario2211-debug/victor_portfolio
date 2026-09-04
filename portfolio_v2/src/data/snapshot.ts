import raw from "./portfolio.snapshot.json";
import type { Portfolio } from "@/lib/portfolio";

/**
 * O instantâneo que o build guardou (ver `scripts/snapshot.mjs`). Serve de
 * `initialData` à query: o site pinta o conteúdo real na primeira frame, sem
 * esperar por uma API que dorme.
 *
 * O ficheiro pode estar vazio — um build sem rede e sem instantâneo anterior
 * escreve `{}`. Nesse caso isto é `undefined` e a app volta ao caminho normal,
 * com skeleton e estado de erro. Os quatro estados continuam todos alcançáveis.
 */
function isPortfolio(value: unknown): value is Portfolio {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<Portfolio>;
  return (
    !!v.user?.name &&
    !!v.profile &&
    Array.isArray(v.projects) &&
    Array.isArray(v.experiences)
  );
}

export const PORTFOLIO_SNAPSHOT: Portfolio | undefined = isPortfolio(raw) ? raw : undefined;
