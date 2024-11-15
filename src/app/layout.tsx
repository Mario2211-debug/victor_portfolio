"use client"
import "./globals.css";
import { metadata } from "@/app/metadata";
import { Inter } from "next/font/google";
import { Noto_Sans } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { TaskProvider } from "@/components/taskContext";
import { Providers } from "./providers";
import Particles from "./util/Particles";
import FullScreenNavBar from "@/components/Navbar";
import Footer from "@/components/footer";
import Blob from "@/components/blob";
import myGif from '../app/loading-gif.gif'
import BottomToolbar from "@/components/BottomToolbar";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";
// If loading a variable font, you don't need to specify the font weight
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


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  //     window.addEventListener('load', () => {
  //       navigator.serviceWorker.register('./service-worker.js').then(
  //         (registration) => {
  //           console.log('Service Worker registrado com sucesso:', registration);
  //         },
  //         (error) => {
  //           console.error('Falha ao registrar o Service Worker:', error);
  //         }
  //       );
  //     });
  //   }
  // }, []);
  return (
    <html lang="en" className={`${plus.className}`} suppressHydrationWarning>
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      <body className="overflow-x-hidden overscroll-none">
        <Providers>
          <Particles className="absolute blur-sm inset-0 -z-10 animate-fade-in" quantity={150} />
          <TaskProvider>
            <div className="grid flex-1">
              <BottomToolbar />
            </div>
            {children}

            <Footer />

          </TaskProvider>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html >
  );
}
