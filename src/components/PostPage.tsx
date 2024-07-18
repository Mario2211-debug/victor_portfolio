"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Photo from "@/app/icons/turned-gray-laptop-computer.jpg";
import type { StaticImageData } from "next/image";
import offlineData from "@/app/api/data.json";

interface Post {
  _id: string;
  title?: string;
  content?: string;
  date?: string;
  readers?: string;
  className?: string;
  imgclassName?: string;
  src: StaticImageData | string;
  alt: string;
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

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const response = await axios.get<Post>(
            `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`
          );
          setPost(response.data);
          setLoading(false);
        } catch (apiError) {
          console.error("Erro ao buscar post da API: ", apiError);
          // Fallback to offline data if API call fails
          const offlinePostArray = (
            offlineData as unknown as OfflineData
          ).posts.flat();
          const offlinePost = offlinePostArray.find((item) => item._id === id);
          if (offlinePost) {
            setPost(offlinePost);
          } else {
            setError("Erro ao buscar post offline");
          }
          setLoading(false);
        }
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div>carregando</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid laptop:flex">
      <div className="desktop:py-64 mobile:pt-20 px-2">
        <div className="inline-grid text-white text-justify py-4">
          <div className="items-center justify-center">
            <Image
              src={Photo}
              alt="imagem"
              className="w-36 h-36 min-h-fit border-2 p-2 rounded-full"
            />
          </div>
          <p className="text-3xl pt-4">Mário Afonso</p>
          <span className="inline-flex gap-6">
            <p className="text-zinc-500">Software Engineer</p>
            <p className="text-zinc-500">Portugal</p>
          </span>
        </div>
        <span className="text-white -tracking-tighter leading-5 text-justify text-xs">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </span>
      </div>
      <div className="desktop:py-48 mobile:py-8">
        <div className="desktop:mx-14 mobile:mx-0">
          <div className="max-w-full min-h-screen p-4">
            <div className="w-fit">
              <h1 className="p-2 text-2xl font-semibold text-white">
                Categoria
              </h1>
            </div>
            <div className="items-center justify-center">
              <Image
                src={Photo}
                alt={post?.title || "post image"}
                className="desktop:max-w-screen-md w-screen rounded-md h-80 object-cover"
              />
            </div>
            <div className="inline-grid gap-2 text-justify">
              <div className="inline-flex float-right gap-4 p-2">
                <span className="text-zinc-400 font-semibold">2.5m</span>
                <span className="text-zinc-400 font-semibold">2.5m</span>
              </div>
              <h1 className="text-xl text-white font-bold">{post?.title}</h1>
              <span className="text-zinc-400">{post?.content}</span>
              <span className="text-zinc-400">{post?.date}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="desktop:py-48 mobile:py-8 px-2">
        <div className="w-fit">
          <h1 className="py-4 text-xl font-semibold text-justify text-white">
            Categorias relacionadas
          </h1>
        </div>
        <div className="inline-grid h-fit text-white text-justify">
          <div className="py-4">
            <Image
              src={Photo}
              alt="imagem"
              className="rounded-3xl max-w-xl h-32 w-[-webkit-fill-available] object-cover"
            />
          </div>
          <span className="ml-auto font-light bg-rose-200 text-red-600 rounded-full">
            <p className="text-right p-2 text-xs">Desenvolvimento</p>
          </span>
          <span>
            <p>Lorem Ipsum is simply dummy text and typesetting industry.</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
