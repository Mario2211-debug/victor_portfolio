import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Particles from "./util/Particles";
import FullScreenNavBar from "@/components/Navbar";
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
      <body className="bg-gray-950 m-4 overflow-x-hidden overscroll-none">
        {children}
        <FullScreenNavBar />
        <Particles
          className="absolute blur-sm inset-0 -z-10 animate-fade-in"
          quantity={150}
        />
      </body>
    </html>
  );
}
