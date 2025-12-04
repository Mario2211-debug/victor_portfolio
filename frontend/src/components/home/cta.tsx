import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function CTA() {
  return (
    <section className="max-w-7xl mx-auto grid items-center gap-8 pb-12 pt-12 md:py-16 px-4 md:px-6 lg:px-8">
      <Separator />
      <div className="flex flex-col items-center gap-6 text-center py-8 md:py-10">
        <div className="space-y-3 max-w-[650px]">
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Let&apos;s Work Together
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed sm:text-lg">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button size="lg" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">View My Work</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

