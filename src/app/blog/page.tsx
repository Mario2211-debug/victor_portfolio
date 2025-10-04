/**
 * Página principal do blog
 * 
 * Esta página exibe a lista de posts do blog com design moderno
 * e funcionalidade de fallback para dados offline.
 */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { useTheme } from "next-themes";

// Importações de componentes e dados
import data from "@/app/api/data.json";
import { LeftArrow, RightArrow } from "../icons/IconsSvg";

// Importações de tipos e constantes
import { BlogPost, OfflineData } from "@/types";
import { 
  ANIMATION_DURATION, 
  ANIMATION_EASING,
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  CONTAINER_PADDING,
  API_BASE_URL,
  API_ENDPOINTS,
  REQUEST_TIMEOUT
} from "@/constants";

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Componente principal da página do blog
 */
export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  /**
   * Busca posts do blog com fallback offline
   */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("🌐 Buscando posts da API...");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        let res;
        try {
          res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.BLOG}`, {
            signal: controller.signal
          });
        } finally {
          clearTimeout(timeoutId);
        }

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const apiPosts = await res.json();
        const sortedPosts = apiPosts.sort((a: BlogPost, b: BlogPost) => {
          return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
        });
        
        console.log("✅ Posts da API carregados:", sortedPosts.length);
        setPosts(sortedPosts);
        
      } catch (apiError) {
        console.warn("⚠️ Erro na API, usando dados offline:", apiError);
        
        try {
          const offlineData = data as OfflineData;
          const offlinePostArray = offlineData.posts.flat();
          
          if (offlinePostArray.length > 0) {
            setPosts(offlinePostArray);
            setError("API indisponível - usando dados offline");
            console.log("✅ Dados offline carregados:", offlinePostArray.length);
          } else {
            throw new Error("Nenhum post encontrado nos dados offline");
          }
        } catch (offlineError) {
          console.error("❌ Falha total:", offlineError);
          setError("Erro ao carregar posts do blog");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  /**
   * Formata data para exibição
   */
  const formatDate = (dateString: string | Date | undefined): string => {
    if (!dateString) return "Data não disponível";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return "Data inválida";
    }
  };

  /**
   * Calcula tempo de leitura estimado
   */
  const getReadingTime = (content: string | undefined): string => {
    if (!content) return "2 min";
    
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    
    return `${minutes} min`;
  };

  // Estado de carregamento
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  // Estado de erro
  if (error && posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className={`${FONT_SIZES.LARGE} ${COLORS.SECONDARY.LIGHT}`}>
            {error}
          </p>
          <p className={`${FONT_SIZES.SMALL} ${COLORS.SECONDARY.LIGHT} mt-2`}>
            Verifique sua conexão e tente novamente
          </p>
        </div>
      </div>
    );
  }

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <>
      <div className="layout-content-container pt-32 justify-self-center flex flex-col max-w-[960px] flex-1">
        {/* Header do Blog */}
        <motion.header 
          className="py-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.SLOW }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: ANIMATION_DURATION.SLOW, delay: 0.2 }}
            >
              Blog
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: ANIMATION_DURATION.SLOW, delay: 0.4 }}
            >
              Bem-vindo ao meu blog pessoal. Aqui você encontrará tutoriais, insights sobre 
              desafios técnicos, práticas de desenvolvimento e novidades nas tecnologias que trabalho. 
              Seja você um colega desenvolvedor em busca de dicas ou alguém curioso sobre tecnologia, 
              espero que este espaço ofereça valor e inspiração.
            </motion.p>

            {/* Indicador discreto quando usando dados offline */}
            {error && posts.length > 0 && (
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-xs text-gray-500 bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-full">
                  📡 Usando dados offline
                </span>
              </motion.div>
            )}
          </div>
        </motion.header>

        {/* Post em Destaque */}
        {featuredPost && (
          <motion.section 
            className="px-4 py-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION.SLOW, delay: 0.6 }}
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">
                Post em Destaque
              </h2>
              
              <motion.div 
                className="flex flex-col md:flex-row items-stretch justify-between gap-6 rounded-xl second-element p-6 blur-cover"
                whileHover={{ 
                  opacity: 0.9,
                  scale: 1.02,
                  transition: { duration: ANIMATION_DURATION.FAST }
                }}
              >
                <div className="flex flex-col gap-4 flex-1">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{formatDate(featuredPost.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4" />
                        <span>{getReadingTime(featuredPost.content)}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold leading-tight mb-3">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-400 text-base leading-relaxed">
                      {featuredPost.description}
                    </p>
                  </div>
                  
                  <Link
                    href={`/blog/${featuredPost._id}`}
                    className="flex min-w-[120px] max-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 flex-row-reverse text-sm font-medium leading-normal w-fit home-element"
                  >
                    <span className="truncate">Ler mais</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Link>
                </div>
                
                <div className="w-full md:w-80 bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <div className="w-16 h-16 mx-auto mb-3 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        📝
                      </div>
                      <p className="text-sm">Imagem do post</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Grid de Posts */}
        <motion.section 
          className="px-4 pb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.SLOW, delay: 0.8 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Todas as Publicações
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  className="blur-cover rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: ANIMATION_DURATION.NORMAL, delay: index * 0.1 }}
                  whileHover={{ 
                    opacity: 0.9,
                    scale: 1.02,
                    transition: { duration: ANIMATION_DURATION.FAST }
                  }}
                >
                  <Link href={`/blog/${post._id}`}>
                    <div className="flex flex-col h-full">
                      <div className="w-full bg-center bg-no-repeat bg-cover rounded-t-xl aspect-video object-cover relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-t-xl flex items-center justify-center">
                          <div className="text-center text-gray-500 dark:text-gray-400">
                            <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                              📄
                            </div>
                            <p className="text-xs">Imagem</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4" />
                            <span>{getReadingTime(post.content)}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold leading-tight mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1">
                          {post.description}
                        </p>
                        
                        <div className="mt-4 pt-3 border-t border-gray-600">
                          <span className="text-xs text-gray-500">
                            {getReadingTime(post.content)} - Leia mais
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Paginação */}
        <motion.div 
          className="flex items-center justify-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: ANIMATION_DURATION.SLOW, delay: 1.0 }}
        >
          <div className="flex items-center gap-3">
            <button className="flex size-12 items-center justify-center home-element rounded-full">
              <LeftArrow />
            </button>
            
            <button className="text-sm second-element font-bold leading-normal tracking-[0.015em] flex size-12 items-center justify-center rounded-full">
              1
            </button>
            
            <button className="flex size-12 items-center justify-center home-element rounded-full">
              <RightArrow />
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
