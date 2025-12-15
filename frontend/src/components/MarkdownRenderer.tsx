"use client";

import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const { theme } = useTheme();

  if (!content) return null;

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // =========================
          // HEADINGS
          // =========================
          h1: ({ children, ...props }) => (
            <h1 className="text-2xl font-bold mt-6 mb-4" {...props}>{children}</h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-xl font-bold mt-5 mb-3" {...props}>{children}</h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-lg font-semibold mt-4 mb-2" {...props}>{children}</h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="text-base font-semibold mt-3 mb-2" {...props}>{children}</h4>
          ),
          h5: ({ children, ...props }) => (
            <h5 className="text-sm font-semibold mt-2 mb-1" {...props}>{children}</h5>
          ),
          h6: ({ children, ...props }) => (
            <h6 className="text-sm font-medium mt-2 mb-1" {...props}>{children}</h6>
          ),

          // =========================
          // CODE (inline + block)
          // =========================
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");

            if (!inline && match) {
              return (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg my-4 w-fit"
                  customStyle={{ padding: "0.5rem", margin: "0.5rem", fontSize: "0.875rem", }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            }

            return (
              <code
                className={`px-1.5 py-1 rounded text-sm font-mono ${
                  theme === "dark"
                    ? "bg-neutral-200 text-neutral-900"
                    : "bg-neutral-800 text-neutral-100"
                }`}
                {...props}
              >
                {children}
              </code>
            );
          },

          // =========================
          // PARAGRAPHS
          // =========================
          p: ({ children, ...props }) => (
            <p className="my-3 leading-relaxed text-md font-light" {...props}>{children}</p>
          ),

          // =========================
          // LINKS
          // =========================
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
              {...props}
            >
              {children}
            </a>
          ),

          // =========================
          // IMAGES
          // =========================
          img({ src, alt }) {
            if (!src) return null;

            if (src.startsWith("http://") || src.startsWith("https://")) {
              return (
                <img
                  src={src}
                  alt={alt || ""}
                  className="rounded-lg my-4 w-full"
                />
              );
            }

            return (
              <div className="relative w-full my-4 overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt={alt || ""}
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            );
          },

          // =========================
          // LISTS
          // =========================
          ul: ({ children, ...props }) => (
            <ul className="list-disc pl-6 my-4 space-y-2" {...props}>{children}</ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-6 my-4 space-y-2" {...props}>{children}</ol>
          ),
          li: ({ children, ...props }) => (
            <li {...props}>{children}</li>
          ),

          // =========================
          // BLOCKQUOTE
          // =========================
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground"
              {...props}
            >
              {children}
            </blockquote>
          ),

          // =========================
          // HR
          // =========================
          hr: (props) => (
            <hr className="my-8 border-border" {...props} />
          ),

          // =========================
          // TABLES
          // =========================
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse" {...props}>{children}</table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-muted" {...props}>{children}</thead>
          ),
          tr: ({ children, ...props }) => (
            <tr className="border-b border-border" {...props}>{children}</tr>
          ),
          th: ({ children, ...props }) => (
            <th className="px-4 py-2 text-left font-semibold" {...props}>{children}</th>
          ),
          td: ({ children, ...props }) => (
            <td className="px-4 py-2" {...props}>{children}</td>
          ),

          // =========================
          // TEXT FORMATTING
          // =========================
          strong: ({ children, ...props }) => (
            <strong className="font-bold" {...props}>{children}</strong>
          ),
          em: ({ children, ...props }) => (
            <em className="italic" {...props}>{children}</em>
          ),
          del: ({ children, ...props }) => (
            <del className="line-through" {...props}>{children}</del>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
