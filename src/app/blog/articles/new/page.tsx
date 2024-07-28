"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Post from "@/components/Post";
import { format, formatDate } from "date-fns";
import { ACTION_REFRESH } from "next/dist/client/components/router-reducer/router-reducer-types";

interface Post {
  _id: string;
  title?: string;
  content?: string;
  description?: string;
  imageUrl?: string | "@/app/icons/turned-gray-laptop-computer.jpg";
  date?: Date;
  readers?: string;
  className?: string;
  imgclassName?: string;
  src: StaticImageData | string;
  alt: string;
}

export default function NewArticle() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
      setPosts(res.data);
    } catch (error) {
      console.error("erro carregando os posts", error);
    }
  };

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadPostHandler = async () => {
    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    form.append("description", description);
    form.append("file", selectedFile);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blog/new`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchPosts();
    } catch (error) {
      console.error("Erro criando o post", error);
    }
  };

  const deletePost = async (id) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`);
    setPosts(posts.filter((post) => post._id !== id));
  };

  const formatedDate = (dataString) => {
    const date = new Date(dataString);
    if (!isNaN(date.getDate())) return format(date, "dd/MM/yyyy: h:m:s");
    else return "Data is not valid";
  };

  return (
    <>
      <div className="flex m-8 text-justify mx-10 my-24 mobile:mx-6 self-start">
        <div className="grid items-center w-full content-center p-8">
          <h1 className="text-cyan-50 text-5xl p-4">Centro de criação</h1>

          <div className="inline-flex p-2">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="inline-flex p-2">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="inline-flex p-2">
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="inline p-2">
            <input
              type="file"
              className="text-cyan-100"
              onChange={fileSelectedHandler}
            />
          </div>
          <div className="inline-grid self-end">
            <div className="">
              <button
                type="submit"
                className="border p-2 bg-slate-300 float-right"
                onClick={uploadPostHandler}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-cyan-50 text-4xl p-8">Posts recentes</h1>
      <div className="grid gap-4">
        {posts.map((post) => [
          <ul key={post._id} className="blur-cover ">
            <li className="flex justify-between p-4">
              <div className="grid">
                <span className="text-white">{post.title}</span>
                <span className="text-zinc-400 text-sm">
                  {post.description}
                </span>
              </div>

              <div className="grid">
                <span className="text-white content-center">
                  {post.content}
                </span>
              </div>
              <div className="grid">
                <span className="text-white content-center">
                  {formatedDate(post.date)}
                </span>
              </div>
              <div className="float-right content-center">
                <button
                  className="text-white bg-red-500 p-2"
                  onClick={() => deletePost(post._id)}
                >
                  Apagar
                </button>
              </div>
            </li>
          </ul>,
        ])}
      </div>
    </>
  );
}
