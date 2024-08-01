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

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    if (!isNaN(date.getDate())) return format(date, "dd/MM/yyyy: hh:mm:ss");
    else return "Formato da data invalido";
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const response = await axios.get<Post>(
            ` ${process.env.NEXT_PUBLIC_API_URL}/blog/post/${id}`
          );
          setPost(response.data);
          console.log(response.data.category.name);
          console.log(response.data);

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

    /////////////
    //         //
    /////////////

    fetchPost();
  }, [id]);

  if (loading) return <div>carregando</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-4 mobile:px-6 md:px-8 lg:px-10 xl:px-12 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="@container">
          <div className="@[480px]:px-4 @[480px]:py-3">
            <h1 className="p-4 text-4xl font-extrabold tablet:text-5xl">
              {post.title}
            </h1>
            <div
              className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-[#1A1A1A] min-w-fit: rounded-xl min-h-80"
              style={{
                backgroundImage: `linear-gradient(359deg, rgb(0 0 0 / 137%) 0%, rgba(0, 0, 0, 0) 68%), url('${post.imageUrl}')`,
              }}
            >
              <div className="flex p-8">
                <p className="text-white tracking-light text-[28px] font-bold leading-tight">
                  {post.description}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm font-normal leading-normal pb-3 pt-1 px-4">
          {formatDate(post.date)}
        </p>
        <div className="flex gap-3 p-3 flex-wrap pr-4">
          <div className="flex h-8 second-element shrink-0 items-center justify-center gap-x-2 rounded-full pl-2 pr-4">
            <div
              className=""
              data-icon="Calendar"
              data-size="20px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path>
              </svg>
            </div>
            <p className="text-sm font-medium leading-normal">2.5m</p>
          </div>
          <div className="flex h-8 second-element shrink-0 items-center justify-center gap-x-2 rounded-full pl-2 pr-4">
            <div
              className=""
              data-icon="FileCode"
              data-size="20px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M181.66,146.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L164.69,152l-18.35-18.34a8,8,0,0,1,11.32-11.32Zm-72-24a8,8,0,0,0-11.32,0l-24,24a8,8,0,0,0,0,11.32l24,24a8,8,0,0,0,11.32-11.32L91.31,152l18.35-18.34A8,8,0,0,0,109.66,122.34ZM216,88V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88Zm-56-8h28.69L160,51.31Zm40,136V96H152a8,8,0,0,1-8-8V40H56V216H200Z"></path>
              </svg>
            </div>
            <p className="text-sm font-medium leading-normal">
              {!post?.category?.[0]?.name
                ? "Sem categoria"
                : post.category[0].name}
            </p>
          </div>
        </div>
        <p className="text-base font-normal tracking-wide leading-normal pb-3 pt-1 px-4">
          {post.content}
        </p>
        <div className="flex flex-wrap gap-4 px-4 py-2">
          <div className="flex items-center justify-center gap-2 px-3 py-2">
            <div
              className=""
              data-icon="ThumbsUp"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 px-3 py-2">
            <div
              className=""
              data-icon="ChatTeardropText"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M168,112a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,112Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm72-12A100.11,100.11,0,0,1,132,224H47.67A15.69,15.69,0,0,1,32,208.33V124a100,100,0,0,1,200,0Zm-16,0a84,84,0,0,0-168,0v84h84A84.09,84.09,0,0,0,216,124Z"></path>
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 px-3 py-2">
            <div
              className=""
              data-icon="Share"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H165a88,88,0,0,0-85.23,66,8,8,0,0,1-15.5-4A103.94,103.94,0,0,1,165,96h39.71L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66ZM192,208H40V88a8,8,0,0,0-16,0V208a16,16,0,0,0,16,16H192a8,8,0,0,0,0-16Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row items-start justify-start gap-3 p-4">
          <div className="flex h-full flex-1 flex-col items-start justify-start">
            <div className="flex w-full flex-row items-start justify-start gap-x-3">
              <p className="second-element first-letter:first-line:text-sm font-bold leading-normal tracking-[0.015em]"></p>
            </div>
            <p className="text-sm font-normal leading-normal"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
