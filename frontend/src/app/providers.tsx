"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SWRConfig } from "swr";
import { swrConfig } from "@/lib/swr-config";

export function Providers({ children }: { children: React.ReactNode }) {
  // Proteção: alguns scripts externos (ex: widgets de compartilhamento)
  // podem tentar acessar elementos como `document.getElementById('share-modal')`
  // e chamar `.addEventListener` mesmo quando o elemento não existe —
  // isso causa `Cannot read properties of null (reading 'addEventListener')`.
  // Patchamos `getElementById` no cliente para devolver um elemento "dummy"
  // somente para ids relacionados a share, evitando o erro e limitando o impacto.
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const original = document.getElementById.bind(document);

    function createDummy() {
      const noOp = () => {};
      const dummy: Partial<HTMLElement> = {
        addEventListener: noOp,
        removeEventListener: noOp,
        classList: { add: noOp, remove: noOp, contains: () => false, toggle: noOp } as unknown as DOMTokenList,
        // appendChild not required for dummy; omit to avoid incompatible signatures
        querySelector: () => null,
        dataset: {},
      };
      return dummy as HTMLElement;
    }

    function patched(id: string | null) {
      try {
        const res = original(id as string);
        if (res) return res;
        // Apenas interceptar ids que pareçam relacionados a compartilhamento/modal
        if (!id) return null;
        const lower = id.toLowerCase();
        if (lower.includes("share") || lower.includes("share-modal") || lower.includes("sharemodal")) {
          return createDummy();
        }
        return null;
      } catch (e) {
        return null;
      }
    }

    // @ts-ignore - runtime patch
    document.getElementById = patched;

    return () => {
      // Restaurar original ao desmontar
      // @ts-ignore
      document.getElementById = original;
    };
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SWRConfig value={swrConfig}>{children}</SWRConfig>
    </NextThemesProvider>
  );
}
