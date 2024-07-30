"use client";

import { format } from "date-fns";
import Image, { StaticImageData } from "next/image";

export interface PostProps {
  _id?: string;
  title?: string;
  content?: string;
  description?: string;
  imageUrl?: string | "@/app/icons/turned-gray-laptop-computer.jpg";
  category?: string;
  date?: Date | string;
  readers?: string;
  className?: string;
  imgclassName?: string;
  src?: StaticImageData | string;
  alt?: string;
}

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return format(date, "dd/MM/yyyy: h:m:s");
  }
  return "Data inválida";
};
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
          width={1000000}
          height={1000000}
        />

        <div className="inline-grid gap-2 text-justify">
          <div className="inline-flex float-right gap-4 p-2">
            <span className="text-zinc-400 font-semibold text-sm laptop:text-base">
              2.5m
            </span>

            <span className="text-zinc-400 font-semibold text-sm laptop:text-base">
              2.5m
            </span>
          </div>

          <h1 className="text-white font-bold text-md">{props.title}</h1>
          <span className="text-zinc-400 text-justify text-balance tracking-normal line-clamp-2 leading-relaxed whitespace-normal font-medium text-md laptop:text-sm">
            {props.content}
          </span>
          <span className="text-zinc-400 text-xs">
            {formatDate(props.date)}
          </span>
        </div>
      </div>
    </>
  );
}
