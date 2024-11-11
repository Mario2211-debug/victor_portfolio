"use client";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useEffect } from "react";
import { MoonIcon } from "@/app/icons/MoonIcon";
import { SunIcon } from "@/app/icons/SunIcon";

interface MobileNavProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileNav({ open, setOpen }: MobileNavProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    window.addEventListener("scroll", function () {
      const navbar = this.document.querySelector(".navbar");
      if (this.window.scrollY > 0) {
        navbar?.classList.add("backdrop-blur-md", "bg-opacity-70");
      } else {
        navbar?.classList.remove("backdrop-blur-md", "bg-opacity-70");
      }
    });

    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 w-full navbar-element h-full overflow-y-hidden z-10 transform ${open ? "-translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 ease-in-out filter`}
    >
      <div className="flex flex-col justify-center items-center mt-28">
        <a
          href="/"
          className={`text-2xl font-bold  hover:text-red-500 my-4 ${pathname === "/" ? "hidden" : "flex"
            }`}
        >
          Home
        </a>

        <a
          className={`text-2xl font-bold hover:text-red-500 my-4 ${pathname === "/mapView" ? "hidden" : "flex"
            }`}
          href="/mapView"
        >
          Mapa
        </a>
        <a
          className={`text-2xl font-bold hover:text-red-500 my-4 ${pathname === "/projects" ? "hidden" : "flex"
            }`}
          href="/projects"
        >
          Projects
        </a>

        <a
          href="/about"
          className={`text-2xl font-bold hover:text-red-500 my-4 link ${pathname === "/about" ? "hidden" : "flex"
            }`}
        >
          Sobre
        </a>
      </div>
    </div>
  );
}

export default function FullScreenNavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  console.log(pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header>
      <div className="w-full h-fit fixed z-20 top-0 left-0 ">
        <div className="navbar flex items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            <a
              href="/"
              className="flex items-center w-11/12 flex-1 justify-start p-4 md:order-2"
            >
              M.
            </a>
          </span>

          {/* ^Hamburguer */}
          <div className="w-11/12 flex flex-1 justify-end items-center md:order-2 fixed:false">
            {/* <div className="flex md:px-0 items-center px-10">
              <button
                onClick={() => setTheme("light")}
                className={`
              p-2 rounded-full transition-opacity duration-300 mr-2
              ${
                theme === "light"
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }
            `}
              >
                <SunIcon className="w-6 h-6 text-yellow-500" />
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={`
              p-2 rounded-full transition-opacity duration-300
              ${
                theme === "dark"
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }
            `}
              >
                <MoonIcon className="w-6 h-6" />
              </button>
            </div>{" "} */}
            <div className="hidden md:flex">
              <ul>
                <li className="px-4 flex self-center whitespace-nowrap">
                  <a
                    href="/"
                    className={`items-center w-11/12 flex-1 justify-start p-4 md:order-2 
                      ${pathname === "/" ? "hidden" : "flex"}`}
                  >
                    Home
                  </a>
                  <a
                    href="/mapView"
                    className={`items-center w-11/12 flex-1 justify-start p-4 md:order-2 
                      ${pathname === "/mapView" ? "hidden" : "flex"}`}
                  >
                    Mapa
                  </a>
                  <a
                    href="/projects"
                    className={`items-center w-11/12 flex-1 justify-start p-4 md:order-2 
                      ${pathname === "/projects" ? "hidden" : "flex"}`}
                  >
                    Projects
                  </a>
                  <a
                    href="/about"
                    className={`items-center w-11/12 flex-1 justify-start p-4 md:order-2 
                      ${pathname === "/about" ? "hidden" : "flex"}`}
                  >
                    Sobre
                  </a>
                </li>
              </ul>

              {/* Theme Switcher Buttons */}
            </div>
            <div
              className="md:hidden group z-50 relative w-16 h-6 cursor-pointer flex-col justify-between items-center flex"
              onClick={() => setOpen(!open)}
            >
              {/* {Hamburguer btn} */}
              <span
                className={`h-1 w-full navbar-icon rounded-lg group-hover:text-red-500 cursor-pointer transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-2.5" : ""
                  }`}
              ></span>
              <span
                className={`h-1 w-9 navbar-icon rounded-lg group-hover:text-red-500 cursor-pointer transform transition duration-300 ease-in-out  ${open ? "w-10" : "w-full"
                  }`}
              ></span>
              <span
                className={`h-1 w-full navbar-icon navbar-element rounded-lg group-hover:text-red-500 cursor-pointer transform transition duration-300 ease-in-out ${open ? "w-0" : "w-full"
                  }`}
              ></span>
            </div>
          </div>
          {/* ^Hamburguer */}
        </div>
      </div>

      <MobileNav open={open} setOpen={setOpen} />
    </header>
  );
}
