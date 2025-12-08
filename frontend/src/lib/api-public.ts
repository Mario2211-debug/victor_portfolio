/**
 * API pública para requisições sem autenticação
 * Agora consome a API externa PortfolioHub
 */

import { 
  fetchPortfolioHubData, 
  mapPortfolioHubProjectToProject,
  mapPortfolioHubPostToBlogPost 
} from './portfoliohub-api';

// Projects API (pública) - agora usa PortfolioHub
export const projectsAPIPublic = {
  getAll: async (params?: { type?: string; employmentType?: string; search?: string; page?: number; limit?: number }) => {
    const data = await fetchPortfolioHubData();
    
    if (!data.success || !data.data.projects) {
      return [];
    }

    let projects = data.data.projects.map(mapPortfolioHubProjectToProject);

    // Aplicar filtros
    if (params?.type) {
      projects = projects.filter(p => 
        p.type?.toLowerCase().includes(params.type!.toLowerCase())
      );
    }

    if (params?.employmentType) {
      projects = projects.filter(p => p.employmentType === params.employmentType);
    }

    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      projects = projects.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.technologies.some(t => t.toLowerCase().includes(searchLower))
      );
    }

    // Paginação
    if (params?.page && params?.limit) {
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      projects = projects.slice(startIndex, endIndex);
    } else if (params?.limit) {
      projects = projects.slice(0, params.limit);
    }

    return projects;
  },
  getById: async (id: string) => {
    const data = await fetchPortfolioHubData();
    
    if (!data.success || !data.data.projects) {
      return null;
    }

    const project = data.data.projects.find(p => p._id === id);
    return project ? mapPortfolioHubProjectToProject(project) : null;
  },
};

// Blog API (pública) - agora usa PortfolioHub
export const blogAPIPublic = {
  getAll: async (params?: { search?: string; category?: string; page?: number; limit?: number }) => {
    const data = await fetchPortfolioHubData();
    
    if (!data.success || !data.data.posts) {
      return [];
    }

    let posts = data.data.posts.map(mapPortfolioHubPostToBlogPost);

    // Aplicar filtros
    if (params?.category) {
      posts = posts.filter(p => 
        p.category?.toLowerCase() === params.category!.toLowerCase()
      );
    }

    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      posts = posts.filter(p => 
        p.title?.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.content?.toLowerCase().includes(searchLower)
      );
    }

    // Ordenar por data (mais recente primeiro)
    posts.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

    // Paginação
    if (params?.page && params?.limit) {
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      posts = posts.slice(startIndex, endIndex);
    } else if (params?.limit) {
      posts = posts.slice(0, params.limit);
    }

    return posts;
  },
  getById: async (id: string) => {
    const data = await fetchPortfolioHubData();
    
    if (!data.success || !data.data.posts) {
      return null;
    }

    // Buscar por _id ou slug
    const post = data.data.posts.find(p => p._id === id || p.slug === id);
    
    return post ? mapPortfolioHubPostToBlogPost(post) : null;
  },
};

