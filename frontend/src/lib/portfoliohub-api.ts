/**
 * Serviço para consumir a API externa PortfolioHub
 * https://portfoliohub-y8ds.onrender.com/api/public/marioafonso1997
 */

const PORTFOLIOHUB_API_URL = 'https://portfoliohub-y8ds.onrender.com/api/public/marioafonso1997';

export interface PortfolioHubUser {
  name: string;
  email: string;
  avatarUrl: string;
  username: string;
}

export interface PortfolioHubProfile {
  title: string;
  summary: string;
  location: string;
  contact: Record<string, any>;
  theme: string;
}

export interface PortfolioHubExperience {
  _id: string;
  user: string;
  company: string;
  position: string;
  context: string;
  responsibilities: string[];
  technologies: string[];
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PortfolioHubEducation {
  _id: string;
  user: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  type: string;
  coursework: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PortfolioHubSkill {
  _id: string;
  user: string;
  technology: string;
  level: number;
  category: string;
  type: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PortfolioHubProject {
  _id: string;
  user: string;
  name: string;
  description: string;
  items: string[]
  category: string;
  employmentType: string;
  role: string;
  company: string | null;
  course: string | null;
  type: string;
  technologies: string[];
  link: string;
  context: string;
  responsibilities: string[];
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PortfolioHubLanguage {
  _id: string;
  user: string;
  language: string;
  understanding: string;
  speaking: string;
  writing: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PortfolioHubPost {
  _id: string;
  user: string;
  title: string;
  slug?: string;
  content: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  published?: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PortfolioHubResponse {
  success: boolean;
  data: {
    user: PortfolioHubUser;
    profile: PortfolioHubProfile;
    experiences: PortfolioHubExperience[];
    education: PortfolioHubEducation[];
    skills: PortfolioHubSkill[];
    projects: PortfolioHubProject[];
    languages: PortfolioHubLanguage[];
    posts: PortfolioHubPost[];
  };
}

// Cache para evitar múltiplas requisições
let cachedData: PortfolioHubResponse | null = null;
let cacheTimestamp: number = 0;
// Reduzir cache para 30 segundos em desenvolvimento, 5 minutos em produção
const CACHE_DURATION = process.env.NODE_ENV === 'development' 
  ? 30 * 1000 // 30 segundos em desenvolvimento
  : 5 * 60 * 1000; // 5 minutos em produção

/**
 * Busca todos os dados do portfólio da API externa
 * @param forceRefresh - Se true, ignora o cache e busca dados frescos
 */
export async function fetchPortfolioHubData(forceRefresh: boolean = false): Promise<PortfolioHubResponse> {
  // Verificar cache (a menos que forceRefresh seja true)
  const now = Date.now();
  if (!forceRefresh && cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedData;
  }

  try {
    const response = await fetch(PORTFOLIOHUB_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Forçar busca fresca quando forceRefresh for true
      cache: forceRefresh ? 'no-store' : 'default',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PortfolioHubResponse = await response.json();
    
    // Atualizar cache
    cachedData = data;
    cacheTimestamp = now;
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do PortfolioHub:', error);
    throw error;
  }
}

/**
 * Limpa o cache (útil para forçar atualização)
 */
export function clearPortfolioHubCache() {
  cachedData = null;
  cacheTimestamp = 0;
}

/**
 * Mapeia Project da API externa para o formato esperado pelo frontend
 */
export function mapPortfolioHubProjectToProject(project: PortfolioHubProject) {
  // Calcular timeframe baseado em startDate e endDate
  let timeframe = '';
  if (project.startDate) {
    const start = new Date(project.startDate);
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = monthNames[start.getMonth()];
    const year = start.getFullYear();
    timeframe = `${month} ${year}`;
    
    if (project.endDate) {
      const end = new Date(project.endDate);
      const endMonth = monthNames[end.getMonth()];
      const endYear = end.getFullYear();
      timeframe += ` - ${endMonth} ${endYear}`;
    } else if (project.isCurrent) {
      timeframe += ' - CURRENT';
    }
  }

  return {
    _id: project._id,
    name: project.name,
    description: project.description,
    timeframe: timeframe || 'N/A',
    role: project.role || 'Fullstack Developer',
    company: project.company,
    employmentType: project.employmentType,
    technologies: project.technologies || [],
    items: project.items || [],
    type: project.type || project.category || '',
    link: project.link || '',
    context: project.context || '',
    responsibilities: project.responsibilities || [],
    startDate: project.startDate,
    endDate: project.endDate,
    isCurrent: project.isCurrent,
  };
}

/**
 * Mapeia Experience da API externa para o formato esperado pelo frontend
 */
export function mapPortfolioHubExperienceToExperience(exp: PortfolioHubExperience) {
  let period = '';
  if (exp.startDate) {
    const start = new Date(exp.startDate);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[start.getMonth()];
    const year = start.getFullYear();
    period = `${month} ${year}`;
    
    if (exp.endDate) {
      const end = new Date(exp.endDate);
      const endMonth = monthNames[end.getMonth()];
      const endYear = end.getFullYear();
      period += ` – ${endMonth} ${endYear}`;
    } else if (exp.isCurrent) {
      period += ' – Current';
    }
  }

  return {
    _id: exp._id,
    company: exp.company,
    position: exp.position,
    period: period,
    context: exp.context || '',
    responsibilities: exp.responsibilities || [],
    technologies: exp.technologies || [],
    isCurrent: exp.isCurrent,
    startDate: exp.startDate,
    endDate: exp.endDate,
  };
}

/**
 * Mapeia Skill da API externa para o formato esperado pelo frontend
 */
export function mapPortfolioHubSkillToSkill(skill: PortfolioHubSkill) {
  return {
    _id: skill._id,
    technology: skill.technology,
    level: skill.level,
    type: skill.type,
    category: skill.category,
    description: skill.description || '',
  };
}

/**
 * Mapeia Education da API externa para o formato esperado pelo frontend
 */
export function mapPortfolioHubEducationToEducation(edu: PortfolioHubEducation) {
  let period = '';
  if (edu.startDate) {
    const start = new Date(edu.startDate);
    period = start.getFullYear().toString();
    
    if (edu.endDate) {
      const end = new Date(edu.endDate);
      period = `${start.getFullYear()} - ${end.getFullYear()}`;
    } else if (edu.isCurrent) {
      period = `${start.getFullYear()} - Current`;
    }
  }

  return {
    _id: edu._id,
    institution: edu.institution,
    degree: edu.degree,
    period: period,
    year: edu.startDate ? new Date(edu.startDate).getFullYear() : new Date().getFullYear(),
    type: edu.type,
    description: edu.description || '',
    startDate: edu.startDate,
    endDate: edu.endDate,
    isCurrent: edu.isCurrent,
  };
}

/**
 * Mapeia Post da API externa para o formato esperado pelo frontend
 */
export function mapPortfolioHubPostToBlogPost(post: PortfolioHubPost) {
  return {
    _id: post._id,
    slug: post.slug,
    title: post.title,
    content: post.content,
    description: post.description,
    imageUrl: post.imageUrl,
    category: post.category,
    date: post.date || post.createdAt,
    readers: '0',
  };
}

