"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Post from "@/components/Blog/Post";
import { format, formatDate } from "date-fns";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Post {
  _id: string;
  title?: string;
  content?: string;
  description?: string;
  imageUrl?: string | "@/app/icons/turned-gray-laptop-computer.jpg";
  category?: {
    _id: string;
    name: string;
  };
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
  const [category, setCategory] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState([]);
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/categories`
      );
      setCategories(res.data);
    } catch (error) {
      console.error("Erro carregando categorias", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
      // Ordena os posts por data, do mais recente para o mais antigo
      const sortedPosts = res.data.sort((a: Post, b: Post) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      setPosts(sortedPosts);
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
    form.append("category", category);
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
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/blog/post/${id}`);
    setPosts(posts.filter((post) => post._id !== id));
  };

  const formatedDate = (dataString) => {
    const date = new Date(dataString);
    if (!isNaN(date.getDate())) return format(date, "dd/MM/yyyy: h:m:s");
    else return "Data is not valid";
  };

  const asPhoto = (Atributo: any) => {
    const temPhoto = "Tenho esse atributo";
    if (!Atributo) {
      return Atributo;
    }
    return temPhoto;
  };
  return (
    <>
      <div className="gap-1 px-6 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col w-80">
          <div className="flex h-full min-h-[700px] flex-col justify-between p-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                  style={{
                    backgroundImage:
                      'url("https://cdn.usegalileo.ai/sdxl10/c9b00998-a737-4bd0-b8b6-f2ddeb2becb5.png")',
                  }}
                ></div>
                <div className="flex flex-col">
                  <h1 className="text-base font-medium leading-normal">M.</h1>
                  <p className="home-element text-sm font-normal leading-normal">
                    Centro de criação
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div
                    className=""
                    data-icon="Gauge"
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
                      <path d="M207.06,80.67A111.24,111.24,0,0,0,128,48h-.4C66.07,48.21,16,99,16,161.13V184a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V160A111.25,111.25,0,0,0,207.06,80.67ZM224,184H119.71l54.76-75.3a8,8,0,0,0-12.94-9.42L99.92,184H32V161.13c0-3.08.15-6.12.43-9.13H56a8,8,0,0,0,0-16H35.27c10.32-38.86,44-68.24,84.73-71.66V88a8,8,0,0,0,16,0V64.33A96.14,96.14,0,0,1,221,136H200a8,8,0,0,0,0,16h23.67c.21,2.65.33,5.31.33,8Z"></path>
                    </svg>
                  </div>
                  <p className=" text-sm font-medium leading-normal">
                    Dashboard
                  </p>
                </div>
                <div className="second-element flex items-center gap-3 px-3 py-2 rounded-full">
                  <div
                    className=""
                    data-icon="Envelope"
                    data-size="24px"
                    data-weight="fill"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"></path>
                    </svg>
                  </div>
                  <p className=" text-sm font-medium leading-normal">Posts</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div
                    className=""
                    data-icon="Cat"
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
                      <path d="M96,140a12,12,0,1,1-12-12A12,12,0,0,1,96,140Zm76-12a12,12,0,1,0,12,12A12,12,0,0,0,172,128Zm60-80v88c0,52.93-46.65,96-104,96S24,188.93,24,136V48A16,16,0,0,1,51.31,36.69c.14.14.26.27.38.41L69,57a111.22,111.22,0,0,1,118.1,0L204.31,37.1c.12-.14.24-.27.38-.41A16,16,0,0,1,232,48Zm-16,0-21.56,24.8A8,8,0,0,1,183.63,74,88.86,88.86,0,0,0,168,64.75V88a8,8,0,1,1-16,0V59.05a97.43,97.43,0,0,0-16-2.72V88a8,8,0,1,1-16,0V56.33a97.43,97.43,0,0,0-16,2.72V88a8,8,0,1,1-16,0V64.75A88.86,88.86,0,0,0,72.37,74a8,8,0,0,1-10.81-1.17L40,48v88c0,41.66,35.21,76,80,79.67V195.31l-13.66-13.66a8,8,0,0,1,11.32-11.31L128,180.68l10.34-10.34a8,8,0,0,1,11.32,11.31L136,195.31v20.36c44.79-3.69,80-38,80-79.67Z"></path>
                    </svg>
                  </div>
                  <p className=" text-sm font-medium leading-normal">
                    Categorias
                  </p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div
                    className=""
                    data-icon="Folder"
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
                      <path d="M216,72H131.31L104,44.69A15.86,15.86,0,0,0,92.69,40H40A16,16,0,0,0,24,56V200.62A15.4,15.4,0,0,0,39.38,216H216.89A15.13,15.13,0,0,0,232,200.89V88A16,16,0,0,0,216,72ZM40,56H92.69l16,16H40ZM216,200H40V88H216Z"></path>
                    </svg>
                  </div>
                  <p className=" text-sm font-medium leading-normal">
                    Arquivos
                  </p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div
                    className=""
                    data-icon="Gear"
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
                      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
                    </svg>
                  </div>
                  <p className=" text-sm font-medium leading-normal">
                    Configurações
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <p className=" text-4xl font-black leading-tight tracking-[-0.033em]">
                Centro de criação
              </p>
              <p className=" text-base font-normal leading-normal">
                Crie e gerencie seus posts
              </p>
            </div>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input placeholder:home-element flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl  focus:outline-0 focus:ring-0 border border-[#E9DFCE] bg-[#FFFFFF] focus:border-[#E9DFCE] h-14 placeholder:text-[#A18249] p-[15px] text-base font-normal leading-normal"
              />
            </label>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <input
                type="text"
                placeholder="Digite uma descrição para o post"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input placeholder:home-element  flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl  focus:outline-0 focus:ring-0 border border-[#E9DFCE] bg-[#FFFFFF] focus:border-[#E9DFCE] h-14 placeholder:text-[#A18249] p-[15px] text-base font-normal leading-normal"
              />
            </label>
          </div>
          <div className="flex max-w-[480px] max-h-fit flex-wrap items-end gap-4 px-4 py-3">
            <div className="flex flex-col min-w-40 flex-1">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={{ toolbar: toolbarOptions }}
              />
            </div>
          </div>
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex placeholder:home-element  flex-col min-w-40 flex-1">
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl  focus:outline-0 focus:ring-0 border border-[#E9DFCE] bg-[#FFFFFF] focus:border-[#E9DFCE] h-14 bg-[image:--select-button-svg] placeholder:text-[#A18249] p-[15px] text-base font-normal leading-normal"
              >
                <option>Selecione uma categoria</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex justify-stretch">
            <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between items-center">
              <input
                type="file"
                onChange={fileSelectedHandler}
                className="
    min-w-0
    max-w-min
    flex-1
    rounded-xl
    text-gray-800
    focus:outline-none
    focus:ring-0
    border
    border-gray-300
    bg-white
    focus:border-gray-300
    h-14
    px-4 // Adjust padding if needed
    py-3 // Adjust padding if needed
    text-base
    font-normal
    leading-normal
    file:mr-2 // Space between file name and button
    file:py-2 // Adjust padding if needed
    file:px-4
    file:rounded-full
    file:border-0
    file:text-sm
    file:font-semibold
    file:bg-amber-600 // Customize the button color
    file:text-white
    file:cursor-pointer
  "
              />

              <button
                type="submit"
                onClick={uploadPostHandler}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#019863] text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Submit</span>
              </button>
            </div>
          </div>

          <h2 className=" text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Posts recentes
          </h2>
          <div className="px-4 py-3 @container">
            <div className="flex overflow-hidden rounded-xl border border-[#E9DFCE] bg-[#FFFFFF]">
              <table className="w-full">
                <thead>
                  <tr className="bg-white">
                    <th className="px-4 py-3 text-left text-gray-800 w-[400px] text-sm font-medium">
                      Título
                    </th>
                    <th className="px-4 py-3 text-left text-gray-800 w-[400px] text-sm font-medium">
                      Descrição
                    </th>
                    <th className="px-4 py-3 text-left text-gray-800 w-[400px] text-sm font-medium">
                      Data
                    </th>
                    <th className="px-4 py-3 text-left text-gray-800 w-20 text-sm font-medium">
                      Ação
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {posts.map((post) => (
                    <tr key={post._id} className="border-t border-gray-200">
                      <td className="px-4 py-2 w-[400px] text-gray-800 text-sm">
                        {post.title}
                      </td>
                      <td className="px-4 py-2 w-[400px] home-element text-sm">
                        {post.description}
                      </td>
                      <td className="px-4 py-2 w-[400px] home-element text-sm">
                        {formatedDate(post.date)}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className="px-4 py-2 bg-[#A18249] hover:bg-red-500 text-white text-sm font-bold tracking-[0.015em] rounded"
                          onClick={() => deletePost(post._id)}
                        >
                          Apagar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
