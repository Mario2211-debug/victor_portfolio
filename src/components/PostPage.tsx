"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Photo from "@/app/icons/turned-gray-laptop-computer.jpg";
import type { StaticImageData } from "next/image";
import offlineData from "@/app/api/data.json";
import { format } from "date-fns";

interface Post {
  _id?: string;
  title?: string;
  content?: string;
  description?: string;
  imageUrl?: string;
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return format(date, "dd/MM/yyyy : h:m:s");
    }
    return "Data inválida";
  };

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
    <div className="grid laptop:flex justify-center laptop:items-start gap-5">
      <div className="w-full laptop:w-1/4 p-4 order-1 text-center">
        <div className="grid laptop:inline-grid laptop:justify-between justify-center items-center text-white desktop:pt-48 mobile:pt-8">
          <div className="flex justify-center">
            <Image
              src={Photo}
              alt="imagem"
              className="w-36 h-36 border border-slate-700 p-2 rounded-full"
            />
          </div>
          <p className="text-3xl pt-4">Mário Afonso</p>
          <span className="inline-flex gap-6 justify-center laptop:self-start">
            <p className="text-zinc-500">Software Engineer</p>
            <p className="text-zinc-500">Portugal</p>
          </span>
          <span className="text-white -tracking-tighter leading-5 text-justify text-xs">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </span>
        </div>
      </div>
      <div className="w-full laptop:w-2/3 p-4 order-2">
        <div className="desktop:pt-32 mobile:pt-8 [text-align:-webkit-center] laptop:text-left mx-2">
          <div className="w-fit p-2 inline-grid laptop:text-left text-center">
            <h1 className="text-white font-bold text-3xl mobile:text-5xl">
              {post?.title}
            </h1>
            <span className="text-zinc-400 text-2xl my-4">{post?.content}</span>

            <span className="text-zinc-400">{formatDate(post.date)}</span>
          </div>
          <div className="max-w-full p-4">
            <div className="items-center justify-center">
              <Image
                src={post.imageUrl}
                alt={post?.title || "post image"}
                className="desktop:max-w-screen-md w-full rounded-xl desktop:h-80 laptop:h-52 object-cover"
                width={1000000}
                height={1000000}
              />
            </div>
            <div className="inline-grid gap-2 text-justify w-[-webkit-fill-available]">
              <div className="flex">
                <div className="inline-flex float-left gap-2 tablet:gap-4 p-2 text-sm tablet:text-base">
                  <span className="text-zinc-400 font-semibold">2.5m</span>
                  <span className="text-zinc-400 font-semibold">2.5m</span>
                </div>
                <div className="inline-flex ml-auto p-2 float-right items-end">
                  <span className="font-medium bg-rose-50 text-red-600 rounded-full shadow-sm shadow-rose-200">
                    <p className="text-right p-2 text-xs font-thin tablet:font-normal ">
                      Desenvolvimento
                    </p>
                  </span>
                </div>
              </div>
              <span className="text-zinc-400">{post?.content}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
