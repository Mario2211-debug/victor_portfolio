'use client';

import { useState } from 'react';
import { projectsAPI, skillsAPI, educationAPI, experienceAPI, profileAPI, languagesAPI, blogAPI } from '@/lib/api';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

// ============================================================================
// BLOG MANAGER
// ============================================================================

export function BlogManager({ posts, onRefetch }: any) {
    const [showForm, setShowForm] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        category: '',
        file: null as File | null
    });
    const [categories, setCategories] = useState<any[]>([]);

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        ['clean']
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('title', formData.title);
            form.append('description', formData.description);
            form.append('content', formData.content);
            form.append('category', formData.category);
            if (formData.file) {
                form.append('file', formData.file);
            }

            if (editingPost) {
                await blogAPI.update(editingPost._id, {
                    title: formData.title,
                    description: formData.description,
                    content: formData.content,
                    category: formData.category
                });
            } else {
                await blogAPI.create(form);
            }

            setShowForm(false);
            setEditingPost(null);
            setFormData({ title: '', description: '', content: '', category: '', file: null });
            onRefetch();
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja deletar este post?')) return;
        try {
            await blogAPI.delete(id);
            onRefetch();
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const handleEdit = (post: any) => {
        setEditingPost(post);
        setFormData({
            title: post.title || '',
            description: post.description || '',
            content: post.content || '',
            category: post.category?._id || '',
            file: null
        });
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Blog Posts ({posts.length})</h2>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingPost(null);
                        setFormData({ title: '', description: '', content: '', category: '', file: null });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                    {showForm ? 'Cancelar' : '+ Novo Post'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg mb-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Título</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Descrição</label>
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Conteúdo</label>
                        <ReactQuill
                            theme="snow"
                            value={formData.content}
                            onChange={(value) => setFormData({ ...formData, content: value })}
                            modules={{ toolbar: toolbarOptions }}
                            className="bg-gray-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Categoria</label>
                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                        />
                    </div>
                    {!editingPost && (
                        <div>
                            <label className="block text-sm font-medium mb-2">Imagem</label>
                            <input
                                type="file"
                                onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            />
                        </div>
                    )}
                    <div className="flex gap-2">
                        <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                            {editingPost ? 'Atualizar' : 'Criar'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setEditingPost(null);
                            }}
                            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {posts.map((post: any) => (
                    <div key={post._id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg">{post.title}</h3>
                            <p className="text-sm text-gray-400 mt-1">{post.description}</p>
                            <p className="text-xs text-gray-500 mt-2">
                                {new Date(post.date).toLocaleDateString('pt-BR')}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(post)}
                                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(post._id)}
                                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// PROJECTS MANAGER
// ============================================================================

export function ProjectsManager({ projects, onRefetch }: any) {
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        timeframe: '',
        employmentType: 'PERSONAL PROJECT',
        role: 'Fullstack Developer',
        company: '',
        type: '',
        technologies: [] as string[],
        link: '',
        context: '',
        responsibilities: [] as string[]
    });
    const [newTech, setNewTech] = useState('');
    const [newResponsibility, setNewResponsibility] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProject) {
                await projectsAPI.update(editingProject._id, formData);
            } else {
                await projectsAPI.create(formData);
            }
            setShowForm(false);
            setEditingProject(null);
            resetForm();
            onRefetch();
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            timeframe: '',
            employmentType: 'PERSONAL PROJECT',
            role: 'Fullstack Developer',
            company: '',
            type: '',
            technologies: [],
            link: '',
            context: '',
            responsibilities: []
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja deletar este projeto?')) return;
        try {
            await projectsAPI.delete(id);
            onRefetch();
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const handleEdit = (project: any) => {
        setEditingProject(project);
        setFormData({
            name: project.name || '',
            description: project.description || '',
            timeframe: project.timeframe || '',
            employmentType: project.employmentType || 'PERSONAL PROJECT',
            role: project.role || 'Fullstack Developer',
            company: project.company || '',
            type: project.type || '',
            technologies: project.technologies || [],
            link: project.link || '',
            context: project.context || '',
            responsibilities: project.responsibilities || []
        });
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Projetos ({projects.length})</h2>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingProject(null);
                        resetForm();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                    {showForm ? 'Cancelar' : '+ Novo Projeto'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg mb-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nome</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Período</label>
                            <input
                                type="text"
                                value={formData.timeframe}
                                onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                                placeholder="SEP 2023 - CURRENT"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Descrição</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            rows={3}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Tipo de Emprego</label>
                            <select
                                value={formData.employmentType}
                                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            >
                                <option value="PERSONAL PROJECT">Personal Project</option>
                                <option value="ACADEMIC PROJECT">Academic Project</option>
                                <option value="FULL TIME">Full Time</option>
                                <option value="PART TIME">Part Time</option>
                                <option value="FREELANCE">Freelance</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Tipo</label>
                            <input
                                type="text"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                                placeholder="Web Development"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Tecnologias</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={newTech}
                                onChange={(e) => setNewTech(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (newTech.trim()) {
                                            setFormData({
                                                ...formData,
                                                technologies: [...formData.technologies, newTech.trim()]
                                            });
                                            setNewTech('');
                                        }
                                    }
                                }}
                                className="flex-1 px-4 py-2 bg-gray-600 rounded-lg"
                                placeholder="Adicionar tecnologia"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="bg-gray-600 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                >
                                    {tech}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({
                                                ...formData,
                                                technologies: formData.technologies.filter((_, i) => i !== idx)
                                            });
                                        }}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                            {editingProject ? 'Atualizar' : 'Criar'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setEditingProject(null);
                            }}
                            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {projects.map((project: any) => (
                    <div key={project._id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg">{project.name}</h3>
                            <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                            <p className="text-xs text-gray-500 mt-2">{project.timeframe}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {project.technologies?.map((tech: string, idx: number) => (
                                    <span key={idx} className="bg-gray-600 px-2 py-1 rounded text-xs">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(project)}
                                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(project._id)}
                                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// SKILLS MANAGER
// ============================================================================

export function SkillsManager({ skills, onRefetch }: any) {
    const [showForm, setShowForm] = useState(false);
    const [editingSkill, setEditingSkill] = useState<any>(null);
    const [formData, setFormData] = useState({
        technology: '',
        level: 3,
        type: 'Professional'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingSkill) {
                await skillsAPI.update(editingSkill._id, formData);
            } else {
                await skillsAPI.create(formData);
            }
            setShowForm(false);
            setEditingSkill(null);
            setFormData({ technology: '', level: 3, type: 'Professional' });
            onRefetch();
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja deletar esta skill?')) return;
        try {
            await skillsAPI.delete(id);
            onRefetch();
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const handleEdit = (skill: any) => {
        setEditingSkill(skill);
        setFormData({
            technology: skill.technology,
            level: skill.level,
            type: skill.type
        });
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Skills ({skills.length})</h2>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingSkill(null);
                        setFormData({ technology: '', level: 3, type: 'Professional' });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                    {showForm ? 'Cancelar' : '+ Nova Skill'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg mb-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Tecnologia</label>
                        <input
                            type="text"
                            value={formData.technology}
                            onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Nível (1-5)</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={formData.level}
                            onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Tipo</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                        >
                            <option value="Professional">Professional</option>
                            <option value="Academic">Academic</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                            {editingSkill ? 'Atualizar' : 'Criar'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill: any) => (
                    <div key={skill._id} className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold">{skill.technology}</h3>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => handleEdit(skill)}
                                    className="text-blue-400 hover:text-blue-300 text-sm"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(skill._id)}
                                    className="text-red-400 hover:text-red-300 text-sm ml-2"
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">Nível: {skill.level}/5 - {skill.type}</p>
                        <div className="flex gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                                <span
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${i < skill.level ? 'bg-blue-500' : 'bg-gray-600'}`}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// EDUCATION MANAGER
// ============================================================================

export function EducationManager({ education, onRefetch }: any) {
    const [showForm, setShowForm] = useState(false);
    const [editingEdu, setEditingEdu] = useState<any>(null);
    const [formData, setFormData] = useState({
        institution: '',
        degree: '',
        period: '',
        year: new Date().getFullYear(),
        type: 'Certification'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingEdu) {
                await educationAPI.update(editingEdu._id, formData);
            } else {
                await educationAPI.create(formData);
            }
            setShowForm(false);
            setEditingEdu(null);
            setFormData({
                institution: '',
                degree: '',
                period: '',
                year: new Date().getFullYear(),
                type: 'Certification'
            });
            onRefetch();
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja deletar esta educação?')) return;
        try {
            await educationAPI.delete(id);
            onRefetch();
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const handleEdit = (edu: any) => {
        setEditingEdu(edu);
        setFormData({
            institution: edu.institution || '',
            degree: edu.degree || '',
            period: edu.period || '',
            year: edu.year || new Date().getFullYear(),
            type: edu.type || 'Certification'
        });
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Educação ({education.length})</h2>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingEdu(null);
                        setFormData({
                            institution: '',
                            degree: '',
                            period: '',
                            year: new Date().getFullYear(),
                            type: 'Certification'
                        });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                    {showForm ? 'Cancelar' : '+ Nova Educação'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg mb-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Instituição</label>
                        <input
                            type="text"
                            value={formData.institution}
                            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Curso/Certificação</label>
                        <input
                            type="text"
                            value={formData.degree}
                            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Período</label>
                            <input
                                type="text"
                                value={formData.period}
                                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                                placeholder="2025"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Ano</label>
                            <input
                                type="number"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Tipo</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                        >
                            <option value="Degree">Degree</option>
                            <option value="Master">Master</option>
                            <option value="Bootcamp">Bootcamp</option>
                            <option value="Certification">Certification</option>
                            <option value="Course">Course</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                            {editingEdu ? 'Atualizar' : 'Criar'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {education.map((edu: any) => (
                    <div key={edu._id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-start">
                        <div>
                            <h3 className="font-bold">{edu.institution}</h3>
                            <p className="text-sm">{edu.degree}</p>
                            <p className="text-xs text-gray-400">{edu.period}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(edu)}
                                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(edu._id)}
                                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// EXPERIENCE MANAGER
// ============================================================================

export function ExperienceManager({ experience, onRefetch }: any) {
    const [showForm, setShowForm] = useState(false);
    const [editingExp, setEditingExp] = useState<any>(null);
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        period: '',
        context: '',
        responsibilities: [] as string[],
        technologies: [] as string[],
        isCurrent: false
    });
    const [newResponsibility, setNewResponsibility] = useState('');
    const [newTech, setNewTech] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingExp) {
                await experienceAPI.update(editingExp._id, formData);
            } else {
                await experienceAPI.create(formData);
            }
            setShowForm(false);
            setEditingExp(null);
            resetForm();
            onRefetch();
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const resetForm = () => {
        setFormData({
            company: '',
            position: '',
            period: '',
            context: '',
            responsibilities: [],
            technologies: [],
            isCurrent: false
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja deletar esta experiência?')) return;
        try {
            await experienceAPI.delete(id);
            onRefetch();
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const handleEdit = (exp: any) => {
        setEditingExp(exp);
        setFormData({
            company: exp.company || '',
            position: exp.position || '',
            period: exp.period || '',
            context: exp.context || '',
            responsibilities: exp.responsibilities || [],
            technologies: exp.technologies || [],
            isCurrent: exp.isCurrent || false
        });
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Experiência ({experience.length})</h2>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingExp(null);
                        resetForm();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                    {showForm ? 'Cancelar' : '+ Nova Experiência'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg mb-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Empresa/Projeto</label>
                            <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Cargo</label>
                            <input
                                type="text"
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Período</label>
                            <input
                                type="text"
                                value={formData.period}
                                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                                placeholder="September 2023 – Current"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Contexto</label>
                            <input
                                type="text"
                                value={formData.context}
                                onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                                placeholder="Personal Project"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.isCurrent}
                                onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <span className="text-sm">Experiência atual</span>
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Responsabilidades</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={newResponsibility}
                                onChange={(e) => setNewResponsibility(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (newResponsibility.trim()) {
                                            setFormData({
                                                ...formData,
                                                responsibilities: [...formData.responsibilities, newResponsibility.trim()]
                                            });
                                            setNewResponsibility('');
                                        }
                                    }
                                }}
                                className="flex-1 px-4 py-2 bg-gray-600 rounded-lg"
                                placeholder="Adicionar responsabilidade"
                            />
                        </div>
                        <ul className="list-disc list-inside space-y-1">
                            {formData.responsibilities.map((resp, idx) => (
                                <li key={idx} className="text-sm flex items-center gap-2">
                                    <span>{resp}</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({
                                                ...formData,
                                                responsibilities: formData.responsibilities.filter((_, i) => i !== idx)
                                            });
                                        }}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        ×
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Tecnologias</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={newTech}
                                onChange={(e) => setNewTech(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (newTech.trim()) {
                                            setFormData({
                                                ...formData,
                                                technologies: [...formData.technologies, newTech.trim()]
                                            });
                                            setNewTech('');
                                        }
                                    }
                                }}
                                className="flex-1 px-4 py-2 bg-gray-600 rounded-lg"
                                placeholder="Adicionar tecnologia"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="bg-gray-600 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                >
                                    {tech}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({
                                                ...formData,
                                                technologies: formData.technologies.filter((_, i) => i !== idx)
                                            });
                                        }}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                            {editingExp ? 'Atualizar' : 'Criar'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setEditingExp(null);
                            }}
                            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {experience.map((exp: any) => (
                    <div key={exp._id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-start">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg">{exp.company}</h3>
                            <p className="text-sm">{exp.position}</p>
                            <p className="text-xs text-gray-400">{exp.period}</p>
                            <p className="text-xs text-gray-500 mt-1">{exp.context}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(exp)}
                                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(exp._id)}
                                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================================================
// PROFILE MANAGER
// ============================================================================

export function ProfileManager({ profile, onRefetch }: any) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        experienceYears: '3+',
        profile: '',
        contact: {
            email: '',
            phone: '',
            linkedin: '',
            github: ''
        },
        location: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (profile) {
                await profileAPI.update(formData);
            } else {
                await profileAPI.create(formData);
            }
            setShowForm(false);
            onRefetch();
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const handleEdit = () => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                title: profile.title || '',
                experienceYears: profile.experienceYears || '3+',
                profile: profile.profile || '',
                contact: profile.contact || {
                    email: '',
                    phone: '',
                    linkedin: '',
                    github: ''
                },
                location: profile.location || ''
            });
        }
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Perfil</h2>
                <button
                    onClick={handleEdit}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                    {showForm ? 'Cancelar' : profile ? 'Editar Perfil' : 'Criar Perfil'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg mb-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nome</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Título</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Anos de Experiência</label>
                        <input
                            type="text"
                            value={formData.experienceYears}
                            onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            placeholder="3+"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Perfil/Resumo</label>
                        <textarea
                            value={formData.profile}
                            onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            rows={5}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Localização</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={formData.contact.email}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    contact: { ...formData.contact, email: e.target.value }
                                })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Telefone</label>
                            <input
                                type="text"
                                value={formData.contact.phone}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    contact: { ...formData.contact, phone: e.target.value }
                                })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">LinkedIn</label>
                            <input
                                type="url"
                                value={formData.contact.linkedin}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    contact: { ...formData.contact, linkedin: e.target.value }
                                })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">GitHub</label>
                            <input
                                type="url"
                                value={formData.contact.github}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    contact: { ...formData.contact, github: e.target.value }
                                })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                            {profile ? 'Atualizar' : 'Criar'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            {profile && !showForm && (
                <div className="bg-gray-700 p-6 rounded-lg">
                    <h3 className="font-bold text-xl mb-2">{profile.name}</h3>
                    <p className="text-lg mb-2">{profile.title}</p>
                    <p className="text-sm text-gray-400 mb-4">{profile.experienceYears} anos de experiência</p>
                    <p className="text-sm text-gray-300 mb-4">{profile.profile}</p>
                    {profile.contact && (
                        <div className="text-sm text-gray-400">
                            <p>Email: {profile.contact.email}</p>
                            <p>LinkedIn: {profile.contact.linkedin}</p>
                            <p>GitHub: {profile.contact.github}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ============================================================================
// LANGUAGES MANAGER
// ============================================================================

export function LanguagesManager({ languages, onRefetch }: any) {
    const [showForm, setShowForm] = useState(false);
    const [editingLang, setEditingLang] = useState<any>(null);
    const [formData, setFormData] = useState({
        language: '',
        understanding: 'B2',
        speaking: 'B2',
        writing: 'B2'
    });

    const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingLang) {
                await languagesAPI.update(editingLang._id, formData);
            } else {
                await languagesAPI.create(formData);
            }
            setShowForm(false);
            setEditingLang(null);
            setFormData({ language: '', understanding: 'B2', speaking: 'B2', writing: 'B2' });
            onRefetch();
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja deletar este idioma?')) return;
        try {
            await languagesAPI.delete(id);
            onRefetch();
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const handleEdit = (lang: any) => {
        setEditingLang(lang);
        setFormData({
            language: lang.language,
            understanding: lang.understanding,
            speaking: lang.speaking,
            writing: lang.writing
        });
        setShowForm(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Idiomas ({languages.length})</h2>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingLang(null);
                        setFormData({ language: '', understanding: 'B2', speaking: 'B2', writing: 'B2' });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
                >
                    {showForm ? 'Cancelar' : '+ Novo Idioma'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-gray-700 p-6 rounded-lg mb-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Idioma</label>
                        <input
                            type="text"
                            value={formData.language}
                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Compreensão</label>
                            <select
                                value={formData.understanding}
                                onChange={(e) => setFormData({ ...formData, understanding: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            >
                                {levels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Fala</label>
                            <select
                                value={formData.speaking}
                                onChange={(e) => setFormData({ ...formData, speaking: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            >
                                {levels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Escrita</label>
                            <select
                                value={formData.writing}
                                onChange={(e) => setFormData({ ...formData, writing: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-600 rounded-lg"
                            >
                                {levels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                            {editingLang ? 'Atualizar' : 'Criar'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {languages.map((lang: any) => (
                    <div key={lang._id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg">{lang.language}</h3>
                            <p className="text-sm text-gray-400 mt-1">
                                Compreensão: {lang.understanding} | Fala: {lang.speaking} | Escrita: {lang.writing}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(lang)}
                                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(lang._id)}
                                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

