/**
 * BottomToolbar - Barra de ferramentas superior do portfólio
 * 
 * Este componente fornece acesso rápido a funcionalidades como:
 * - Busca
 * - Alternância de tema
 * - Navegação entre páginas
 * - Informações de clima e tempo
 * - Popup com ferramentas adicionais
 */

'use client'
import { motion, AnimatePresence } from "framer-motion";
import {
  SearchIcon,
  SunIcon,
  GlobeIcon,
  ArrowSmDownIcon,
} from "@heroicons/react/outline";
import { ViewGridIcon } from "@heroicons/react/solid";
import { MoonIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

// Importações de componentes
import WorkPagePopup from "./workPagePoupUp";
import TaskManager from "./taskManager";
import { ClimateCard } from "./climateCard";
import AdvancedCalculator from "@/components/calc";
import SearchBar from "./SearchBar";

// Importações de constantes
import { 
  ANIMATION_DURATION, 
  ANIMATION_EASING,
  THEME_GRADIENTS,
  COLORS,
  ICON_SIZES,
  FONT_SIZES,
  ROUTES,
  Z_INDEX
} from "@/constants";
// ============================================================================
// CONFIGURAÇÕES DE ANIMAÇÃO
// ============================================================================

/**
 * Variantes de animação para a toolbar
 */
const toolbarVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION.NORMAL,
      ease: ANIMATION_EASING.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: ANIMATION_DURATION.FAST,
      ease: ANIMATION_EASING.EASE_IN,
    },
  },
};

/**
 * Variantes de hover para botões
 */
const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: ANIMATION_DURATION.FAST,
      ease: ANIMATION_EASING.EASE_IN_OUT,
    },
  },
  tap: {
    scale: 0.95,
  },
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Componente principal da BottomToolbar
 */
export default function BottomToolbar() {
  // Estados locais
  const [time, setTime] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hooks
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // Funções de controle de estado
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  /**
   * Inicializa o componente e configura o timer
   */
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  // Não renderiza até que o componente esteja montado (evita problemas de hidratação)
  if (!mounted) return null;

  // Determina o gradiente baseado no tema atual
  const gradientBorder = theme === "light"
    ? THEME_GRADIENTS.LIGHT
    : THEME_GRADIENTS.DARK;

  return (
    <>
      {/* Componente de busca */}
      {isSearchOpen && <SearchBar onClose={closeSearch} />}

      {/* Popup com ferramentas adicionais */}
      <WorkPagePopup isOpen={isPopupOpen} onClose={closePopup}>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ClimateCard temperature="22°C" location="Porto" />
          <AdvancedCalculator />
        </div>
        <TaskManager />
      </WorkPagePopup>

      {/* Toolbar principal */}
      <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 ${pathname === ROUTES.MAP_VIEW ? 'hidden' : ''}`}>
        <AnimatePresence>
          <motion.div
            className={`w-fit backdrop-blur-sm items-center rounded-xl px-3 py-2 flex space-x-4 shadow-lg
         ${gradientBorder} ${isPopupOpen ? 'hidden' : ''} hover:shadow-xl transition-shadow duration-300`}
            variants={toolbarVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >

            {/* Botão de busca */}
            <motion.button
              onClick={openSearch}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="transition-colors duration-200 hover:bg-opacity-20 rounded-lg p-1"
              aria-label="Abrir busca"
            >
              <SearchIcon className={`${ICON_SIZES.SMALL} ${theme === "light" ? COLORS.PRIMARY.LIGHT : COLORS.PRIMARY.DARK} transition-colors duration-200`} />
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

            {/* Alternância de tema com animação suave */}
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
                    className={`rounded-full ${COLORS.PRIMARY.DARK}`}
                    aria-label="Alternar para tema claro"
                  >
                    <SunIcon className={ICON_SIZES.MEDIUM} />
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
                    aria-label="Alternar para tema escuro"
                  >
                    <MoonIcon className={`${ICON_SIZES.SMALL} ${COLORS.PRIMARY.LIGHT}`} />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Divisor */}
            <div className={`h-3 w-[1px] bg-current opacity-10 ${isExpanded ? "hidden" : ""}`}></div>

            {/* Exibição do tempo atual */}
            <div className={`flex items-center space-x-1 ${isExpanded ? "hidden" : ""}`}>
              <span className={`${FONT_SIZES.SMALL} ${theme === "light" ? COLORS.PRIMARY.LIGHT : COLORS.PRIMARY.DARK}`}>
                {time.toLocaleTimeString()}
              </span>
            </div>

            {/* Divisor */}
            <div className={`h-3 w-[1px] bg-current opacity-10 ${isExpanded ? "hidden" : ""}`}></div>

            {/* Botões de navegação */}
            <div className={`${isExpanded ? "hidden" : ""}`}>
              <a 
                href={ROUTES.MAP_VIEW} 
                className={`${pathname !== ROUTES.MAP_VIEW ? "flex" : "hidden"}`}
                aria-label="Ir para visualização do mapa"
              >
                <GlobeIcon className={`${ICON_SIZES.SMALL} ${theme === "light" ? COLORS.PRIMARY.LIGHT : COLORS.PRIMARY.DARK}`} />
              </a>
              <a 
                href={ROUTES.HOME} 
                className={`${pathname === ROUTES.MAP_VIEW ? "flex" : "hidden"}`}
                aria-label="Voltar para página inicial"
              >
                <ViewGridIcon className={`${ICON_SIZES.SMALL} ${theme === "light" ? COLORS.PRIMARY.LIGHT : COLORS.PRIMARY.DARK}`} />
              </a>
            </div>
            
            {/* Divisor */}
            <div className={`h-3 w-[1px] bg-current opacity-10 ${isExpanded ? "hidden" : ""}`}></div>

            {/* Informação de clima */}
            <div className={`flex ${isExpanded ? "hidden" : ""}`}>
              <span className={`${FONT_SIZES.SMALL} ${theme === "light" ? COLORS.PRIMARY.LIGHT : COLORS.PRIMARY.DARK}`}>
                22°C
              </span>
            </div>

            {/* Divisor */}
            <div className={`h-3 w-[1px] bg-current opacity-10 ${isExpanded ? "hidden" : ""}`}></div>

            {/* Botão de expansão do popup */}
            <button 
              onClick={openPopup} 
              className={`${isExpanded ? "absolute right-5" : ""}`}
              aria-label="Abrir ferramentas adicionais"
            >
              <ArrowSmDownIcon
                className={`${ICON_SIZES.SMALL} ${theme === "light" ? COLORS.PRIMARY.LIGHT : COLORS.PRIMARY.DARK} transition-transform ${isPopupOpen ? "rotate-180" : "rotate-0"}`}
              />
            </button>
          </motion.div>
        </AnimatePresence >
      </div>

    </>
  );
}
