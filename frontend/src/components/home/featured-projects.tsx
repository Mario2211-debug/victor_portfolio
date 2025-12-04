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
import { projectsAPIPublic } from "@/lib/api-public";
import { Project } from "@/types";

export async function FeaturedProjects() {
  let projects: Project[] = [];

  try {
    const response = await projectsAPIPublic.getAll({ limit: 3 });
    if (Array.isArray(response)) {
      projects = response;
    } else if (response.data && Array.isArray(response.data)) {
      projects = response.data;
    }
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    // Em caso de erro, projects permanece vazio
  }

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
          <Card key={project._id || index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                {project.technologies?.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
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
