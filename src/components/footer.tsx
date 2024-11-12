"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Github, Linkedin, Mail } from "@/app/icons/IconsSvg";
import Link from "next/link";
//import { LinkIcon } from "@nextui-org/react";
import { LinkIcon } from "@heroicons/react/outline";
import { usePathname } from "next/navigation";
const Footer: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false)

  const handleLink = () => {
    if (open == true) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }
  const pathname = usePathname();


  return (
    <footer className={`flex absolute my-4 w-[-webkit-fill-available] bottom-4 mx-10 ${pathname == "/mapView" ? 'hidden' : ''}`}>
      <div className="mx-auto w-[-webkit-fill-available] flex items-center gap-4 justify-between">

        <div className="flex gap-4 items-center">
          <div className="flex">
            <LinkIcon onClick={() => handleLink()} className="w-4 h-4  text-gray-400 hover:text-white transition-colors" />
          </div>

          <div className={`${open == true ? 'flex gap-2' : 'hidden'}`}>
            <Link href={"https://linkedin.com/in/mario-afonso-018107141"}>
              <span>
                <Linkedin alt="Linkedin" className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </span>
            </Link>
            <Link href={"https://github.com/Mario2211-debug"}>
              <span>
                <Github alt="Github" className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </span>
            </Link>
            <Link href={"mailto:mario.afonso@example.com"}>
              <span>
                <Mail alt="Mail" className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </span>
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
