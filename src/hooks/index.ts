/**
 * Hooks customizados para o projeto Victor Portfolio
 * 
 * Este arquivo contém hooks personalizados que encapsulam
 * lógica comum e melhoram a reutilização de código.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from 'next-themes';

// ============================================================================
// HOOKS DE ESTADO
// ============================================================================

/**
 * Hook para gerenciar estado de carregamento
 * @param initialValue - Valor inicial do estado de carregamento
 * @returns [isLoading, setIsLoading, setLoadingWithDelay]
 */
export const useLoading = (initialValue: boolean = false) => {
  const [isLoading, setIsLoading] = useState(initialValue);

  /**
   * Define o estado de carregamento com um delay opcional
   * @param loading - Estado de carregamento
   * @param delay - Delay em milissegundos
   */
  const setLoadingWithDelay = useCallback((loading: boolean, delay: number = 0) => {
    if (delay > 0) {
      setTimeout(() => setIsLoading(loading), delay);
    } else {
      setIsLoading(loading);
    }
  }, []);

  return [isLoading, setIsLoading, setLoadingWithDelay] as const;
};

/**
 * Hook para gerenciar estado de erro
 * @param initialValue - Valor inicial do estado de erro
 * @returns [error, setError, clearError]
 */
export const useError = (initialValue: string | null = null) => {
  const [error, setError] = useState<string | null>(initialValue);

  /**
   * Limpa o erro atual
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return [error, setError, clearError] as const;
};

/**
 * Hook para gerenciar estado de toggle
 * @param initialValue - Valor inicial do estado
 * @returns [isToggled, toggle, setToggled]
 */
export const useToggle = (initialValue: boolean = false) => {
  const [isToggled, setIsToggled] = useState(initialValue);

  /**
   * Alterna o estado atual
   */
  const toggle = useCallback(() => {
    setIsToggled(prev => !prev);
  }, []);

  /**
   * Define o estado diretamente
   */
  const setToggled = useCallback((value: boolean) => {
    setIsToggled(value);
  }, []);

  return [isToggled, toggle, setToggled] as const;
};

// ============================================================================
// HOOKS DE PERFORMANCE
// ============================================================================

/**
 * Hook para debounce de valores
 * @param value - Valor a ser debounced
 * @param delay - Delay em milissegundos
 * @returns Valor debounced
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook para throttle de valores
 * @param value - Valor a ser throttled
 * @param limit - Limite de tempo em milissegundos
 * @returns Valor throttled
 */
export const useThrottle = <T>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
};

/**
 * Hook para memoização de valores computados
 * @param computeFn - Função de computação
 * @param deps - Dependências para recálculo
 * @returns Valor memoizado
 */
export const useMemoizedValue = <T>(
  computeFn: () => T,
  deps: React.DependencyList
): T => {
  const [value, setValue] = useState<T>(computeFn);

  useEffect(() => {
    setValue(computeFn());
  }, deps);

  return value;
};

// ============================================================================
// HOOKS DE INTERAÇÃO
// ============================================================================

/**
 * Hook para detectar cliques fora de um elemento
 * @param ref - Referência do elemento
 * @param callback - Callback a ser executado
 */
export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

/**
 * Hook para detectar teclas pressionadas
 * @param targetKey - Tecla a ser detectada
 * @param callback - Callback a ser executado
 * @param dependencies - Dependências do hook
 */
export const useKeyPress = (
  targetKey: string,
  callback: () => void,
  dependencies: React.DependencyList = []
) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, dependencies);
};

/**
 * Hook para detectar scroll
 * @param callback - Callback a ser executado
 * @param dependencies - Dependências do hook
 */
export const useScroll = (
  callback: (scrollY: number) => void,
  dependencies: React.DependencyList = []
) => {
  useEffect(() => {
    const handleScroll = () => {
      callback(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, dependencies);
};

// ============================================================================
// HOOKS DE TEMA
// ============================================================================

/**
 * Hook para gerenciar tema com estado de montagem
 * @returns [theme, setTheme, mounted]
 */
export const useThemeWithMount = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return [theme, setTheme, mounted] as const;
};

// ============================================================================
// HOOKS DE API
// ============================================================================

/**
 * Hook para fazer requisições HTTP com estados de carregamento e erro
 * @param url - URL da requisição
 * @param options - Opções da requisição
 * @returns [data, loading, error, refetch]
 */
export const useFetch = <T>(
  url: string,
  options: RequestInit = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [data, loading, error, fetchData] as const;
};

// ============================================================================
// HOOKS DE LOCAL STORAGE
// ============================================================================

/**
 * Hook para gerenciar localStorage com sincronização
 * @param key - Chave do localStorage
 * @param defaultValue - Valor padrão
 * @returns [value, setValue, removeValue]
 */
export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setStoredValue = useCallback((newValue: T) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }, [key]);

  const removeValue = useCallback(() => {
    try {
      setValue(defaultValue);
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Erro ao remover do localStorage:', error);
    }
  }, [key, defaultValue]);

  return [value, setStoredValue, removeValue] as const;
};

// ============================================================================
// HOOKS DE ANIMAÇÃO
// ============================================================================

/**
 * Hook para controlar animações com estados
 * @param initialValue - Valor inicial da animação
 * @returns [isAnimating, startAnimation, stopAnimation]
 */
export const useAnimation = (initialValue: boolean = false) => {
  const [isAnimating, setIsAnimating] = useState(initialValue);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
  }, []);

  return [isAnimating, startAnimation, stopAnimation] as const;
};

// ============================================================================
// HOOKS ESPECÍFICOS DO PROJETO
// ============================================================================

/**
 * Hook para carregar posts do blog com fallback offline
 * @returns [posts, loading, error, refetch]
 */
export { useBlogPosts } from './useBlogPosts';
