'use client';

import { Badge } from "@/components/ui/badge";
import { useSkills } from "@/hooks/use-portfolio-data";

export function Skills() {
  const { skills, isLoading } = useSkills();

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto grid items-center gap-8 pb-12 pt-12 md:py-16 px-4 md:px-6 lg:px-8">
        <div className="flex max-w-[800px] flex-col items-start gap-2">
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Skills & Technologies
          </h2>
          <p className="max-w-[650px] text-base text-muted-foreground leading-relaxed sm:text-lg">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {[...Array(10)].map((_, i) => (
            <Badge key={i} variant="secondary" className="text-sm py-1.5 px-3 animate-pulse">
              Loading...
            </Badge>
          ))}
        </div>
      </section>
    );
  }

  if (skills.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto grid items-center gap-8 pb-12 pt-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="flex max-w-[800px] flex-col items-start gap-2">
        <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          Skills & Technologies
        </h2>
        <p className="max-w-[650px] text-base text-muted-foreground leading-relaxed sm:text-lg">
          Technologies and tools I work with to bring ideas to life.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge
            key={skill._id}
            variant="secondary"
            className="text-sm py-1.5 px-3"
            title={`${skill.technology} - Level ${skill.level}/5 - ${skill.category}`}
          >
            {skill.technology}
          </Badge>
        ))}
      </div>
    </section>
  );
}

