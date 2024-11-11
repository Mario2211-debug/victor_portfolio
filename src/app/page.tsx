"use client"
import { useEffect, useState } from 'react';
import PreSection from "../components/Home/Section";
//import Projects from "./projects/old";
import BottomToolbar from "@/components/BottomToolbar";
import SearchBar from '@/components/SearchBar';
import Blob from "@/components/blob";
import FullScreenNavBar from "@/components/Navbar";
import Footer from "@/components/footer";
import CalculatorWidget from '@/components/calc';
import { About, Contacts, Projects } from '@/components/sections'

export default function Home() {
  const [activeSection, setActiveSection] = useState(null);
  const handleSectionChange = (section: any) => {
    setActiveSection(section);
  };


  return (
    <>
      <div className="relative flex size-full hide-scrollbar overflow-y-auto max-h-screen flex-col ">
        <div className="layout-container flex h-fit grow flex-col">
          {/* <Blob /> */}
          {/* <FullScreenNavBar /> */}
          <div className="px-40 mobile:px-6 md:px-8 lg:px-10 xl:px-12 flex flex-1 justify-center pt-20 blog-font">

            <section>
              <PreSection />
              <div className='border-t-2 py-2 border-gray-600 border-dotted'></div>

              <div className="grid">
                <ul className='flex gap-4 home-element'>
                  <button onClick={() => handleSectionChange('about')} className={`${activeSection === 'about' ? 'border-b-2 border-solid border-[#ffffff] text-[#ffffff]' : ''}`}>About</button>
                  <button onClick={() => handleSectionChange('contacts')} className={`${activeSection === 'contacts' ? 'border-b-2 border-solid border-[#ffffff] text-[#ffffff]' : ''}`}>Blog</button>
                  <button onClick={() => handleSectionChange('projects')} className={`${activeSection === 'projects' ? 'border-b-2 border-solid border-[#ffffff] text-[#ffffff]' : ''}`}>Projects</button>
                </ul>

                <div className="pt-4 inline-flex transition-all duration-200 ">
                  {activeSection === 'about' && <About />}
                  {activeSection === 'contacts' && <Contacts />}
                  {activeSection === 'projects' && <Projects />}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

    </>
  );
}
