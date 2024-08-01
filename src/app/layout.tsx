import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Noto_Sans } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "./providers";
import Particles from "./util/Particles";
import FullScreenNavBar from "@/components/Navbar";
import Footer from "@/components/footer";
import Blob from "@/components/blob";

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
export const metadata: Metadata = {
  title: "Portfolio",
  description: "God Is Also a Designer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plus.className} suppressHydrationWarning>
      <body className="overflow-x-hidden overscroll-none">
        <Providers>
          <Particles
            className="absolute blur-sm inset-0 -z-10 animate-fade-in"
            quantity={150}
          />
          <div className="relative flex size-full min-h-screen flex-col">
            <div className="layout-container flex h-full grow flex-col">
              <FullScreenNavBar />
              <div className="px-40 mobile:px-6 md:px-8 lg:px-10 xl:px-12 flex flex-1 justify-center pt-28 blog-font">
                {children}
              </div>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
