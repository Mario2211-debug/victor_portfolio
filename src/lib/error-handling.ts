/**
 * Sistema de tratamento de erros para o projeto Victor Portfolio
 * 
 * Este arquivo centraliza o tratamento de erros e fornece
 * utilitários para logging e notificação de erros.
 */

import { ERROR_CONFIG } from '@/config';

// ============================================================================
// TIPOS DE ERRO
// ============================================================================

/**
 * Tipos de erro personalizados
 */
export enum ErrorType {
  NETWORK = 'NETWORK',
  API = 'API',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  PERMISSION = 'PERMISSION',
  NOT_FOUND = 'NOT_FOUND',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN = 'UNKNOWN',
}

/**
 * Interface para erros personalizados
 */
export interface CustomError {
  type: ErrorType;
  message: string;
  code?: string | number;
  details?: any;
  timestamp: Date;
  stack?: string;
}

// ============================================================================
// CLASSE DE ERRO PERSONALIZADA
// ============================================================================

/**
 * Classe para erros personalizados do sistema
 */
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly code?: string | number;
  public readonly details?: any;
  public readonly timestamp: Date;

  constructor(
    type: ErrorType,
    message: string,
    code?: string | number,
    details?: any
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.code = code;
    this.details = details;
    this.timestamp = new Date();
  }
}

// ============================================================================
// UTILITÁRIOS DE ERRO
// ============================================================================

/**
 * Cria um erro personalizado
 * @param type - Tipo do erro
 * @param message - Mensagem do erro
 * @param code - Código do erro
 * @param details - Detalhes adicionais
 * @returns Instância de AppError
 */
export const createError = (
  type: ErrorType,
  message: string,
  code?: string | number,
  details?: any
): AppError => {
  return new AppError(type, message, code, details);
};

/**
 * Converte um erro JavaScript em AppError
 * @param error - Erro original
 * @returns Instância de AppError
 */
export const normalizeError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(
      ErrorType.UNKNOWN,
      error.message,
      undefined,
      { originalError: error }
    );
  }

  return new AppError(
    ErrorType.UNKNOWN,
    'Erro desconhecido',
    undefined,
    { originalError: error }
  );
};

/**
 * Determina o tipo de erro baseado na resposta HTTP
 * @param status - Status HTTP
 * @returns Tipo de erro correspondente
 */
export const getErrorTypeFromStatus = (status: number): ErrorType => {
  switch (status) {
    case 400:
      return ErrorType.VALIDATION;
    case 401:
      return ErrorType.AUTHENTICATION;
    case 403:
      return ErrorType.PERMISSION;
    case 404:
      return ErrorType.NOT_FOUND;
    case 408:
    case 504:
      return ErrorType.TIMEOUT;
    case 500:
    case 502:
    case 503:
      return ErrorType.API;
    default:
      return ErrorType.UNKNOWN;
  }
};

// ============================================================================
// SISTEMA DE LOGGING
// ============================================================================

/**
 * Níveis de log
 */
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

/**
 * Interface para entrada de log
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: any;
  error?: AppError;
}

/**
 * Classe para sistema de logging
 */
class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Registra uma entrada de log
   * @param level - Nível do log
   * @param message - Mensagem
   * @param context - Contexto adicional
   * @param error - Erro associado
   */
  private log(
    level: LogLevel,
    message: string,
    context?: any,
    error?: AppError
  ): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context,
      error,
    };

    // Em desenvolvimento, sempre loga no console
    if (this.isDevelopment) {
      this.logToConsole(entry);
    }

    // Em produção, pode enviar para serviço de logging
    if (process.env.NODE_ENV === 'production') {
      this.logToService(entry);
    }
  }

  /**
   * Loga no console do navegador
   * @param entry - Entrada de log
   */
  private logToConsole(entry: LogEntry): void {
    const { level, message, timestamp, context, error } = entry;
    const timestampStr = timestamp.toISOString();

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(`[${timestampStr}] DEBUG: ${message}`, context, error);
        break;
      case LogLevel.INFO:
        console.info(`[${timestampStr}] INFO: ${message}`, context, error);
        break;
      case LogLevel.WARN:
        console.warn(`[${timestampStr}] WARN: ${message}`, context, error);
        break;
      case LogLevel.ERROR:
        console.error(`[${timestampStr}] ERROR: ${message}`, context, error);
        break;
    }
  }

  /**
   * Envia log para serviço externo (implementar conforme necessário)
   * @param entry - Entrada de log
   */
  private logToService(entry: LogEntry): void {
    // Implementar envio para serviço de logging (ex: Sentry, LogRocket, etc.)
    // Por enquanto, apenas ignora
  }

  /**
   * Log de debug
   * @param message - Mensagem
   * @param context - Contexto
   */
  public debug(message: string, context?: any): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  /**
   * Log de informação
   * @param message - Mensagem
   * @param context - Contexto
   */
  public info(message: string, context?: any): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Log de aviso
   * @param message - Mensagem
   * @param context - Contexto
   */
  public warn(message: string, context?: any): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Log de erro
   * @param message - Mensagem
   * @param error - Erro
   * @param context - Contexto
   */
  public error(message: string, error?: AppError, context?: any): void {
    this.log(LogLevel.ERROR, message, context, error);
  }
}

// Instância global do logger
export const logger = new Logger();

// ============================================================================
// TRATAMENTO DE ERROS DE API
// ============================================================================

/**
 * Trata erros de requisições HTTP
 * @param error - Erro original
 * @param context - Contexto da requisição
 * @returns AppError normalizado
 */
export const handleApiError = (error: unknown, context?: any): AppError => {
  let appError: AppError;

  if (error instanceof AppError) {
    appError = error;
  } else if (error instanceof Error) {
    // Verifica se é um erro de rede
    if (error.message.includes('fetch') || error.message.includes('network')) {
      appError = createError(
        ErrorType.NETWORK,
        ERROR_CONFIG.NETWORK_ERROR_MESSAGE,
        'NETWORK_ERROR',
        { originalError: error, context }
      );
    } else if (error.message.includes('timeout')) {
      appError = createError(
        ErrorType.TIMEOUT,
        ERROR_CONFIG.TIMEOUT_MESSAGE,
        'TIMEOUT_ERROR',
        { originalError: error, context }
      );
    } else {
      appError = createError(
        ErrorType.API,
        error.message,
        'API_ERROR',
        { originalError: error, context }
      );
    }
  } else {
    appError = createError(
      ErrorType.UNKNOWN,
      ERROR_CONFIG.GENERIC_ERROR_MESSAGE,
      'UNKNOWN_ERROR',
      { originalError: error, context }
    );
  }

  // Log do erro
  logger.error('Erro de API', appError, context);

  return appError;
};

// ============================================================================
// TRATAMENTO DE ERROS DE VALIDAÇÃO
// ============================================================================

/**
 * Trata erros de validação
 * @param errors - Erros de validação
 * @param context - Contexto da validação
 * @returns AppError de validação
 */
export const handleValidationError = (
  errors: Record<string, string>,
  context?: any
): AppError => {
  const errorMessage = Object.values(errors).join(', ');
  
  const appError = createError(
    ErrorType.VALIDATION,
    errorMessage,
    'VALIDATION_ERROR',
    { validationErrors: errors, context }
  );

  logger.warn('Erro de validação', { validationErrors: errors, context });

  return appError;
};

// ============================================================================
// UTILITÁRIOS DE RETRY
// ============================================================================

/**
 * Executa uma função com retry automático
 * @param fn - Função a ser executada
 * @param maxAttempts - Número máximo de tentativas
 * @param delay - Delay entre tentativas
 * @returns Resultado da função
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  maxAttempts: number = ERROR_CONFIG.RETRY_ATTEMPTS,
  delay: number = ERROR_CONFIG.RETRY_DELAY
): Promise<T> => {
  let lastError: AppError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = normalizeError(error);
      
      // Se não é um erro que vale a pena tentar novamente, falha imediatamente
      if (lastError.type === ErrorType.VALIDATION || 
          lastError.type === ErrorType.AUTHENTICATION ||
          lastError.type === ErrorType.PERMISSION) {
        throw lastError;
      }

      // Se é a última tentativa, falha
      if (attempt === maxAttempts) {
        throw lastError;
      }

      // Aguarda antes da próxima tentativa
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError!;
};

// ============================================================================
// HOOK PARA TRATAMENTO DE ERROS
// ============================================================================

/**
 * Hook para tratamento de erros em componentes React
 * @param onError - Callback para tratamento de erro
 * @returns Função para reportar erros
 */
export const useErrorHandler = (onError?: (error: AppError) => void) => {
  const reportError = (error: unknown, context?: any) => {
    const appError = normalizeError(error);
    logger.error('Erro reportado pelo componente', appError, context);
    
    if (onError) {
      onError(appError);
    }
  };

  return reportError;
};
