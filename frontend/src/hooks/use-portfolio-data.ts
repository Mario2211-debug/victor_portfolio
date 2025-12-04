'use client';

import useSWR from "swr";
import type { 
  PortfolioHubResponse,
} from "@/lib/portfoliohub-api";
import { 
  fetchPortfolioHubData,
  mapPortfolioHubExperienceToExperience,
  mapPortfolioHubSkillToSkill,
  mapPortfolioHubEducationToEducation,
  mapPortfolioHubProjectToProject,
  mapPortfolioHubPostToBlogPost,
} from "@/lib/portfoliohub-api";

/**
 * Hook para buscar dados do perfil
 */
export function useProfile() {
  const { data, error, isLoading, mutate } = useSWR(
    'portfoliohub-data',
    fetchPortfolioHubData
  );

  return {
    profile: data?.success ? data.data.profile : null,
    user: data?.success ? data.data.user : null,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

/**
 * Hook para buscar experiências
 */
export function useExperience() {
  const { data, error, isLoading, mutate } = useSWR(
    'portfoliohub-data',
    fetchPortfolioHubData
  );

  const experiences = data?.success && data.data?.experiences
    ? data.data.experiences.map(mapPortfolioHubExperienceToExperience)
    : [];

  return {
    experience: experiences,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

/**
 * Hook para buscar skills
 */
export function useSkills(params?: { type?: string; category?: string }) {
  const { data, error, isLoading, mutate } = useSWR(
    'portfoliohub-data',
    fetchPortfolioHubData
  );

  let skills = data?.success && data.data?.skills
    ? data.data.skills.map(mapPortfolioHubSkillToSkill)
    : [];

  // Aplicar filtros
  if (params?.type) {
    skills = skills.filter(s => s.type === params.type);
  }

  if (params?.category) {
    skills = skills.filter(s => s.category === params.category);
  }

  return {
    skills,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

/**
 * Hook para buscar educação
 */
export function useEducation(params?: { type?: string; year?: number }) {
  const { data, error, isLoading, mutate } = useSWR(
    'portfoliohub-data',
    fetchPortfolioHubData
  );

  let education = data?.success && data.data?.education
    ? data.data.education.map(mapPortfolioHubEducationToEducation)
    : [];

  // Aplicar filtros
  if (params?.type) {
    education = education.filter(e => e.type === params.type);
  }

  if (params?.year) {
    education = education.filter(e => e.year === params.year);
  }

  return {
    education,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

/**
 * Hook para buscar idiomas
 */
export function useLanguages() {
  const { data, error, isLoading, mutate } = useSWR(
    'portfoliohub-data',
    fetchPortfolioHubData
  );

  const languages = data?.success && data.data?.languages
    ? data.data.languages
    : [];

  return {
    languages,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

/**
 * Hook para buscar um projeto específico por ID
 */
export function useProject(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    'portfoliohub-data',
    fetchPortfolioHubData
  );

  const project = data?.success && data.data?.projects
    ? data.data.projects
        .filter(p => p._id === id)
        .map(mapPortfolioHubProjectToProject)[0]
    : null;

  return {
    project,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

/**
 * Hook para buscar um post específico por ID
 */
export function useBlogPost(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    'portfoliohub-data',
    fetchPortfolioHubData
  );
  
  const post = data?.success && data.data?.posts
    ? data.data.posts
        .filter(p => p._id === id)
        .map(mapPortfolioHubPostToBlogPost)[0]
    : null;

  return {
    post,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

