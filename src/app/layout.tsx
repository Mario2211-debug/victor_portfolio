import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Particles from "./util/Particles";
import FullScreenNavBar from "@/components/Navbar";
import Footer from "@/components/footer";
import Blob from "@/components/blob";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className="bg-gray-950 m-4 overflow-x-hidden overscroll-none grid-flow-row md:h-screen-[calc(100vh-24px)]">
        <FullScreenNavBar />
        <Particles
          className="absolute blur-sm inset-0 -z-10 animate-fade-in"
          quantity={150}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
