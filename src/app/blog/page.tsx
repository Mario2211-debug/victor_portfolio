"use client";

import Post from "@/components/Blog/Post";
import data from "@/app/api/data.json";
import Photo from "@/app/icons/turned-gray-laptop-computer.jpg";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import { DateValues, isDate } from "date-fns";

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

  const last = posts.at(-2);
  const lastT = posts.at(-1);

  return (
    <>
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        {lastT && (
          <div className="container">
            <div className="flex flex-col gap-6 px-4 py-10 md:gap-8 lg:flex-row">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl md:h-auto md:min-w-[400px] lg:w-full"
                style={{
                  backgroundImage: `url("${last.imageUrl}")`,
                }}
              ></div>
              <div className="flex flex-col gap-6 @[480px]:min-w-[400px] @[480px]:gap-8 @[864px]:justify-center">
                <div className="flex flex-col gap-2 text-left">
                  <h1 className=" text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Explore the World of Development
                  </h1>
                  <h2 className=" text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    Dive into the latest trends and insights in the tech
                    industry.
                  </h2>
                </div>
                <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
                  <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                    <div
                      className="flex border-none second-element items-center justify-center pl-4 rounded-l-xl border-r-0"
                      data-icon="MagnifyingGlass"
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
                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                      </svg>
                    </div>
                    <input
                      placeholder="Search blog posts"
                      className="form-input second-element flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl  focus:outline-0 focus:ring-0 border-none focus:border-none h-full placeholder:text-[#999999] px-4 rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                      value=""
                    />
                    <div className="flex items-center second-element justify-center rounded-r-xl border-l-0 border-none pr-2">
                      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#019863]  text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                        <span className="text-white truncate">Search</span>
                      </button>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
        <h1 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
          Featured Articles
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
                  className="w-screen rounded-xl desktop:w-auto h-[10rem] laptop:h-auto laptop:w-96 object-cover"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
