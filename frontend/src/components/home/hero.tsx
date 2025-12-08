'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/use-portfolio-data";
import { useTheme } from "next-themes";

export function Hero() {
  const { profile, user, isLoading } = useProfile();
  const {theme} = useTheme();

  return (
    <section className="max-w-7xl mx-auto grid items-center gap-6 pb-8 pt-12 md:py-10 px-4 md:px-6 lg:px-8">
      <div className="flex max-w-[900px] flex-col items-start gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl lg:leading-[1.1]">
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <>
              Hi, 
              <br className="hidden sm:inline" /> 
              i'm Mário Afonso
                </>
            )}
          </h1>
          {/* <p className="text-base text-muted-foreground sm:text-lg max-w-[600px] leading-relaxed">
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              profile?.title || 'Product Designer & Developer crafting minimal, purposeful experiences.'
            )}
          </p> */}
        </div>
        <p className="max-w-[650px] text-base text-muted-foreground leading-relaxed sm:text-lg">
          {isLoading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            <>
              a {profile?.title || 'Product Designer and Developer'} based in {profile?.location || 'Portugal'}.
              Read more <Link href="/about" className={`px-1 ${theme === "dark" ? "bg-white text-black" : "bg-black text-white"}`}> about Me </Link>
            </>
          )}
        </p>
      </div>
      {/* <div className="flex gap-4">
        <Button variant="outline" asChild>
          <Link href="/projects">View Work</Link>
        </Button>
      </div> */}
    </section>
  );
}
