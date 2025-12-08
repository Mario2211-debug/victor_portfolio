"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Usar classe padrão durante SSR para evitar mismatch de hidratação
  const borderClass = mounted && theme === "dark" ? "border-neutral-700" : "border-neutral-300";

  return (
    <footer className={`border-t ${borderClass} py-6 md:py-0`}>
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Mário Afonso. The source code is available on{" "}
            <Link
              href="https://github.com/Mario2211-debug"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
