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
  src?: string | StaticImageData;
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
      <div className="flex flex-col gap-4 pb-3">
        <div
          className="w-full bg-center bg-no-repeat bg-cover rounded-xl aspect-square object-cover"
          style={{
            backgroundImage: `url("${props.src}")`,
          }}
        ></div>
        <div>
          <p className=" text-base font-medium leading-normal">
            {props.title}{" "}
          </p>
          <p className="text-[#999999] text-sm font-normal leading-normal">
            2.5min - Leia
          </p>
        </div>
      </div>
    </>
  );
}
