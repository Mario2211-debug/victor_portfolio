"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";

interface TechnologyBadgeProps {
  tech: string;
}

function TechnologyBadge({ tech }: TechnologyBadgeProps) {
  const { theme } = useTheme();
  
  return (
    <Badge variant="secondary" className="text-xs">
      <span className={`${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} px-1`}>
        {tech}
      </span>
    </Badge>
  );
}

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto grid items-center gap-8 pb-12 pt-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="flex max-w-[800px] flex-col items-start gap-2">
        <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          Featured Work
        </h2>
        <p className="max-w-[650px] text-base text-muted-foreground leading-relaxed sm:text-lg">
          A selection of projects I&apos;ve worked on recently.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.slice(0, 3).map((project, index) => (
          <Card key={project._id || index} className="flex border-0 flex-col">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                {project.technologies?.slice(0, 3).map((tech) => (
                  <TechnologyBadge key={tech} tech={tech} />
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/projects/${project._id || index}`}>
                  View Project →
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>
    </section>
  );
}
