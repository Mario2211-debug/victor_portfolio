/**
 * Serviço centralizado para comunicação com a API do backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Função auxiliar para fazer requisições autenticadas
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
};

// Auth API
export const authAPI = {
    login: async (email: string, password: string) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    },
    register: async (name: string, email: string, password: string) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    },
    getProfile: async () => {
        return fetchWithAuth('/auth/profile');
    },
};

// Projects API
export const projectsAPI = {
    getAll: async (params?: { type?: string; employmentType?: string }) => {
        const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
        return fetchWithAuth(`/projects${queryString}`);
    },
    getById: async (id: string) => {
        return fetchWithAuth(`/projects/${id}`);
    },
    create: async (data: any) => {
        return fetchWithAuth('/projects', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    update: async (id: string, data: any) => {
        return fetchWithAuth(`/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    delete: async (id: string) => {
        return fetchWithAuth(`/projects/${id}`, {
            method: 'DELETE',
        });
    },
};

// Skills API
export const skillsAPI = {
    getAll: async (params?: { type?: string }) => {
        const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
        return fetchWithAuth(`/skills${queryString}`);
    },
    getById: async (id: string) => {
        return fetchWithAuth(`/skills/${id}`);
    },
    create: async (data: any) => {
        return fetchWithAuth('/skills', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    update: async (id: string, data: any) => {
        return fetchWithAuth(`/skills/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    delete: async (id: string) => {
        return fetchWithAuth(`/skills/${id}`, {
            method: 'DELETE',
        });
    },
};

// Education API
export const educationAPI = {
    getAll: async (params?: { type?: string; year?: number }) => {
        const queryString = params ? `?${new URLSearchParams(params as any).toString()}` : '';
        return fetchWithAuth(`/education${queryString}`);
    },
    getById: async (id: string) => {
        return fetchWithAuth(`/education/${id}`);
    },
    create: async (data: any) => {
        return fetchWithAuth('/education', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    update: async (id: string, data: any) => {
        return fetchWithAuth(`/education/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    delete: async (id: string) => {
        return fetchWithAuth(`/education/${id}`, {
            method: 'DELETE',
        });
    },
};

// Experience API
export const experienceAPI = {
    getAll: async () => {
        return fetchWithAuth('/experience');
    },
    getById: async (id: string) => {
        return fetchWithAuth(`/experience/${id}`);
    },
    create: async (data: any) => {
        return fetchWithAuth('/experience', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    update: async (id: string, data: any) => {
        return fetchWithAuth(`/experience/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    delete: async (id: string) => {
        return fetchWithAuth(`/experience/${id}`, {
            method: 'DELETE',
        });
    },
};

// Profile API
export const profileAPI = {
    get: async () => {
        return fetchWithAuth('/profile');
    },
    create: async (data: any) => {
        return fetchWithAuth('/profile', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    update: async (data: any) => {
        return fetchWithAuth('/profile', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    delete: async () => {
        return fetchWithAuth('/profile', {
            method: 'DELETE',
        });
    },
};

// Languages API
export const languagesAPI = {
    getAll: async () => {
        return fetchWithAuth('/languages');
    },
    getById: async (id: string) => {
        return fetchWithAuth(`/languages/${id}`);
    },
    create: async (data: any) => {
        return fetchWithAuth('/languages', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
    update: async (id: string, data: any) => {
        return fetchWithAuth(`/languages/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    delete: async (id: string) => {
        return fetchWithAuth(`/languages/${id}`, {
            method: 'DELETE',
        });
    },
};

// Blog API
export const blogAPI = {
    getAll: async () => {
        return fetchWithAuth('/blog');
    },
    getById: async (id: string) => {
        return fetchWithAuth(`/blog/post/${id}`);
    },
    create: async (formData: FormData) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        const headers: HeadersInit = {};
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/blog/new`, {
            method: 'POST',
            headers,
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    },
    update: async (id: string, data: any) => {
        return fetchWithAuth(`/blog/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
    delete: async (id: string) => {
        return fetchWithAuth(`/blog/post/${id}`, {
            method: 'DELETE',
        });
    },
};

