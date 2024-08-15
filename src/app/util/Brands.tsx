"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// Supondo que as imagens sejam importadas ou tenham seus caminhos definidos
import { PostGreee, JavaScript, Java, Csharp } from "../icons/IconsSvg";
const MyComponent = () => {
  const { theme } = useTheme(); // Get the current theme
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 480);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    // Initial check on mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const laptop = () => {
    return (
      <div className="flex p-10 justify-center ">
        <div className="grid laptop:flex tracking-wide grid-cols-2 gap-3 items-start ">
          <div className="h-full pr-36 gap-4 p-2 grid hover:bg-indigo-200 hover:bg-opacity-10 blur-cover bg-[rgb(83,82,82)]">
            <PostGreee
              className={`w-10 h-10 ${
                theme === "dark" ? "fill-white" : "fill-black"
              }`}
            />
            <div>
              <span className=" max-w-max font-medium text-sm">PostgreSql</span>
            </div>
          </div>
          <div className="h-full pr-36 gap-4 p-2 grid blur-cover hover:bg-yellow-300 hover:bg-opacity-10 bg-[rgb(83,82,82)]">
            <JavaScript
              className={`w-10 h-10 ${
                theme === "dark" ? "fill-white" : "fill-black"
              }`}
            />
            <div>
              <span className=" max-w-max font-medium text-sm">JavaScript</span>
            </div>
          </div>
          <div className="h-full max-w-lg pr-36 gap-4 p-2 grid blur-cover bg-[rgb(83,82,82)]">
            <Java
              className={`w-10 h-10 ${
                theme === "dark" ? "fill-white" : "fill-black"
              }`}
            />
            <div>
              <span className="max-w-max font-medium text-sm">Java</span>
            </div>
          </div>
          <div className="h-full max-w-lg pr-36 gap-4 p-2 grid blur-cover bg-[rgb(83,82,82)]">
            <div className="flex ">
              <Csharp
                className={`w-10 h-10 ${
                  theme === "dark" ? "stroke-white" : "stroke-black"
                }`}
              />
            </div>
            <div className="grid">
              <span className=" max-w-max font-medium text-sm">Csharp</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const mobile = () => {
    return (
      <div className="inline-block blur-cover">
        <div className="h-15 flex items-center justify-center">
          <ul className="md:justify-center contents justify-between">
            <li className="flex p-2">
              <PostGreee
                className={`w-10 h-10 ${
                  theme === "dark" ? undefined : "fill-black"
                }`}
              />
            </li>

            <li className="flex p-2">
              <JavaScript
                className={`w-10 h-10 ${
                  theme === "dark" ? undefined : "fill-black"
                }`}
              />
            </li>

            <li className="flex p-2">
              <Java
                className={`w-10 h-10 ${
                  theme === "dark" ? undefined : "fill-black"
                }`}
              />
            </li>

            <li className="flex p-2">
              <Csharp
                className={`w-10 h-10 ${
                  theme != "dark" ? "stroke-black" : "stroke-white"
                }`}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return !isLargeScreen ? mobile() : laptop();
};

export default MyComponent;
