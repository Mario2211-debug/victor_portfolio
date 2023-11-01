'use client'
import { usePathname } from "next/navigation";
import { useState } from "react";
import {useEffect} from 'react';
import Link from "next/link";

interface MobileNavProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// useEffect(() => {
//     window.addEventListener('scroll', function(){
//         const navbar = this.document.querySelector('.navbar')
//         if(this.window.scrollY > 0) {
//             navbar?.classList.add('blur');
//         }
//         else {
//                 navbar?.classList.remove('blur')
//             }
//         })
// })





function MobileNav({ open, setOpen }: MobileNavProps) {
    const pathname = usePathname()

    return (
        <div
            className={`absolute top-0 left-0 bottom-0 w-full bg-black transform ${
                open ? "-translate-y-0" : "-translate-y-full"
            } transition-transform duration-300 ease-in-out filter`}
            >
            <div className=" flex flex-col justify-center items-center mt-28">
            <Link  href="/" className="text-2xl text-white font-bold hover:text-red-500 my-4">Home</Link>
            <Link className="text-2xl text-white font-bold hover:text-red-500 my-4" href="">Home</Link>
            <Link href="/projects" className={`text-2xl text-white font-bold hover:text-red-500 my-4 link ${pathname === '/projects' ? 'active' : ''}`} >Projects</Link>


            </div>
        </div>
    );
}

export default function FullScreenNavBar() {
const [open, setOpen] = useState(false)
const pathname = usePathname()
return(
    <nav>

        <div className="w-full fixed z-20 top-0 left-0">
        <div className="max-w-screen-xl navbar flex items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center w-11/12 flex-1 justify-start p-4 md:order-2">
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">M.</span>
  </a>
            <div className=" items-center justify-between hidden w-full md:flex md:w-auto md:order-2">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 ">
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-gray-200 text-2xl" aria-current="page">
            Projects
        </a>
      </li>
    </ul>
            </div>
            {/* ^Hamburguer */}
    <div className="w-11/12 flex flex-1 justify-end items-center p-4 md:order-2 fixed:false" >
<div className="group z-50 relative w-16 h-6 cursor-pointer flex-col justify-between items-center flex" onClick={() => setOpen(!open)}>
    {/* {Hamburguer btn} */}
    <span className={`h-1 w-full bg-gray-300 rounded-lg group-hover:text-red-500 cursor-pointer transform transition duration-300 ease-in-out ${open ? "rotate-45 bg-white translate-y-2.5": ""}`}></span>
    <span className={`h-1 w-9 bg-gray-300 rounded-lg group-hover:text-red-500 cursor-pointer transform transition duration-300 ease-in-out  ${open ? "w-10 bg-white": "w-full"}`}></span>
    <span className={`h-1 w-full bg-gray-300 rounded-lg group-hover:text-red-500 cursor-pointer transform transition duration-300 ease-in-out ${open ? "w-0 bg-white " : "w-full"}`}></span>
</div>
 </div>
          {/* ^Hamburguer */}
            </div>
        </div>
        <MobileNav  open={open} setOpen={setOpen}/>

     

    </nav>
)
}