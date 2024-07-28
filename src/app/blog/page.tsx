"use client";

import Post from "@/components/Post";
import data from "@/app/api/data.json";
import Photo from "@/app/icons/turned-gray-laptop-computer.jpg";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import { format } from "date-fns";

interface Post {
  _id: string;
  title?: string;
  content?: string;
  description?: string;
  imageUrl?: string | "@/app/icons/turned-gray-laptop-computer.jpg";
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
        console.log("Posts fetched:", res.data);
        setPosts(res.data);
      } catch (error) {
        console.error("Erro ao buscar posts: ", error);
        // Fallback to offline data if API call fails
        const offlinePostArray = (data as OfflineData).posts.flat();
        setPosts(offlinePostArray);
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return format(date, "dd/MM/yyyy: h:m:s");
    }
    return "Data inválida";
  };
  const last = posts.at(-1);

  return (
    <>
      <div className="flex text-justify mx-10 my-24 mobile:mx-6 self-start">
        <h1 className="text-5xl p-2 text-white">O meu blog</h1>
      </div>
      <div className="text-center tablet:mx-4 ">
        {last && (
          <div className="content items-center justify-between text-white my-16 laptop:mx-32 laptop:flex p-4 blur-cover">
            <div className="text-justify self-start max-h-fit ">
              <span className="text-gray-700 text-center p-2">
                {formatDate(last.date)}
              </span>
              <h2 className="font-semibold text-2xl p-2">{last.title}</h2>
              <p className="p-2">{last.content}</p>
            </div>
            <div className="flex justify-around laptop:max-w-2xl min-h-fit p-2">
              <div className="inline-flex">
                <a href={`blog/articles/${last._id}`}>
                  <Image
                    src={last.imageUrl}
                    alt="Post Image"
                    className="w-screen rounded-xl desktop:w-auto h-[20rem] laptop:h-80 laptop:w-96 object-cover"
                    width={1000000}
                    height={1000000}
                  />
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center my-10 laptop:mx-32 text-white">
          <div className="grid grid-cols-1 py-10 text-justify tablet:grid-cols-2 laptop:grid-cols-3 ">
            {posts.map((post) => (
              <div key={post._id} className="m-0 mobile:m-6 p-4 blur-cover">
                <a href={`blog/articles/${post._id}`}>
                  <Post
                    _id={post._id}
                    src={post.imageUrl}
                    alt={post.title || "Post Image"}
                    title={post.title}
                    content={post.content}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
