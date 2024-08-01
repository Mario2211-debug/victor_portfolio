import Image from "next/image";
import likedin from "../app/icons/linkedin-logo-fill-svgrepo-com.svg";
import mail from "../app/icons/mail-svgrepo-com.svg";
import github from "../app/icons/icons8-github-512.svg";
import Link from "next/link";

export default function ContactMe() {
  return (
    <footer className="flex justify-center">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <footer className="flex flex-col gap-6 px-5 pt-20 pb-8 text-center @container">
          <div className="flex footer-element flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
            <a
              className="text-base footer-element font-normal leading-normal min-w-40"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-base font-normal leading-normal min-w-40"
              href="#"
            >
              Terms of Service
            </a>
          </div>
          <p className="text-base footer-element  font-normal leading-normal">
            Made by Mário Afonso
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[#999999]">
            <Link href={"https://linkedin.com/in/mario-afonso-018107141"}>
              <span className="inline-flex">
                <Image src={likedin} alt="Linkedin" width={25} height={25} />
              </span>
            </Link>

            <Link href={"https://github.com/Mario2211-debug"}>
              <span className="inline-flex">
                <Image src={github} alt="Github" width={25} height={25} />
              </span>
            </Link>

            <Link href={"https://github.com/Mario2211-debug"}>
              <span className="inline-flex">
                <Image src={mail} alt="Mail" width={25} height={25} />
              </span>
            </Link>
          </div>
          <p className="p-2 footer-element ">©️ 2024 | Blog</p>
        </footer>
      </div>
    </footer>
  );
}
