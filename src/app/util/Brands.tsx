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
      <div className="justify-center ">
        <div className="flex laptop:flex tracking-wide items-start ">
          <div className="h-full p-2 grid ">
            <PostGreee
              className={`w-7 h-7 ${theme === "dark" ? "fill-white" : "fill-black"
                }`}
            />

          </div>
          <div className="h-full p-2 grid">
            <JavaScript
              className={`w-7 h-7  ${theme === "dark" ? "fill-white" : "fill-black"
                }`}
            />

          </div>
          <div className="h-full p-2 grid">
            <Java
              className={`w-7 h-7  ${theme === "dark" ? "fill-white" : "fill-black"
                }`}
            />

          </div>
          <div className="h-full p-2 grid">
            <div className="flex ">
              <Csharp
                className={`w-7 h-7  ${theme === "dark" ? "stroke-white" : "stroke-black"
                  }`}
              />
            </div>

          </div>
        </div>
      </div>
    );
  };

  const mobile = () => {
    return (
      <div className="blur-cover">
        <div className="h-15 flex items-center justify-center">
          <ul className="md:justify-center contents justify-between">
            <li className="flex p-2">
              <PostGreee
                className={`w-10 h-10 ${theme != "dark" ? "" : "!fill-white"}`}
              />
            </li>

            <li className="flex p-2">
              <JavaScript
                className={`w-10 h-10 ${theme != "dark" ? "" : "!fill-white"}`}
              />
            </li>

            <li className="flex p-2">
              <Java
                className={`w-10 h-10 ${theme != "dark" ? "" : "!fill-white"}`}
              />
            </li>

            <li className="flex p-2">
              <Csharp
                className={`w-10 h-10 ${theme != "dark" ? "stroke-black" : "stroke-white"
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
