/**
 * Componentes de seção principais do portfólio
 * 
 * Este arquivo contém os componentes About, Projects e Contacts
 * que são renderizados na página principal do portfólio.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ArrowSmRightIcon, BookOpenIcon } from "@heroicons/react/outline";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import axios from "axios";

// Importações de tipos e constantes centralizadas
import { BlogPost, OfflineData, Project, AnimationVariants, HoverVariants } from "@/types";
import { 
  ANIMATION_DURATION, 
  ANIMATION_EASING, 
  ANIMATION_DELAY,
  CONTAINER_PADDING,
  COMPONENT_WIDTHS,
  SECTION_CONFIG,
  CARD_CONFIG,
  FONT_SIZES,
  FONT_WEIGHTS,
  ICON_SIZES,
  COLORS,
  THEME_GRADIENTS,
  API_BASE_URL,
  API_ENDPOINTS,
  REQUEST_TIMEOUT
} from "@/constants";

// Importações de dados locais
import data from "@/app/api/data.json";
import projectData from '@/app/api/projects.json';

// ============================================================================
// CONFIGURAÇÕES DE ANIMAÇÃO
// ============================================================================

/**
 * Variantes de animação para seções principais
 */
const sectionVariants: AnimationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: ANIMATION_DURATION.SLOW,
            staggerChildren: ANIMATION_DELAY.MEDIUM
        }
    }
};

/**
 * Variantes de animação para itens individuais
 */
const itemVariants: AnimationVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: ANIMATION_DURATION.NORMAL }
    }
};

/**
 * Variantes de hover para cards
 */
const cardHoverVariants: HoverVariants = {
    hover: {
        scale: 1.02,
        opacity: 0.95,
        filter: "brightness(1.1)",
        transition: {
            duration: ANIMATION_DURATION.FAST,
            ease: ANIMATION_EASING.EASE_IN_OUT
        }
    }
};

// ============================================================================
// COMPONENTE ABOUT
// ============================================================================

/**
 * Componente About - Exibe informações sobre o desenvolvedor
 * 
 * Este componente apresenta uma breve descrição profissional,
 * habilidades e links para mais informações.
 */
export const About = () => {
    const { theme } = useTheme();

    return (
        <section className="flex flex-col items-center">
            <div className={`grid gap-4 justify-center ${COMPONENT_WIDTHS.SMALL} mobile:${COMPONENT_WIDTHS.MEDIUM} ${SECTION_CONFIG.MAX_HEIGHT} ${SECTION_CONFIG.OVERFLOW} ${SECTION_CONFIG.TRANSITION} ${SECTION_CONFIG.SCROLLBAR}`}>
                <motion.div
                    className={`${CARD_CONFIG.PADDING} place-self-center justify-between ${CARD_CONFIG.BLUR_COVER}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: ANIMATION_DURATION.SLOW }}
                    whileHover={{
                        opacity: CARD_CONFIG.HOVER_OPACITY,
                        filter: `${theme === 'light' ? 'brightness(-2.75)' : 'brightness(2.75)'}`,
                        x: 1,
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)"
                    }}
                >
                    {/* Conteúdo principal sobre o desenvolvedor */}
                    <div className="w-fit text-justify tracking-wide whitespace-normal track">
                        <div className="gap-2">
                            <p className={`${FONT_SIZES.SMALL} tracking-wide leading-6 end pb-2 [text-align-last:end]`}>
                                Desenvolvedor Full Stack com experiência em projetos web baseados em React e NodeJS, 
                                automação de processos e integração de sistemas. Familiarizado com ferramentas e 
                                tecnologias como Next.js, Node.js, MongoDB e MySQL, Tailwind CSS e React.
                            </p>
                        </div>
                        
                        {/* Footer com informações adicionais */}
                        <div className="flex justify-between items-center">
                            <div>
                                <span className={`py-1 flex px-2 home-element items-center h-0 ${FONT_SIZES.EXTRA_SMALL}`}>
                                    <a href="/about" aria-label="Mais informações sobre o desenvolvedor">
                                        <InformationCircleIcon 
                                            className={`${ICON_SIZES.MEDIUM} animate-pulse rounded-full ${theme === "light" ? COLORS.PRIMARY.LIGHT : 'text-white'}`} 
                                        />
                                    </a>
                                </span>
                            </div>
                            
                            {/* Tags de habilidades */}
                            <div className="flex flex-wrap gap-2 float-right">
                                <span className={`py-1 px-2 home-element ${FONT_SIZES.EXTRA_SMALL} ${COLORS.SECONDARY.LIGHT}`}>
                                    Developer
                                </span>
                                <span className={`py-1 px-2 home-element ${FONT_SIZES.EXTRA_SMALL} ${COLORS.SECONDARY.LIGHT}`}>
                                    Database
                                </span>
                                <span className={`py-1 px-2 home-element ${FONT_SIZES.EXTRA_SMALL} ${COLORS.SECONDARY.LIGHT}`}>
                                    UI/UX
                                </span>
                                <span className={`py-1 px-2 home-element ${FONT_SIZES.EXTRA_SMALL} ${COLORS.SECONDARY.LIGHT}`}>
                                    APIs
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// ============================================================================
// COMPONENTE PROJECTS
// ============================================================================

/**
 * Componente Projects - Exibe lista de projetos do desenvolvedor
 * 
 * Este componente apresenta os projetos desenvolvidos com informações
 * sobre tecnologias utilizadas, período de desenvolvimento e links.
 */
export const Projects = () => {
    const { theme } = useTheme();

    // Determina o gradiente baseado no tema atual
    const gradientBorder = theme === "light" 
        ? THEME_GRADIENTS.LIGHT 
        : THEME_GRADIENTS.DARK;

    return (
        <div className="flex flex-col items-center">
            <div className={`grid gap-4 justify-center ${COMPONENT_WIDTHS.SMALL} md:${COMPONENT_WIDTHS.MEDIUM} desktop:h-[400px] h-[55vh] ${SECTION_CONFIG.OVERFLOW} ${SECTION_CONFIG.TRANSITION} ${SECTION_CONFIG.SCROLLBAR} pb-16 relative`}>
                {projectData.projects.map((project: Project, index: number) => (
                    <motion.div
                        key={index}
                        className={`${CARD_CONFIG.PADDING} place-self-center justify-between ${CARD_CONFIG.BLUR_COVER}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: ANIMATION_DURATION.SLOW, 
                            delay: index * ANIMATION_DELAY.MEDIUM 
                        }}
                        whileHover={{
                            opacity: CARD_CONFIG.HOVER_OPACITY,
                            rotate: CARD_CONFIG.HOVER_ROTATION,
                        }}
                    >
                        <div className="w-fit">
                            {/* Header do projeto com período e tipo */}
                            <div className="gap-2">
                                <span className="flex justify-between">
                                    <p className={`${COLORS.SECONDARY.LIGHT} ${FONT_SIZES.EXTRA_SMALL} tracking-wide`}>
                                        {project.timeframe}
                                    </p>
                                    {project.type && (
                                        <a href={project.link} aria-label={`Visitar ${project.type} do projeto ${project.name}`}>
                                            <p className={`${FONT_SIZES.EXTRA_SMALL} tracking-wide flex ${COLORS.SECONDARY.LIGHT}`}>
                                                {project.type}
                                                <motion.button
                                                    whileHover={{ rotate: 0 }}
                                                    initial={{ rotate: -45 }}
                                                    className=""
                                                >
                                                    <ArrowSmRightIcon className={`${ICON_SIZES.SMALL} transition-transform`} />
                                                </motion.button>
                                            </p>
                                        </a>
                                    )}
                                </span>
                                
                                {/* Nome do projeto */}
                                <h2 className={`pt-2 ${FONT_SIZES.LARGE} project-element ${FONT_WEIGHTS.SEMIBOLD}`}>
                                    {project.name}
                                </h2>
                            </div>
                            
                            {/* Informações da empresa e cargo */}
                            <p className={`${FONT_SIZES.EXTRA_SMALL} w-fit flex ${COLORS.SECONDARY.LIGHT}`}>
                                {project.role} at {project.company}
                            </p>
                            
                            {/* Descrição do projeto */}
                            <p className={`project-element ${FONT_SIZES.SMALL} text-justify ${FONT_WEIGHTS.THIN} tracking-wide py-4`}>
                                {project.description}
                            </p>
                            
                            {/* Tags de tecnologias */}
                            <div className="flex flex-wrap gap-2 float-right">
                                {project.technologies.map((tech: string, techIndex: number) => (
                                    <span 
                                        key={techIndex} 
                                        className={`p-1 home-element ${FONT_SIZES.EXTRA_SMALL}`}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            {/* Gradiente de desvanecimento para suavizar a rolagem */}
            <div className="absolute bottom-0 left-0 w-full h-16 backdrop-blur-sm"></div>
        </div>
    );
};

// ============================================================================
// COMPONENTE CONTACTS (BLOG)
// ============================================================================

/**
 * Componente Contacts - Exibe lista de posts do blog
 * 
 * Este componente apresenta os posts do blog com título e link
 * para leitura completa. Inclui fallback para dados offline.
 */
export const Contacts = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Busca posts do blog via API
     * Implementa fallback para dados offline em caso de erro
     */
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                console.log("Fetching posts...");
                const res = await axios.get<BlogPost[]>(
                    `${API_BASE_URL}${API_ENDPOINTS.BLOG}`,
                    { timeout: REQUEST_TIMEOUT }
                );
                
                // Ordena posts por data de publicação (mais recentes primeiro)
                const sortedPosts = res.data.sort((a: BlogPost, b: BlogPost) => {
                    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
                });
                
                console.log("Posts fetched:", res.data);
                setPosts(sortedPosts);
            } catch (error) {
                console.error("Erro ao buscar posts: ", error);
                setError("Erro ao carregar posts do blog");
                
                // Fallback para dados offline se a API falhar
                try {
                    console.log("Tentando carregar dados offline...");
                    const offlineData = data as OfflineData;
                    
                    if (offlineData && offlineData.posts && Array.isArray(offlineData.posts)) {
                        // A estrutura é posts: [[post1, post2], [post3, post4]]
                        const offlinePostArray = offlineData.posts.flat();
                        
                        if (offlinePostArray.length > 0) {
                            setPosts(offlinePostArray);
                            setError(null); // Limpa o erro se conseguiu carregar offline
                            console.log("Dados offline carregados com sucesso:", offlinePostArray.length, "posts");
                        } else {
                            throw new Error("Nenhum post encontrado nos dados offline");
                        }
                    } else {
                        throw new Error("Estrutura de dados offline inválida");
                    }
                } catch (offlineError) {
                    console.error("Erro ao carregar dados offline:", offlineError);
                    setError("Erro ao carregar dados offline");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Exibe estado de carregamento
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
            </div>
        );
    }

    // Exibe estado de erro apenas se não conseguiu carregar nem online nem offline
    if (error && posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-32 text-center">
                <p className={`${COLORS.SECONDARY.LIGHT} ${FONT_SIZES.SMALL}`}>
                    {error}
                </p>
                <p className={`${COLORS.SECONDARY.LIGHT} ${FONT_SIZES.EXTRA_SMALL} mt-2`}>
                    Verifique sua conexão e tente novamente
                </p>
            </div>
        );
    }

    return (
        <div className="">
            {/* Indicador discreto quando usando dados offline */}
            {error && posts.length > 0 && (
                <div className="mb-2 text-center">
                    <p className={`${FONT_SIZES.EXTRA_SMALL} ${COLORS.SECONDARY.LIGHT} opacity-75`}>
                        📡 Usando dados offline
                    </p>
                </div>
            )}
            
            <div className={`flex ${COMPONENT_WIDTHS.SMALL} md:${COMPONENT_WIDTHS.MEDIUM} flex-col gap-4`}>
                {posts.map((blog: BlogPost) => (
                    <motion.div
                        key={blog._id}
                        className="flex items-center justify-between border blur-cover p-2"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: ANIMATION_DURATION.SLOW, 
                            delay: ANIMATION_DELAY.MEDIUM 
                        }}
                        whileHover={{
                            opacity: CARD_CONFIG.HOVER_OPACITY,
                            filter: "brightness(2.75)",
                            rotate: -CARD_CONFIG.HOVER_ROTATION,
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)"
                        }}
                    >
                        {/* Link para o post do blog */}
                        <Link legacyBehavior href={`blog/${blog._id}`} passHref>
                            <a className={`${FONT_SIZES.MEDIUM} ${FONT_WEIGHTS.MEDIUM} flex items-center gap-3`}>
                                <BookOpenIcon className={`${ICON_SIZES.MEDIUM} ${COLORS.SECONDARY.LIGHT} group-hover:text-blue-400`} />
                                <span className="">{blog.title}</span>
                            </a>
                        </Link>
                        
                        {/* Ícone de seta indicando link */}
                        <ArrowSmRightIcon className={`${ICON_SIZES.MEDIUM} ${COLORS.SECONDARY.LIGHT} hover:text-blue-500 hover:-rotate-1`} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};