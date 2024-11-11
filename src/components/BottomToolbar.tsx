'use client'
import { motion, AnimatePresence } from "framer-motion";
import {
  SearchIcon,
  SunIcon,
  GlobeIcon,
  ArrowSmDownIcon,
} from "@heroicons/react/outline";
import WorkPagePopup from "./workPagePoupUp";
import TaskManager from "./taskManager";
import { ClimateCard } from "./climateCard";
import { ViewGridIcon } from "@heroicons/react/solid";
import { MoonIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import CalculatorWidget from "@/components/calc";
import SearchBar from "./SearchBar";
export default function BottomToolbar() {
  const [time, setTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controle de expansão
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);


  // Animate presence variants
  const toolbarVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  // Hover animation for buttons
  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  if (!mounted) return null;


  const gradientBorder = theme === "light"
    ? "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
    : "bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950";

  return (
    <>
      {isSearchOpen && <SearchBar onClose={closeSearch} />}

      <WorkPagePopup isOpen={isPopupOpen} onClose={closePopup}>
        {/* Renderize o conteúdo desejado aqui */}
        <div className="flex justify-between py-4">
          <ClimateCard temperature="22°C" location="Porto" />
          <CalculatorWidget />
        </div>
        <TaskManager />

      </WorkPagePopup>
      <AnimatePresence>
        <motion.div
          className={`fixed w-fit justify-self-center z-50 left-0 right-0 justify-center transform backdrop-blur-sm items-center -translate-x-1/2 
        rounded-xl px-3 py-2 flex space-x-4 shadow-lg ${pathname === "/mapView" ? "top-5" : "top-5"}
     ${gradientBorder} ${isPopupOpen == true ? 'hidden' : ''} hover:shadow-xl transition-shadow duration-300`}
          variants={toolbarVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >

          {/* Botões com animações aprimoradas */}
          {/* Ícone de Pesquisa que chama a função onSearchClick */}
          <motion.button
            onClick={openSearch}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="transition-colors duration-200 hover:bg-opacity-20 rounded-lg p-1"
          >
            <SearchIcon className={`h-3.5 w-3.5 ${theme === "light" ? "text-gray-400" : "text-[#6b7280]"
              } transition-colors duration-200`} />
          </motion.button>


          {/* Clima */}
          {/* Divisor animado */}
          <motion.div
            className={`h-3 w-[1px] bg-current opacity-10`}
            animate={{
              height: isHovered ? "16px" : "12px",
              opacity: isHovered ? 0.2 : 0.1,
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Theme Toggle com animação suave */}
          <motion.div className="flex items-center space-x-1">
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.button
                  key="sun"
                  onClick={() => setTheme("light")}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  className="rounded-full text-[#6b7280]"
                >
                  <SunIcon className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  key="moon"
                  onClick={() => setTheme("dark")}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  className="rounded-full"
                >
                  <MoonIcon className="h-3.5 w-3.5 text-gray-400" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          <div className={`h-3 w-[1px] bg-current opacity-10 ${isExpanded ? "hidden" : ""}`}></div>

          {/* Timer */}
          <div className={`flex items-center space-x-1 ${isExpanded ? "hidden" : ""}`}>
            <span className={`text-xs ${theme === "light" ? "text-gray-400" : "text-[#6b7280]"}`}>
              {time.toLocaleTimeString()}
            </span>
          </div>

          <div className={`h-3 w-[1px] bg-current opacity-10 ${isExpanded ? "hidden" : ""}`}></div>

          <div className={`${isExpanded ? "hidden" : ""}`}>
            {/* Ícones de Navegação */}
            <a href="/mapView" className={`${pathname != "/mapView" ? "flex" : "hidden"}`}>
              <GlobeIcon className={`h-3.5 w-3.5 ${theme === "light" ? "text-gray-400" : "text-[#6b7280]"}`} />
            </a>
            <a href="/" className={`${pathname == "/mapView" ? "flex" : "hidden"}`}>
              <ViewGridIcon className={`h-3.5 w-3.5 ${theme === "light" ? "text-gray-400" : "text-[#6b7280]"}`} />
            </a>
          </div>
          <div className={`h-3 w-[1px] bg-current opacity-10 ${isExpanded ? "hidden" : ""}`}></div>

          <div className={`flex ${isExpanded ? "hidden" : ""}`}>
            <span className={`text-xs ${theme === "light" ? "text-gray-400" : "text-[#6b7280]"}`}>22°C</span>
          </div>

          <div className={`h-3 w-[1px] bg-current opacity-10 ${isExpanded ? "hidden" : ""}`}></div>

          {/* Botão de Expansão */}
          <button onClick={openPopup} className={`${isExpanded ? "absolute right-5" : ""}`}>
            <ArrowSmDownIcon
              className={`h-3.5 w-3.5 ${theme === "light" ? "text-gray-400" : "text-[#6b7280]"} transition-transform ${isPopupOpen ? "rotate-180 " : "rotate-0 "}`}
            />
          </button>
        </motion.div>
      </AnimatePresence >

    </>
  );
}
