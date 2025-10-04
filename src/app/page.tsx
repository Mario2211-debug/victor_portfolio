"use client"
import { useEffect, useState } from 'react';

// Importações de componentes
import PreSection from "../components/Home/Section";
import BottomToolbar from "@/components/BottomToolbar";
import SearchBar from '@/components/SearchBar';
import Blob from "@/components/blob";
import FullScreenNavBar from "@/components/Navbar";
import Footer from "@/components/footer";
import CalculatorWidget from '@/components/calc';
import { About, Contacts, Projects } from '@/components/sections';

// Importações de tipos e constantes
import { SectionType } from '@/types';
import { CONTAINER_PADDING } from '@/constants';

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Componente Home - Página principal do portfólio
 * 
 * @returns JSX da página principal
 */
export default function Home() {
  // Estado para controlar a seção ativa
  const [activeSection, setActiveSection] = useState<SectionType>(null);

  /**
   * Manipula a mudança de seção ativa
   * @param section - Tipo da seção a ser ativada
   */
  const handleSectionChange = (section: SectionType) => {
    setActiveSection(section);
  };


  return (
    <div className="relative flex size-full hide-scrollbar overflow-y-auto max-h-screen flex-col pb-20">
      <div className="layout-container flex h-fit grow flex-col">
        {/* Seção principal com conteúdo */}
        <div className={`${CONTAINER_PADDING.EXTRA_LARGE} mobile:${CONTAINER_PADDING.MOBILE} md:${CONTAINER_PADDING.TABLET} lg:${CONTAINER_PADDING.DESKTOP} xl:${CONTAINER_PADDING.LARGE_DESKTOP} flex flex-1 justify-center pt-24 blog-font`}>
          <section>
            {/* Seção de apresentação */}
            <PreSection />
            
            {/* Divisor visual */}
            <div className='border-t-2 py-2 border-gray-600 border-dotted'></div>

            {/* Grid de navegação e conteúdo */}
            <div className="grid">
              {/* Navegação por abas */}
              <ul className='flex gap-4 home-element'>
                <button 
                  onClick={() => handleSectionChange('about')} 
                  className={`${activeSection === 'about' ? 'border-b-2 border-solid border-[#ffffff] text-[#ffffff]' : ''}`}
                  aria-label="Ver informações sobre o desenvolvedor"
                >
                  About
                </button>
                <button 
                  onClick={() => handleSectionChange('contacts')} 
                  className={`${activeSection === 'contacts' ? 'border-b-2 border-solid border-[#ffffff] text-[#ffffff]' : ''}`}
                  aria-label="Ver posts do blog"
                >
                  Blog
                </button>
                <button 
                  onClick={() => handleSectionChange('projects')} 
                  className={`${activeSection === 'projects' ? 'border-b-2 border-solid border-[#ffffff] text-[#ffffff]' : ''}`}
                  aria-label="Ver projetos desenvolvidos"
                >
                  Projects
                </button>
              </ul>

              {/* Conteúdo dinâmico baseado na seção ativa */}
              <div className="pt-4 transition-all duration-200">
                {activeSection === 'about' && <About />}
                {activeSection === 'contacts' && <Contacts />}
                {activeSection === 'projects' && <Projects />}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
