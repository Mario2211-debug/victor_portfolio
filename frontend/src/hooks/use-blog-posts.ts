'use client';

import useSWR from "swr";
import { BlogPost } from "@/types";
import { 
  fetchPortfolioHubData, 
  mapPortfolioHubPostToBlogPost,
  clearPortfolioHubCache
} from "@/lib/portfoliohub-api";

interface UseBlogPostsParams {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export function useBlogPosts(params?: UseBlogPostsParams) {
  const { data, error, isLoading, mutate } = useSWR(
    'portfoliohub-data',
    () => fetchPortfolioHubData(false) // Não forçar refresh por padrão
  );

  // Função para forçar atualização
  const refresh = async () => {
    clearPortfolioHubCache();
    await mutate(() => fetchPortfolioHubData(true), { revalidate: true });
  };

  // Mapear e filtrar posts
  let posts: BlogPost[] = [];
  let totalPages = 1;

  if (data?.success && data.data?.posts) {
    // Mapear posts da API externa para o formato esperado
    let mappedPosts = data.data.posts.map(mapPortfolioHubPostToBlogPost);

    // Aplicar filtros
    if (params?.category) {
      mappedPosts = mappedPosts.filter(p => 
        p.category?.toLowerCase() === params.category!.toLowerCase()
      );
    }

    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      mappedPosts = mappedPosts.filter(p => 
        p.title?.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.content?.toLowerCase().includes(searchLower)
      );
    }

    // Ordenar por data (mais recente primeiro)
    mappedPosts.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

    // Paginação
    const limit = params?.limit || 9;
    const page = params?.page || 1;
    totalPages = Math.ceil(mappedPosts.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    posts = mappedPosts.slice(startIndex, endIndex);
  }

  return {
    posts,
    totalPages,
    isLoading,
    isError: !!error,
    error,
    mutate,
    refresh, // Função para forçar atualização
  };
}

