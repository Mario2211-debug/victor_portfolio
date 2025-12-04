'use client';

import useSWR from "swr";
import { Project } from "@/types";
import { 
  fetchPortfolioHubData, 
  mapPortfolioHubProjectToProject 
} from "@/lib/portfoliohub-api";

interface UseProjectsParams {
  type?: string;
  employmentType?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export function useProjects(params?: UseProjectsParams) {
  const { data, error, isLoading, mutate } = useSWR(
    'portfoliohub-data',
    fetchPortfolioHubData
  );

  // Mapear e filtrar projetos
  let projects: Project[] = [];
  let totalPages = 1;

  if (data?.success && data.data?.projects) {
    // Mapear projetos da API externa para o formato esperado
    let mappedProjects = data.data.projects.map(mapPortfolioHubProjectToProject);

    // Aplicar filtros
    if (params?.type) {
      mappedProjects = mappedProjects.filter(p => 
        p.type?.toLowerCase().includes(params.type!.toLowerCase())
      );
    }

    if (params?.employmentType) {
      mappedProjects = mappedProjects.filter(p => 
        p.employmentType === params.employmentType
      );
    }

    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      mappedProjects = mappedProjects.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.technologies.some(t => t.toLowerCase().includes(searchLower))
      );
    }

    // Paginação
    const limit = params?.limit || 9;
    const page = params?.page || 1;
    totalPages = Math.ceil(mappedProjects.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    projects = mappedProjects.slice(startIndex, endIndex);
  }

  return {
    projects,
    totalPages,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

