/**
 * Página de artigo individual do blog
 * 
 * Este componente exibe um artigo completo com design moderno
 * e funcionalidade de fallback para dados offline.
 */

"use client";
import React, { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon, ArrowLeftIcon, ShareIcon } from "@heroicons/react/outline";
import { format } from "date-fns";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from "next-themes";

// Importações de dados e tipos
import offlineData from "@/app/api/data.json";
import { BlogPost, OfflineData } from "@/types";
import { 
  ANIMATION_DURATION, 
  ANIMATION_EASING,
  COLORS,
  FONT_SIZES,
  FONT_WEIGHTS,
  API_BASE_URL,
  API_ENDPOINTS,
  REQUEST_TIMEOUT
} from "@/constants";

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Componente principal da página de artigo
 */
const PostPage: React.FC = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const params = useParams();
  const id = params?.id;
  const { theme } = useTheme();

  /**
   * Formata data para exibição
   */
  const formatDate = (dateString: string | Date | undefined): string => {
    if (!dateString) return "Data não disponível";
    
    try {
      const date = new Date(dateString);
      return format(date, "dd 'de' MMMM 'de' yyyy");
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
    
    return `${minutes} min de leitura`;
  };

  /**
   * Busca o post específico com fallback offline
   */
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        
        console.log("🌐 Buscando post da API...");

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.BLOG}/post/${id}`, {
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const apiPost = await res.json();
        setPost(apiPost);
        console.log("✅ Post da API carregado");
        
      } catch (apiError) {
        console.warn("⚠️ Erro na API, usando dados offline:", apiError);
        
        try {
          const offlineDataTyped = offlineData as OfflineData;
          const offlinePostArray = offlineDataTyped.posts.flat();
          const offlinePost = offlinePostArray.find((item) => item._id === id);

          if (offlinePost) {
            setPost(offlinePost);
            setError("API indisponível - usando dados offline");
            console.log("✅ Post offline carregado");
          } else {
            throw new Error("Post não encontrado nos dados offline");
          }
        } catch (offlineError) {
          console.error("❌ Falha total:", offlineError);
          setError("Erro ao carregar post");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Estado de carregamento
  if (loading) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400"></div>
        </div>
      </div>
    );
  }

  // Estado de erro
  if (error && !post) {
    return (
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <p className="text-lg text-gray-400 mb-4">
              {error}
            </p>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Voltar ao blog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="layout-content-container pt-32 justify-self-center flex flex-col max-w-[960px] flex-1">
      {/* Header do Artigo */}
      <motion.header 
        className="py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATION.SLOW }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Botão de voltar */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.2 }}
          >
          {/* Título do artigo */}
          <motion.h1 
            className="text-4xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION.SLOW, delay: 0.4 }}
          >
            {post.title}
          </motion.h1>
          {/* Descrição do artigo */}
          <motion.p 
            className="text-lg text-gray-400 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION.SLOW, delay: 0.5 }}
          >
            {post.description}
          </motion.p>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Voltar ao blog</span>
            </Link>
          </motion.div>

          {/* Indicador discreto quando usando dados offline */}
          {error && post && (
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-xs text-gray-500 bg-yellow-100 dark:bg-yellow-900 px-3 py-1 rounded-full">
                📡 Usando dados offline
              </span>
            </motion.div>
          )}

          {/* Metadados do artigo */}
          <motion.div 
            className="flex items-center gap-4 mb-4 text-sm text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION.NORMAL, delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              <span>{getReadingTime(post.content)}</span>
            </div>
            <button className="flex items-center gap-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <ShareIcon className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </motion.div>


        </div>
      </motion.header>

      {/* Conteúdo do artigo */}
      <motion.article 
        className="px-4 pb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATION.SLOW, delay: 0.6 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                p({ node, ...props }) {
                  return <p className="text-base leading-relaxed mb-6 text-gray-300" {...props} />;
                },
                h1({ node, ...props }) {
                  return <h1 className="text-3xl font-bold mb-6 mt-8 text-white" {...props} />;
                },
                h2({ node, ...props }) {
                  return <h2 className="text-2xl font-semibold mb-4 mt-8 text-white" {...props} />;
                },
                h3({ node, ...props }) {
                  return <h3 className="text-xl font-semibold mb-3 mt-6 text-white" {...props} />;
                },
                ul({ node, ...props }) {
                  return <ul className="list-disc list-inside mb-6 space-y-2 text-gray-300" {...props} />;
                },
                ol({ node, ...props }) {
                  return <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-300" {...props} />;
                },
                li({ node, ...props }) {
                  return <li className="text-base leading-relaxed" {...props} />;
                },
                blockquote({ node, ...props }) {
                  return <blockquote className="border-l-4 border-blue-500 pl-6 py-2 mb-6 bg-blue-900/20 italic text-gray-300" {...props} />;
                },
                table({ node, ...props }) {
                  return <table className="min-w-full border-collapse border border-gray-600 mb-6" {...props} />;
                },
                th({ node, ...props }) {
                  return <th className="border border-gray-600 p-3 bg-gray-700 font-semibold text-left text-white" {...props} />;
                },
                td({ node, ...props }) {
                  return <td className="border border-gray-600 p-3 text-gray-300" {...props} />;
                },
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <div className="mb-6">
                      <SyntaxHighlighter 
                        style={oneDark} 
                        language={match[1]} 
                        PreTag="div" 
                        className="rounded-lg"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className={`${className} bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm font-mono text-gray-300`} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {post.content || ""}
            </ReactMarkdown>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default PostPage;
