"use client";

import Post from "@/components/Blog/Post";
import data from "@/app/api/data.json";
import Photo from "@/app/icons/turned-gray-laptop-computer.jpg";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import { LeftArrow, RightArrow } from "../icons/IconsSvg";

interface Post {
  _id: string;
  title?: string;
  content?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  date?: Date | string;
  readers?: string;
  className?: string;
  imgclassName?: string;
  src: StaticImageData | string;
  alt: string;
}

interface OfflineData {
  posts: Post[][];
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("Fetching posts...");
        const res = await axios.get<Post[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/blog`
        );
        const sortedPosts = res.data.sort((a: Post, b: Post) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        console.log("Posts fetched:", res.data);
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Erro ao buscar posts: ", error);
        // Fallback to offline data if API call fails
        const offlinePostArray = (data as OfflineData).posts.flat();
        setPosts(offlinePostArray);
      }
    };
    fetchPosts();
  }, []);

  const last = posts.at(-1);

  return (
    <>
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h1 className="text-2xl text-right">Filtro de buscas brevemente...</h1>

        <h1 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
          Ultimas publicações
        </h1>

        {last && (
          <div className="p-4">
            <div className="flex items-stretch justify-between gap-4 rounded-xl second-element p-4">
              <div className="flex flex-[2_2_0px] flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className=" text-base font-bold leading-tight">
                    {last.title}
                  </p>
                  <p className="text-[#999999] text-sm font-normal leading-normal">
                    {last.description}
                  </p>
                </div>
                <a
                  href={`blog/articles/${last._id}`}
                  className="flex min-w-[84px] max-w-[480px]  cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse text-sm font-medium leading-normal w-fit"
                >
                  <span className="truncate ">Read More</span>
                </a>
              </div>
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1">
                <Image
                  src={last.imageUrl}
                  alt="Post Image"
                  className="w-screen rounded-xl desktop:w-auto h-[10rem] laptop:w-96 object-cover"
                  width={1000000}
                  height={1000000}
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 tablet:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4">
          {posts.map((post) => (
            <div key={post._id}>
              <a href={`blog/articles/${post._id}`}>
                <Post
                  _id={post._id}
                  src={post.imageUrl}
                  alt={post.title || "Post Image"}
                  title={post.title}
                  content={post.content}
                  date={post.date}
                />
              </a>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center p-4">
          <a href="#" className="flex size-10 items-center justify-center">
            <div
              className=""
              data-icon="CaretLeft"
              data-size="18px"
              data-weight="regular"
            >
              <LeftArrow />
            </div>
          </a>
          <a
            className="text-sm second-element font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center  rounded-full"
            href="#"
          >
            1
          </a>

          <a href="#" className="flex size-10 items-center justify-center">
            <div
              className=""
              data-icon="CaretRight"
              data-size="18px"
              data-weight="regular"
            >
              <RightArrow />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
