/**
 * Tipos centralizados para o projeto Victor Portfolio
 * 
 * Este arquivo contém todas as interfaces e tipos utilizados
 * em todo o projeto para garantir consistência e facilitar manutenção.
 */

// ============================================================================
// TIPOS BASE
// ============================================================================

/**
 * Interface base para posts do blog
 */
export interface BlogPost {
  _id: string;
  title?: string;
  content?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  date?: Date | string;
  readers?: string;
  className?: string;
  imgclassName?: string;
  src?: string;
  alt?: string;
}

/**
 * Interface para dados offline de posts
 */
export interface OfflineData {
  posts: BlogPost[][];
}

/**
 * Interface para projetos
 */
export interface Project {
  name: string;
  description: string;
  timeframe: string;
  role: string;
  company: string;
  technologies: string[];
  type?: string;
  link?: string;
}

/**
 * Interface para dados de projetos
 */
export interface ProjectData {
  projects: Project[];
}

// ============================================================================
// TIPOS DE COMPONENTES
// ============================================================================

/**
 * Tipos de seção disponíveis na página principal
 */
export type SectionType = 'about' | 'contacts' | 'projects' | null;

/**
 * Props para componentes de navegação móvel
 */
export interface MobileNavProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Props para componentes de popup
 */
export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

/**
 * Props para componentes de busca
 */
export interface SearchBarProps {
  onClose: () => void;
}

// ============================================================================
// TIPOS DE ANIMAÇÃO
// ============================================================================

/**
 * Variantes de animação para Framer Motion
 */
export interface AnimationVariants {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    transition?: {
      duration?: number;
      staggerChildren?: number;
    };
  };
}

/**
 * Variantes de hover para componentes
 */
export interface HoverVariants {
  hover: {
    scale?: number;
    opacity?: number;
    filter?: string;
    rotate?: number;
    x?: number;
    y?: number;
    boxShadow?: string;
    transition?: {
      duration?: number;
      ease?: string;
    };
  };
}

// ============================================================================
// TIPOS DE TEMA
// ============================================================================

/**
 * Tipos de tema disponíveis
 */
export type ThemeType = 'light' | 'dark';

/**
 * Configuração de tema
 */
export interface ThemeConfig {
  attribute: string;
  defaultTheme: ThemeType;
  value: {
    light: string;
    dark: string;
  };
}

// ============================================================================
// TIPOS DE API
// ============================================================================

/**
 * Resposta padrão da API
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

/**
 * Configuração de requisição HTTP
 */
export interface RequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  headers?: Record<string, string>;
}

// ============================================================================
// TIPOS DE UTILITÁRIOS
// ============================================================================

/**
 * Configuração de gradiente
 */
export interface GradientConfig {
  light: string;
  dark: string;
}

/**
 * Configuração de layout
 */
export interface LayoutConfig {
  container: string;
  padding: string;
  maxWidth: string;
}

/**
 * Configuração de animação
 */
export interface AnimationConfig {
  duration: number;
  ease: string;
  delay?: number;
}

// ============================================================================
// TIPOS DE CONTEXTO
// ============================================================================

/**
 * Estado do contexto de tarefas
 */
export interface TaskContextState {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
}

/**
 * Interface para tarefas
 */
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Estado do contexto de estações de rádio
 */
export interface StationContextState {
  stations: RadioStation[];
  currentStation: RadioStation | null;
  isPlaying: boolean;
  setCurrentStation: (station: RadioStation) => void;
  togglePlay: () => void;
}

/**
 * Interface para estações de rádio
 */
export interface RadioStation {
  id: string;
  name: string;
  url: string;
  country: string;
  genre: string;
  bitrate?: number;
}
