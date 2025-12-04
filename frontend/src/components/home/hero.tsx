'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/use-portfolio-data";

export function Hero() {
  const { profile, user, isLoading } = useProfile();

  return (
    <section className="max-w-7xl mx-auto grid items-center gap-6 pb-12 pt-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="flex max-w-[900px] flex-col items-start gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl lg:leading-[1.1]">
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <>
                Designing digital experiences <br className="hidden sm:inline" />
                that leave a mark.
              </>
            )}
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg max-w-[600px] leading-relaxed">
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              profile?.title || 'Product Designer & Developer crafting minimal, purposeful experiences.'
            )}
          </p>
        </div>
        <p className="max-w-[650px] text-base text-muted-foreground leading-relaxed sm:text-lg">
          {isLoading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            <>
              I&apos;m {user?.name || 'Victor'}, a {profile?.title || 'Product Designer and Developer'} based in {profile?.location || 'Brazil'}. I
              build accessible, pixel-perfect, and performant web experiences.
            </>
          )}
        </p>
      </div>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/projects">View Work</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/about">About Me</Link>
        </Button>
      </div>
    </section>
  );
}
