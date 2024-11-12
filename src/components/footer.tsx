'use client'
import { useTheme } from "next-themes";
import { useState } from "react";
import { Github, Linkedin, Mail } from "@/app/icons/IconsSvg";
import Link from "next/link";
import { LinkIcon } from "@heroicons/react/outline";
import { usePathname } from "next/navigation";

const Footer: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleLink = () => setOpen(!open);

  return (
    <footer className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl ${pathname === "/mapView" ? 'hidden' : ''}`}>
      <div className="flex mx-auto w-full items-center gap-4 justify-between px-4">
        <div className="flex gap-4 items-center">
          <LinkIcon onClick={handleLink} className="w-4 h-4 text-gray-400 hover:text-white transition-colors cursor-pointer" />
          <div className={`${open ? 'flex gap-2' : 'hidden'}`}>
            <Link href="https://linkedin.com/in/mario-afonso-018107141">
              <span><Linkedin alt="Linkedin" className="w-5 h-5 text-gray-400 hover:text-white transition-colors" /></span>
            </Link>
            <Link href="https://github.com/Mario2211-debug">
              <span><Github alt="Github" className="w-5 h-5 text-gray-400 hover:text-white transition-colors" /></span>
            </Link>
            <Link href="mailto:mario.afonso@example.com">
              <span><Mail alt="Mail" className="w-5 h-5 text-gray-400 hover:text-white transition-colors" /></span>
            </Link>
          </div>
        </div>
        <div className="flex">
          <p className="text-xs text-gray-400">©️ 2024 | Mário Afonso</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
