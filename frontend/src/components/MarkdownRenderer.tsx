"use client";

import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Componente para renderizar Markdown com customizações
 * 
 * Para adicionar/editar elementos, adicione uma nova propriedade no objeto `components`:
 * 
 * Exemplo para adicionar customização de parágrafos:
 * p({ node, children, ...props }) {
 *   return <p className="my-4 leading-relaxed" {...props}>{children}</p>;
 * },
 * 
 * Elementos disponíveis: h1-h6, p, ul, ol, li, blockquote, hr, table, thead, tbody, tr, th, td, strong, em, del, etc.
 */
export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const { theme } = useTheme();
  
  if (!content) {
    return null;
  }

  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          // ============================================
          // TÍTULOS (H1-H6)
          // ============================================
          h1({ node, children, ...props }) {
            return <h1 className="text-2xl font-bold mt-6 mb-4" {...props}>{children}</h1>;
          },
          h2({ node, children, ...props }) {
            return <h2 className="text-xl font-bold mt-5 mb-3" {...props}>{children}</h2>;
          },
          h3({ node, children, ...props }) {
            return <h3 className="text-lg font-semibold mt-4 mb-2" {...props}>{children}</h3>;
          },
          h4({ node, children, ...props }) {
            return <h4 className="text-base font-semibold mt-3 mb-2" {...props}>{children}</h4>;
          },
          h5({ node, children, ...props }) {
            return <h5 className="text-sm font-semibold mt-2 mb-1" {...props}>{children}</h5>;
          },
          h6({ node, children, ...props }) {
            return <h6 className="text-sm font-medium mt-2 mb-1" {...props}>{children}</h6>;
          },
          // ============================================
          // PRE (Texto pré-formatado - usado para blocos de código)
          // ============================================
          pre({ node, children, ...props }) {
            return (
              <pre className="bg-muted rounded-lg p-0 overflow-x-auto my-0" {...props}>
                {children}
              </pre>
            );
          },

          // ============================================
          // CÓDIGO (Code blocks e inline)
          // ============================================
          code({ node, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const isInline = !match; // Se não tem match de linguagem, é inline
            
            return !isInline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={language}
                PreTag="div"
                className="rounded-lg"
                customStyle={{
                  borderRadius: "0.5rem",
                  padding: "1rem",
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={`${theme === "dark" ? "bg-neutral-200 text-black" : "bg-neutral-950 text-white"} px-1.5 py-0.5 rounded text-sm font-mono`} {...props}>
                {children}
              </code>
            );
          },

          // ============================================
          // LINKS
          // ============================================
          a({ node, href, children, ...props }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                {...props}
              >
                {children}
              </a>
            );
          },

          // ============================================
          // IMAGENS
          // ============================================
          img({ node, src, alt, ...props }) {
            if (!src) return null;
            
            // Se for URL externa, usar img normal
            if (src.startsWith('http://') || src.startsWith('https://')) {
              return (
                <img
                  src={src}
                  alt={alt || ''}
                  className="rounded-lg my-4 w-full"
                  {...props}
                />
              );
            }
            
            // Se for caminho relativo, usar Image do Next.js
            return (
              <div className="relative w-full my-4 rounded-lg overflow-hidden">
                <Image
                  src={src}
                  alt={alt || ''}
                  width={800}
                  height={400}
                  className="rounded-lg w-full h-auto object-contain"
                  unoptimized
                />
              </div>
            );
          },

          // ============================================
          // PARÁGRAFOS
          // ============================================
          p({ node, children, ...props }) {
            return <p className="my-0 leading-relaxed" {...props}>{children}</p>;
          },

          // ============================================
          // LISTAS
          // ============================================
          ul({ node, children, ...props }) {
            return <ul className="list-disc list-inside my-4 space-y-2" {...props}>{children}</ul>;
          },
          ol({ node, children, ...props }) {
            return <ol className="list-decimal list-inside my-4 space-y-2" {...props}>{children}</ol>;
          },
          li({ node, children, ...props }) {
            return <li className="ml-4" {...props}>{children}</li>;
          },

          // ============================================
          // BLOCKQUOTE
          // ============================================
          blockquote({ node, children, ...props }) {
            return (
              <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground" {...props}>
                {children}
              </blockquote>
            );
          },

          // ============================================
          // HORIZONTAL RULE
          // ============================================
          hr({ node, ...props }) {
            return <hr className="my-8 border-border" {...props} />;
          },

          // ============================================
          // TABELAS
          // ============================================
          table({ node, children, ...props }) {
            return <table className="w-full my-4 border-collapse" {...props}>{children}</table>;
          },
          thead({ node, children, ...props }) {
            return <thead className="bg-muted" {...props}>{children}</thead>;
          },
          tbody({ node, children, ...props }) {
            return <tbody {...props}>{children}</tbody>;
          },
          tr({ node, children, ...props }) {
            return <tr className="border-b border-border" {...props}>{children}</tr>;
          },
          th({ node, children, ...props }) {
            return <th className="px-4 py-2 text-left font-semibold" {...props}>{children}</th>;
          },
          td({ node, children, ...props }) {
            return <td className="px-4 py-2" {...props}>{children}</td>;
          },

          // ============================================
          // FORMATAÇÃO DE TEXTO
          // ============================================
          strong({ node, children, ...props }) {
            return <strong className="font-bold" {...props}>{children}</strong>;
          },
          em({ node, children, ...props }) {
            return <em className="italic" {...props}>{children}</em>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

