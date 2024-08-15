"use client";
import Image from "next/image";
import profile from "@/app/icons/profile.jpg";
import Brands from "../../app/util/Brands";
import { useTheme } from "next-themes";

export default function PreSection() {
  const { theme } = useTheme();
  return (
    <>
      <div className="text-center">
        <div className="md:pt-40 mobile:px-2 mobile:py-20">
          <div className="inline tracking-wide text-center md:w-6 w-full md:flex-1">
            <span className="inline-flex items-center w-60 h-60">
              <Image
                src={profile}
                alt="Mario Afonso"
                className="rounded-full object-cover h-[-webkit-fill-available] w-[-webkit-fill-available]"
              />
            </span>
            <h2 className="mobile:text-5xl font-Bellefair p-2 md:text-5xl font-bold">
              Hi, I am Mário Afonso
            </h2>
            <span className="home-element inline-block md:w-2/3 w-full">
              <h1 className="black:font-extralight text-xl md:text-2xl inline-block overflow-hidden whitespace-nowrap mobile:justify-center mobile:inline-block">
                Software Developer
              </h1>
            </span>

            <span className="inline-block w-full">
              <p
                className={`mobile:text-wrap p-4 mobile-landscape:p-0 font-extralight text-xs md:text-lg text-nowrap inline-block overflow-hidden whitespace-nowrap mobile:justify-center mobile:inline-block ${
                  theme === "dark" ? "font-extralight" : "font-normal"
                }`}
              >
                Programadores e artistas são os únicos profissionais que tem
                como hobby a própria profissão.
              </p>
            </span>
            <Brands />
          </div>
        </div>
      </div>
    </>
  );
}
