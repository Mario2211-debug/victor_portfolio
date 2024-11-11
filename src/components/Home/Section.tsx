"use client";
import Image from "next/image";
import profile from "@/app/icons/profile.jpg";
import Brands from "../../app/util/Brands";
import { useTheme } from "next-themes";

export default function PreSection() {
  const { theme } = useTheme();
  return (
    <>
      <div className="text-center  md:w-[400px] w-[350px]  py-4">
        <div className="mobile:px-2 gap-3 flex">
          <span className="relative content-center place-items-center">
            <Image
              src={profile}
              alt="Mario Afonso"
              className="rounded-full h-14 w-14 m-2 object-cover"
            />
          </span>
          <div className="flex tracking-wide text-center w-full">

            <div className="text-justify font-Bellefair p-2">
              <span className="flex">

                <h2 className="font-sans pr-1 home-element">Hi, I am</h2> <h2 className="font-sans font-semibold">Mário Afonso</h2>

              </span>
              <span className="home-element md:w-2/3 w-full">
                <h1 className="black:font-extralight text-sm overflow-hidden  whitespace-nowrap">
                  Software Developer based in Porto.
                </h1>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
