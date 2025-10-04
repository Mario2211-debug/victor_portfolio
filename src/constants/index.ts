/**
 * Constantes centralizadas para o projeto Victor Portfolio
 * 
 * Este arquivo contém todas as constantes utilizadas em todo o projeto
 * para facilitar manutenção e evitar valores hardcoded.
 */

// ============================================================================
// CONFIGURAÇÕES DE API
// ============================================================================

/**
 * URL base da API do blog
 * @deprecated Use API_CONFIG.BASE_URL from @/config instead
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://victor-portfolio-api.railway.app';

/**
 * Endpoints da API
 * @deprecated Use API_ENDPOINTS from @/config instead
 */
export const API_ENDPOINTS = {
  BLOG: '/blog',
  POSTS: '/posts',
} as const;

/**
 * Timeout para requisições HTTP (em milissegundos)
 * @deprecated Use API_CONFIG.TIMEOUT from @/config instead
 */
export const REQUEST_TIMEOUT = 10000;

// ============================================================================
// CONFIGURAÇÕES DE ANIMAÇÃO
// ============================================================================

/**
 * Durações padrão para animações (em segundos)
 */
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.4,
  SLOW: 0.6,
  VERY_SLOW: 1.0,
} as const;

/**
 * Easing functions para animações
 */
export const ANIMATION_EASING = {
  EASE_IN: 'easeIn',
  EASE_OUT: 'easeOut',
  EASE_IN_OUT: 'easeInOut',
  LINEAR: 'linear',
} as const;

/**
 * Delays padrão para animações (em segundos)
 */
export const ANIMATION_DELAY = {
  NONE: 0,
  SHORT: 0.1,
  MEDIUM: 0.2,
  LONG: 0.3,
} as const;

// ============================================================================
// CONFIGURAÇÕES DE LAYOUT
// ============================================================================

/**
 * Breakpoints responsivos
 */
export const BREAKPOINTS = {
  MOBILE: 'mobile',
  TABLET: 'md',
  DESKTOP: 'lg',
  LARGE_DESKTOP: 'xl',
} as const;

/**
 * Padding padrão para containers
 */
export const CONTAINER_PADDING = {
  MOBILE: 'px-6',
  TABLET: 'px-8',
  DESKTOP: 'px-10',
  LARGE_DESKTOP: 'px-12',
  EXTRA_LARGE: 'px-40',
} as const;

/**
 * Larguras padrão para componentes
 */
export const COMPONENT_WIDTHS = {
  SMALL: 'w-[350px]',
  MEDIUM: 'w-[400px]',
  LARGE: 'w-[500px]',
  FULL: 'w-full',
} as const;

// ============================================================================
// CONFIGURAÇÕES DE TEMA
// ============================================================================

/**
 * Temas disponíveis
 */
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

/**
 * Configuração padrão do tema
 */
export const DEFAULT_THEME = THEMES.DARK;

/**
 * Classes CSS para gradientes de tema
 */
export const THEME_GRADIENTS = {
  LIGHT: 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200',
  DARK: 'bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950',
} as const;

// ============================================================================
// CONFIGURAÇÕES DE CORES
// ============================================================================

/**
 * Cores padrão para diferentes estados
 */
export const COLORS = {
  PRIMARY: {
    LIGHT: 'text-gray-400',
    DARK: 'text-[#6b7280]',
  },
  SECONDARY: {
    LIGHT: 'text-gray-500',
    DARK: 'text-gray-400',
  },
  ACCENT: {
    LIGHT: 'text-red-500',
    DARK: 'text-red-400',
  },
  BACKGROUND: {
    LIGHT: 'bg-white',
    DARK: 'bg-black',
  },
} as const;

// ============================================================================
// CONFIGURAÇÕES DE NAVEGAÇÃO
// ============================================================================

/**
 * Rotas principais da aplicação
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  BLOG: '/blog',
  MAP_VIEW: '/mapView',
} as const;

/**
 * Links de navegação
 */
export const NAVIGATION_LINKS = [
  { href: ROUTES.HOME, label: 'Home' },
  { href: ROUTES.MAP_VIEW, label: 'Mapa' },
  { href: ROUTES.PROJECTS, label: 'Projects' },
  { href: ROUTES.ABOUT, label: 'Sobre' },
] as const;

// ============================================================================
// CONFIGURAÇÕES DE COMPONENTES
// ============================================================================

/**
 * Configurações para componentes de seção
 */
export const SECTION_CONFIG = {
  MAX_HEIGHT: 'max-h-[425px]',
  OVERFLOW: 'overflow-y-auto',
  SCROLLBAR: 'hide-scrollbar',
  TRANSITION: 'transition-all duration-1000 ease-in-out',
} as const;

/**
 * Configurações para cards
 */
export const CARD_CONFIG = {
  PADDING: 'p-4',
  BLUR_COVER: 'blur-cover',
  HOVER_OPACITY: 0.9,
  HOVER_ROTATION: 0.5,
} as const;

// ============================================================================
// CONFIGURAÇÕES DE TEXTO
// ============================================================================

/**
 * Tamanhos de fonte padrão
 */
export const FONT_SIZES = {
  EXTRA_SMALL: 'text-[0.65rem]',
  SMALL: 'text-xs',
  MEDIUM: 'text-sm',
  LARGE: 'text-md',
  EXTRA_LARGE: 'text-lg',
} as const;

/**
 * Pesos de fonte padrão
 */
export const FONT_WEIGHTS = {
  THIN: 'font-thin',
  NORMAL: 'font-normal',
  MEDIUM: 'font-medium',
  SEMIBOLD: 'font-semibold',
  BOLD: 'font-bold',
} as const;

// ============================================================================
// CONFIGURAÇÕES DE ÍCONES
// ============================================================================

/**
 * Tamanhos padrão para ícones
 */
export const ICON_SIZES = {
  SMALL: 'h-3 w-3',
  MEDIUM: 'h-5 w-5',
  LARGE: 'h-6 w-6',
  EXTRA_LARGE: 'h-8 w-8',
} as const;

// ============================================================================
// CONFIGURAÇÕES DE BORDAS E SOMBRAS
// ============================================================================

/**
 * Configurações de borda padrão
 */
export const BORDER_CONFIG = {
  DIVIDER: 'border-t-2 py-2 border-gray-600 border-dotted',
  SOLID: 'border-b-2 border-solid border-[#ffffff]',
  ROUNDED: 'rounded-lg',
  ROUNDED_FULL: 'rounded-full',
} as const;

/**
 * Configurações de sombra padrão
 */
export const SHADOW_CONFIG = {
  SMALL: 'shadow-sm',
  MEDIUM: 'shadow-md',
  LARGE: 'shadow-lg',
  EXTRA_LARGE: 'shadow-xl',
  CUSTOM: '0px 4px 8px rgba(0, 0, 0, 0.15)',
} as const;

// ============================================================================
// CONFIGURAÇÕES DE Z-INDEX
// ============================================================================

/**
 * Z-index padrão para camadas
 */
export const Z_INDEX = {
  DROPDOWN: 10,
  STICKY: 20,
  FIXED: 30,
  MODAL_BACKDROP: 40,
  MODAL: 50,
  POPOVER: 60,
  TOOLTIP: 70,
} as const;

// ============================================================================
// CONFIGURAÇÕES DE PERFORMANCE
// ============================================================================

/**
 * Configurações de debounce para otimização
 */
export const DEBOUNCE_DELAY = {
  SEARCH: 300,
  RESIZE: 250,
  SCROLL: 100,
} as const;

/**
 * Configurações de lazy loading
 */
export const LAZY_LOADING = {
  THRESHOLD: 0.1,
  ROOT_MARGIN: '50px',
} as const;
