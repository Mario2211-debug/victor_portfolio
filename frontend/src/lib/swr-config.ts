import { SWRConfiguration } from "swr";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Fetcher function para SWR
export const fetcher = async (url: string) => {
  // Se a URL já começa com http, usar diretamente, senão adicionar base URL
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  
  try {
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Adicionar cache para evitar requisições duplicadas
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // Se for erro de rede, retornar erro mais descritivo
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to reach the server');
    }
    throw error;
  }
};

// Configuração global do SWR
export const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 2000, // Deduplica requisições dentro de 2 segundos
  errorRetryCount: 3,
  errorRetryInterval: 5000,
};

