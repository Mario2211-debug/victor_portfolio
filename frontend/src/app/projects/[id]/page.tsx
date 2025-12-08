import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardItems, CardTitle } from "@/components/ui/card";
import { projectsAPIPublic } from "@/lib/api-public";
import { Project } from "@/types";

const employmentTypeLabels: Record<string, string> = {
  "PERSONAL PROJECT": "Personal",
  "ACADEMIC PROJECT": "Academic",
  "FULL TIME": "Full Time",
  "PART TIME": "Part Time",
  FREELANCE: "Freelance",
};

interface ProjectDetail extends Project {
  _id?: string;
  context?: string;
  responsibilities?: string[];
  startDate?: string;
  endDate?: string;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let project: ProjectDetail | null = null;

  try {
    // Tentar buscar da API
    project = await projectsAPIPublic.getById(params.id);
  } catch (error) {
    // Se falhar, usar dados mock para desenvolvimento
    console.error("Error fetching project:", error);
    // Em produção, você pode querer mostrar notFound() aqui
  }

  // Se não encontrar projeto, mostrar 404
  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
      {/* Back Button */}
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/projects">
            ← Back to Projects
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-4">
              {project.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {project.employmentType && (
                <Badge variant="default" className={`text-sm ${project.employmentType === "PERSONAL PROJECT" ? "hidden" : ""}`}>
                  {employmentTypeLabels[project.employmentType] ||
                    project.employmentType}
                </Badge>
              )}
              {project.type && (
                <Badge variant="secondary" className="text-sm">
                  {project.type}
                </Badge>
              )}
            </div>
          </div>
          {project.link && (
            <Button asChild>
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                View Live Project →
              </Link>
            </Button>
          )}
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          {project.description}
        </p>
      </div>

      <Separator className="h-0 mb-12" />

      {/* Project Details Grid */}
      <div className="grid gap-8 md:grid-cols-3 mb-12">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {project.items && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Details</h2>
              <ul className="m-8">
                {
                 project.items.map((item, i) => 
                  <li key={i} className="mb-2 list-disc">
                        {item}
                    </li>
                )}

                </ul>
            </section>
          )}

          {project.responsibilities && project.responsibilities.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>
              <ul className="space-y-2">
                {project.responsibilities.map((responsibility, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="text-foreground mt-1">•</span>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Role</p>
                <p className="text-sm text-muted-foreground">{project.role}</p>
              </div>
              {project.company && (
                <div>
                  <p className="text-sm font-medium mb-1">Company</p>
                  <p className="text-sm text-muted-foreground">
                    {project.company}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium mb-1">Timeframe</p>
                <p className="text-sm text-muted-foreground">
                  {project.timeframe}
                </p>
              </div>
              {(project.startDate || project.endDate) && (
                <div>
                  <p className="text-sm font-medium mb-1">Duration</p>
                  <p className="text-sm text-muted-foreground">
                    {project.startDate &&
                      new Date(project.startDate).toLocaleDateString()}
                    {project.startDate && project.endDate && " - "}
                    {project.endDate &&
                      new Date(project.endDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <Separator className="mb-8" />
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/projects">View All Projects</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </div>
    </div>
  );
}
