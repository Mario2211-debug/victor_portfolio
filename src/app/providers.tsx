"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { lightTheme, darkTheme } from "./theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
