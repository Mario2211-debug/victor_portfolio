"use client";

import Image, { StaticImageData } from "next/image";

export interface PostProps {
  _id: string;
  title?: string;
  content?: string;
  date?: string;
  readers?: string;
  className?: string;
  imgclassName?: string;
  src: StaticImageData | string;
  alt: string;
  width: number;
  height: number;
}

export default function Post(props: PostProps) {
  return (
    <>
      <div className="max-w-fit min-h-fit">
        <Image
          src={props.src}
          alt={props.alt}
          className={
            props.imgclassName || "rounded-xl w-[-webkit-fill-available]"
          }
          width={200}
          height={200}
        />

        <div className="inline-grid gap-2 text-justify">
          <div className="inline-flex float-right gap-4 p-2">
            <span className="text-zinc-400 font-semibold">2.5m</span>
            <span className="text-zinc-400 font-semibold">2.5m</span>
          </div>
          <h1 className="text-xl text-white font-bold">{props.title}</h1>
          <span className="text-zinc-400">{props.content}</span>
          <span className="text-zinc-400">{props.date}</span>
        </div>
      </div>
    </>
  );
}
