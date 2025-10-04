/**
 * Layout principal da aplicação
 * 
 * Este componente define a estrutura base do portfólio, incluindo:
 * - Configuração de fontes
 * - Providers de contexto
 * - Componentes globais (toolbar, footer, particles)
 * - Analytics e métricas de performance
 */

"use client"
import "./globals.css";
import { metadata } from "@/app/metadata";
import { Inter } from "next/font/google";
import { Noto_Sans } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

// Importações de componentes
import { TaskProvider } from "@/components/taskContext";
import { Providers } from "./providers";
import Particles from "./util/Particles";
import Footer from "@/components/footer";
import BottomToolbar from "@/components/BottomToolbar";

// ============================================================================
// CONFIGURAÇÃO DE FONTES
// ============================================================================

/**
 * Configuração das fontes utilizadas na aplicação
 * Prioridade: Plus Jakarta Sans > Noto Sans > Inter
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const noto = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
});

const plus = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});


// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Componente RootLayout - Layout raiz da aplicação
 * 
 * @param children - Conteúdo das páginas filhas
 * @returns JSX do layout principal
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${plus.className || noto.className || inter.className}`} 
      suppressHydrationWarning
    >
      {/* Meta tag para upgrade de requisições inseguras */}
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      
      <body className="">
        {/* Providers de contexto e tema */}
        <Providers>
          {/* Partículas de fundo animadas */}
          <Particles 
            className="absolute blur-sm inset-0 -z-10 animate-fade-in" 
            quantity={150} 
          />
          
          {/* Provider de tarefas */}
          <TaskProvider>
            {/* Grid principal da aplicação */}
            <div className="grid flex-1">
              {/* Toolbar superior */}
              <BottomToolbar />
            </div>
            
            {/* Conteúdo principal das páginas */}
            {children}

            {/* Footer global */}
            <Footer />
          </TaskProvider>
          
          {/* Analytics e métricas de performance */}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
