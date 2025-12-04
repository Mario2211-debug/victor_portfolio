"use client";

import { useState, useMemo } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Search } from "@/components/ui/search";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/use-projects";
import { useDebounce } from "@/hooks/use-debounce";
import { Project } from "@/types";

const employmentTypeLabels: Record<string, string> = {
  "PERSONAL PROJECT": "Personal",
  "ACADEMIC PROJECT": "Academic",
  "FULL TIME": "Full Time",
  "PART TIME": "Part Time",
  FREELANCE: "Freelance",
};

const ITEMS_PER_PAGE = 9;

export default function ProjectsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedEmploymentType, setSelectedEmploymentType] =
    useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce da busca
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Buscar projetos usando SWR
  const { projects, totalPages, isLoading, isError, error } = useProjects({
    type: selectedType || undefined,
    employmentType: selectedEmploymentType || undefined,
    search: debouncedSearch || undefined,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  // Extrair tipos únicos dos projetos
  const uniqueTypes = useMemo(
    () => Array.from(new Set(projects.map((p) => p.type).filter(Boolean))),
    [projects]
  );

  const uniqueEmploymentTypes = useMemo(
    () =>
      Array.from(
        new Set(
          projects
            .map((p) => p.employmentType)
            .filter(Boolean) as string[]
        )
      ),
    [projects]
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset para primeira página ao buscar
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-4">
          Projects
        </h1>
        <p className="text-base text-muted-foreground max-w-[650px] leading-relaxed sm:text-lg">
          A curated collection of my work. Each project represents a unique
          challenge and learning opportunity.
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Search
          placeholder="Search projects..."
          value={searchQuery}
          onSearch={handleSearch}
          className="max-w-md"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedType === null ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSelectedType(null);
              setCurrentPage(1);
            }}
          >
            All Types
          </Button>
          {uniqueTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedType(type);
                setCurrentPage(1);
              }}
            >
              {type}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedEmploymentType === null ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSelectedEmploymentType(null);
              setCurrentPage(1);
            }}
          >
            All Work Types
          </Button>
          {uniqueEmploymentTypes.map((type) => (
            <Button
              key={type}
              variant={selectedEmploymentType === type ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedEmploymentType(type);
                setCurrentPage(1);
              }}
            >
              {employmentTypeLabels[type] || type}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Loading State */}
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <div className="text-center py-16">
          <p className="text-destructive mb-4">
            {error?.message || "Failed to load projects. Please try again later."}
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Projects Grid */}
      {!isLoading && !isError && (
        <>
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="flex flex-col items-center gap-4">
                <svg
                  className="h-12 w-12 text-muted-foreground/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="space-y-2">
                  <p className="text-base font-medium text-foreground">
                    No projects found
                  </p>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Try adjusting your filters or search terms to find what you&apos;re looking for.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project, index) => (
                  <Card
                    key={project._id || index}
                    className="flex flex-col transition-all hover:shadow-md"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-xl">{project.name}</CardTitle>
                        {project.employmentType && (
                          <Badge variant="outline" className="shrink-0">
                            {employmentTypeLabels[project.employmentType] ||
                              project.employmentType}
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">Role:</span> {project.role}
                        </div>
                        {project.company && (
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Company:</span>{" "}
                            {project.company}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">Timeframe:</span>{" "}
                          {project.timeframe}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies && project.technologies.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full" asChild>
                        <Link href={`/projects/${project._id || index}`}>
                          View Project <span className="ml-1">→</span>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return <span key={page}>...</span>;
                      }
                      return null;
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
