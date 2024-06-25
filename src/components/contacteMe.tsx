import Image from "next/image";
import likedin from "../app/icons/linkedin-logo-fill-svgrepo-com.svg";
import mail from "../app/icons/mail-svgrepo-com.svg";
import github from "../app/icons/icons8-github-512.svg";

export default function ContactMe() {
  return (
    <div className="items-center justify-center text-center ">
      <div className="grid p-4 ">
        <div className="inline-grid">
          <span className="text-center text-white text-3xl">M.</span>
        </div>

        <div className="flex justify-center p-2">
          <span className="inline-flex p-2 invert">
            <Image src={likedin} alt="Linkedin" width={30} height={30} />
          </span>
          <span className="inline-flex p-2 invert">
            <Image src={github} alt="Github" width={30} height={30} />
          </span>
          <span className="inline-flex p-2 invert">
            <Image src={mail} alt="Mail" width={30} height={30} />
          </span>
        </div>
        <div className="items-center">
          <span className="text-center p-2 text-white">
            Made by Mário Afonso
          </span>
        </div>
      </div>

      <div className="outline-1 outline outline-slate-900 rounded-sm bg-opacity-50 backdrop-blur-md">
        <div className="p-4 text-gray-500">©️ 2024 | Mário Afonso</div>
      </div>
    </div>
  );
}
