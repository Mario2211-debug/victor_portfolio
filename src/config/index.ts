/**
 * Configuração de ambiente para o projeto Victor Portfolio
 * 
 * Este arquivo centraliza todas as configurações de ambiente
 * e fornece valores padrão para desenvolvimento.
 */

// ============================================================================
// CONFIGURAÇÕES DE API
// ============================================================================

/**
 * URL base da API do blog
 */
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://victor-portfolio-api.railway.app',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

/**
 * Endpoints da API
 */
export const API_ENDPOINTS = {
  BLOG: '/blog',
  POSTS: '/posts',
  HEALTH: '/health',
} as const;

// ============================================================================
// CONFIGURAÇÕES DE DESENVOLVIMENTO
// ============================================================================

/**
 * Configurações específicas para desenvolvimento
 */
export const DEV_CONFIG = {
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  ENABLE_LOGGING: process.env.NODE_ENV === 'development',
  ENABLE_ANALYTICS: process.env.NODE_ENV === 'production',
} as const;

// ============================================================================
// CONFIGURAÇÕES DE PERFORMANCE
// ============================================================================

/**
 * Configurações de performance e otimização
 */
export const PERFORMANCE_CONFIG = {
  DEBOUNCE_DELAY: {
    SEARCH: 300,
    RESIZE: 250,
    SCROLL: 100,
  },
  THROTTLE_DELAY: {
    SCROLL: 16, // ~60fps
    RESIZE: 100,
  },
  LAZY_LOADING: {
    THRESHOLD: 0.1,
    ROOT_MARGIN: '50px',
  },
  IMAGE_OPTIMIZATION: {
    QUALITY: 80,
    FORMAT: 'webp',
    SIZES: [320, 640, 768, 1024, 1280, 1920],
  },
} as const;

// ============================================================================
// CONFIGURAÇÕES DE ANALYTICS
// ============================================================================

/**
 * Configurações de analytics e métricas
 */
export const ANALYTICS_CONFIG = {
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GA_ID || '',
  VERCEL_ANALYTICS: DEV_CONFIG.IS_PRODUCTION,
  SPEED_INSIGHTS: DEV_CONFIG.IS_PRODUCTION,
} as const;

// ============================================================================
// CONFIGURAÇÕES DE SEGURANÇA
// ============================================================================

/**
 * Configurações de segurança
 */
export const SECURITY_CONFIG = {
  CSP_POLICY: "upgrade-insecure-requests",
  ALLOWED_ORIGINS: [
    'https://victor-portfolio-sepia.vercel.app',
    'https://victor-portfolio-api.railway.app',
    'http://localhost:3000',
  ],
} as const;

// ============================================================================
// CONFIGURAÇÕES DE CACHE
// ============================================================================

/**
 * Configurações de cache
 */
export const CACHE_CONFIG = {
  STATIC_ASSETS: {
    MAX_AGE: 31536000, // 1 ano
  },
  API_RESPONSES: {
    MAX_AGE: 300, // 5 minutos
  },
  BROWSER_CACHE: {
    MAX_AGE: 86400, // 1 dia
  },
} as const;

// ============================================================================
// CONFIGURAÇÕES DE FEATURES
// ============================================================================

/**
 * Configurações de features e funcionalidades
 */
export const FEATURES_CONFIG = {
  ENABLE_PWA: true,
  ENABLE_DARK_MODE: true,
  ENABLE_ANIMATIONS: true,
  ENABLE_PARTICLES: true,
  ENABLE_SEARCH: true,
  ENABLE_BLOG: true,
  ENABLE_PROJECTS: true,
  ENABLE_CONTACT: true,
} as const;

// ============================================================================
// CONFIGURAÇÕES DE UI/UX
// ============================================================================

/**
 * Configurações de interface e experiência do usuário
 */
export const UI_CONFIG = {
  ANIMATION_DURATION: {
    FAST: 200,
    NORMAL: 400,
    SLOW: 600,
    VERY_SLOW: 1000,
  },
  BREAKPOINTS: {
    MOBILE: 640,
    TABLET: 768,
    DESKTOP: 1024,
    LARGE_DESKTOP: 1280,
  },
  Z_INDEX: {
    DROPDOWN: 10,
    STICKY: 20,
    FIXED: 30,
    MODAL_BACKDROP: 40,
    MODAL: 50,
    POPOVER: 60,
    TOOLTIP: 70,
  },
} as const;

// ============================================================================
// CONFIGURAÇÕES DE CONTEÚDO
// ============================================================================

/**
 * Configurações de conteúdo e dados
 */
export const CONTENT_CONFIG = {
  BLOG: {
    POSTS_PER_PAGE: 10,
    MAX_TITLE_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 200,
  },
  PROJECTS: {
    ITEMS_PER_PAGE: 6,
    MAX_DESCRIPTION_LENGTH: 300,
  },
  SEARCH: {
    MIN_QUERY_LENGTH: 2,
    MAX_RESULTS: 20,
  },
} as const;

// ============================================================================
// CONFIGURAÇÕES DE ERRO
// ============================================================================

/**
 * Configurações de tratamento de erro
 */
export const ERROR_CONFIG = {
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  TIMEOUT_MESSAGE: 'A requisição demorou muito para responder',
  NETWORK_ERROR_MESSAGE: 'Erro de conexão. Verifique sua internet.',
  GENERIC_ERROR_MESSAGE: 'Ocorreu um erro inesperado. Tente novamente.',
} as const;

// ============================================================================
// CONFIGURAÇÕES DE ACESSIBILIDADE
// ============================================================================

/**
 * Configurações de acessibilidade
 */
export const ACCESSIBILITY_CONFIG = {
  FOCUS_VISIBLE: true,
  REDUCED_MOTION: 'prefers-reduced-motion',
  HIGH_CONTRAST: 'prefers-contrast',
  SCREEN_READER_SUPPORT: true,
  KEYBOARD_NAVIGATION: true,
} as const;

// ============================================================================
// CONFIGURAÇÕES DE SEO
// ============================================================================

/**
 * Configurações de SEO
 */
export const SEO_CONFIG = {
  DEFAULT_TITLE: 'Victor Portfolio - Desenvolvedor Full Stack',
  DEFAULT_DESCRIPTION: 'Portfólio de Victor, desenvolvedor Full Stack especializado em React, Node.js e tecnologias web modernas.',
  DEFAULT_KEYWORDS: [
    'desenvolvedor',
    'full stack',
    'react',
    'nodejs',
    'javascript',
    'typescript',
    'portfolio',
    'web development'
  ],
  SITE_URL: 'https://victor-portfolio-sepia.vercel.app',
  AUTHOR: 'Victor',
  LANGUAGE: 'pt-BR',
} as const;
