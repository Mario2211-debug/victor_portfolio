"use client";
import React, { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import axios from "axios";
import type { StaticImageData } from "next/image";
import offlineData from "@/app/api/data.json";
//import {offlineData} from "@/app/api/apiPosts";
import { format } from "date-fns";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from "next-themes";

interface Post {
  _id?: string;
  title?: string;
  content?: string;
  description?: string;
  imageUrl?: string;
  category?: {
    _id: string;
    name: string;
    description: string;
  };
  date?: Date;
  readers?: string;
  className?: string;
  imgclassName?: string;
  src?: StaticImageData | string;
  alt?: string;
}

interface OfflineData {
  posts: Post[][];
}

const PostPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params?.id;

  const formatDate = (dateString: string | undefined) => {
    const date = new Date(dateString || "");
    return !isNaN(date.getTime()) ? format(date, "dd-MM-yyyy: hh:mm") : "Formato da data inválido";
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const response = await axios.get<Post>(`${process.env.NEXT_PUBLIC_API_URL}/blog/post/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (apiError) {
        console.error("Erro ao buscar post da API: ", apiError);

        const offlinePostArray = (offlineData as unknown as OfflineData).posts.flat();
        const offlinePost = offlinePostArray.find((item) => item._id === id);

        if (offlinePost) {
          setPost(offlinePost);
        } else {
          setError("Erro ao buscar post offline");
        }
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;


  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="desktop:px-72 md:px-20 px-12 py-44">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="@container">
          <div className="@[480px]:px-4 @[480px]:py-3">
            <a href="/" className="py-6 absolute top-20">Voltar</a>
            <h1 className="py-2 text-2xl font-extrabold tablet:text-5xl">
              {post?.title}
            </h1>
            <div className="bg-cover bg-center flex flex-col justify-end overflow-hidden">
              <div className="flex">
                <p className="text-xl tracking-light tablet:text-[28px] font-light leading-tight">
                  {post?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs font-thin leading-normal pb-3 px-4">
          {formatDate(post?.date?.toString())}
        </p>
      </div>
      <div className="text-base font-normal tracking-wide leading-normal pb-3 pt-1 tablet:px-4">
        <ReactMarkdown
          components={{
            p({ node, ...props }) {
              return <p className={`min-w-full p-2 leading-6 text-justify tracking-wide`} {...props} />;
            },
            ul({ node, ...props }) {
              return <ul className="list-inside list-decimal min-w-full text-justify leading-6 tracking-wide" {...props} />;
            },
            li({ node, ...props }) {
              return <li className="text-sm p-1 leading-6 text-justify tracking-wide" {...props} />;
            },
            h3({ node, ...props }) {
              return <h3 className="p-2 font-bold" {...props} />;
            },
            table({ node, ...props }) {
              return <table className="min-w-full border-collapse border border-gray-300" {...props} />;
            },
            th({ node, ...props }) {
              return <th className="border border-gray-300 p-2" {...props} />;
            },
            td({ node, ...props }) {
              return <td className="border border-gray-300 p-2" {...props} />;
            },

            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={`${className}  border rounded-lg p-[0.15rem]  ${theme === "light" ? "border-neutral-300 bg-neutral-400" : " border-neutral-700 bg-neutral-700"}`} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {post?.content || ""}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PostPage;
