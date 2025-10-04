/**
 * Hook customizado para gerenciar dados da API com fallback offline
 * 
 * Este hook encapsula a lógica de carregamento de dados da API
 * com fallback automático para dados offline em caso de erro.
 */

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { BlogPost, OfflineData } from '@/types';
import { API_BASE_URL, API_ENDPOINTS, REQUEST_TIMEOUT } from '@/constants';

// Importação dos dados offline
import data from '@/app/api/data.json';

/**
 * Hook para carregar posts do blog com fallback offline
 * @returns [posts, loading, error, refetch]
 */
export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega dados offline como fallback
   */
  const loadOfflineData = (): BlogPost[] => {
    try {
      console.log("🔄 Carregando dados offline...");
      const offlineData = data as OfflineData;
      
      if (offlineData && offlineData.posts && Array.isArray(offlineData.posts)) {
        const offlinePostArray = offlineData.posts.flat();
        
        if (offlinePostArray.length > 0) {
          console.log("✅ Dados offline carregados:", offlinePostArray.length, "posts");
          return offlinePostArray;
        }
      }
      
      throw new Error("Estrutura de dados offline inválida");
    } catch (offlineError) {
      console.error("❌ Erro ao carregar dados offline:", offlineError);
      throw offlineError;
    }
  };

  /**
   * Busca posts da API
   */
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("🌐 Buscando posts da API...");
      const res = await axios.get<BlogPost[]>(
        `${API_BASE_URL}${API_ENDPOINTS.BLOG}`,
        { timeout: REQUEST_TIMEOUT }
      );
      
      // Ordena posts por data de publicação (mais recentes primeiro)
      const sortedPosts = res.data.sort((a: BlogPost, b: BlogPost) => {
        return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
      });
      
      console.log("✅ Posts da API carregados:", sortedPosts.length, "posts");
      setPosts(sortedPosts);
      
    } catch (apiError) {
      console.warn("⚠️ Erro na API, tentando dados offline:", apiError);
      
      try {
        const offlinePosts = loadOfflineData();
        setPosts(offlinePosts);
        setError("API indisponível - usando dados offline");
        
      } catch (offlineError) {
        console.error("❌ Falha total - nem API nem dados offline funcionaram");
        setError("Erro ao carregar posts do blog");
        setPosts([]);
      }
    } finally {
      setLoading(false);
    }
  }, [loadOfflineData]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return [posts, loading, error, fetchPosts] as const;
};
