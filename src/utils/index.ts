/**
 * Utilitários para o projeto Victor Portfolio
 * 
 * Este arquivo contém funções auxiliares e utilitários
 * utilizados em todo o projeto para melhorar a organização
 * e reutilização de código.
 */

// ============================================================================
// UTILITÁRIOS DE FORMATAÇÃO
// ============================================================================

/**
 * Formata uma data para exibição
 * @param date - Data a ser formatada
 * @param locale - Localização para formatação (padrão: 'pt-BR')
 * @returns String formatada da data
 */
export const formatDate = (date: Date | string, locale: string = 'pt-BR'): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
};

/**
 * Formata uma data para exibição de tempo relativo
 * @param date - Data a ser formatada
 * @returns String com tempo relativo (ex: "há 2 dias")
 */
export const formatRelativeTime = (date: Date | string): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInMs = now.getTime() - dateObj.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Hoje';
    if (diffInDays === 1) return 'Ontem';
    if (diffInDays < 7) return `Há ${diffInDays} dias`;
    if (diffInDays < 30) return `Há ${Math.floor(diffInDays / 7)} semanas`;
    if (diffInDays < 365) return `Há ${Math.floor(diffInDays / 30)} meses`;
    
    return `Há ${Math.floor(diffInDays / 365)} anos`;
  } catch (error) {
    console.error('Erro ao formatar tempo relativo:', error);
    return 'Data inválida';
  }
};

/**
 * Trunca um texto para um número específico de caracteres
 * @param text - Texto a ser truncado
 * @param maxLength - Número máximo de caracteres
 * @param suffix - Sufixo a ser adicionado (padrão: '...')
 * @returns Texto truncado
 */
export const truncateText = (text: string, maxLength: number, suffix: string = '...'): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};

// ============================================================================
// UTILITÁRIOS DE VALIDAÇÃO
// ============================================================================

/**
 * Valida se uma string é um email válido
 * @param email - Email a ser validado
 * @returns True se o email for válido
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida se uma string é uma URL válida
 * @param url - URL a ser validada
 * @returns True se a URL for válida
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valida se uma string não está vazia
 * @param value - Valor a ser validado
 * @returns True se o valor não estiver vazio
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

// ============================================================================
// UTILITÁRIOS DE ARRAY
// ============================================================================

/**
 * Remove itens duplicados de um array
 * @param array - Array a ser processado
 * @returns Array sem duplicatas
 */
export const removeDuplicates = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

/**
 * Agrupa itens de um array por uma propriedade específica
 * @param array - Array a ser agrupado
 * @param key - Chave para agrupamento
 * @returns Objeto com os grupos
 */
export const groupBy = <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

/**
 * Ordena um array por uma propriedade específica
 * @param array - Array a ser ordenado
 * @param key - Chave para ordenação
 * @param direction - Direção da ordenação ('asc' ou 'desc')
 * @returns Array ordenado
 */
export const sortBy = <T, K extends keyof T>(
  array: T[], 
  key: K, 
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

// ============================================================================
// UTILITÁRIOS DE STRING
// ============================================================================

/**
 * Converte uma string para slug (URL-friendly)
 * @param text - Texto a ser convertido
 * @returns Slug gerado
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
};

/**
 * Capitaliza a primeira letra de uma string
 * @param text - Texto a ser capitalizado
 * @returns Texto capitalizado
 */
export const capitalize = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Capitaliza cada palavra de uma string
 * @param text - Texto a ser capitalizado
 * @returns Texto com cada palavra capitalizada
 */
export const capitalizeWords = (text: string): string => {
  if (!text) return text;
  return text
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

// ============================================================================
// UTILITÁRIOS DE PERFORMANCE
// ============================================================================

/**
 * Debounce function para otimizar chamadas de função
 * @param func - Função a ser executada
 * @param delay - Delay em milissegundos
 * @returns Função com debounce aplicado
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function para limitar a frequência de execução
 * @param func - Função a ser executada
 * @param limit - Limite de tempo em milissegundos
 * @returns Função com throttle aplicado
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ============================================================================
// UTILITÁRIOS DE LOCAL STORAGE
// ============================================================================

/**
 * Salva um valor no localStorage com tratamento de erro
 * @param key - Chave para armazenamento
 * @param value - Valor a ser salvo
 * @returns True se salvou com sucesso
 */
export const saveToLocalStorage = (key: string, value: any): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
    return false;
  }
};

/**
 * Recupera um valor do localStorage com tratamento de erro
 * @param key - Chave para recuperação
 * @param defaultValue - Valor padrão se não encontrar
 * @returns Valor recuperado ou valor padrão
 */
export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Erro ao recuperar do localStorage:', error);
    return defaultValue;
  }
};

// ============================================================================
// UTILITÁRIOS DE CLASSE CSS
// ============================================================================

/**
 * Combina classes CSS de forma condicional
 * @param classes - Classes CSS a serem combinadas
 * @returns String com classes combinadas
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Gera classes CSS baseadas em condições
 * @param conditions - Objeto com condições e classes
 * @returns String com classes aplicadas
 */
export const conditionalClasses = (conditions: Record<string, boolean>): string => {
  return Object.entries(conditions)
    .filter(([, condition]) => condition)
    .map(([className]) => className)
    .join(' ');
};
