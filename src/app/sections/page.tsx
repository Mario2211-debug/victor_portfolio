import Brands from "../util/Brands";
export default function PreSection() {
  return (
    <div className="contents md:container justify-between text-center">
      <div className="items-center md:justify-between  md:pt-56 mobile:px-2 mobile:py-20 md:flex ">
        <div className="md:w-6 p-12 w-full md:flex-1">
          <span className="text-white md:w-auto inline-block ">
            <h1 className="inline-block animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white mobile:text-sm mobile:justify-center mobile:inline-block text-2xl">
              Hi, I am Mário Afonso
            </h1>
          </span>
          <h1 className="text-white mobile:text-5xl font-Bellefair pb-2 md:text-7xl font-bold">
            Software
          </h1>
          <h1 className="text-white mobile:text-5xl font-Bellefair pb-2 md:text-7xl font-bold">
            {" "}
            Engineer
          </h1>
          <Brands />
        </div>
        <div className="z-50 blur-3xl border-l-slate-800 border-l-8 opacity-80 justify-around">
          <div className=" animate-blob origin-center">
            <div className="flex-1 absolute space-y-6 h-80 w-70">
              <div className="bg-gradient-to-tl from-gray-950 from-45% via-gray-300 to-blue-950 to-55%"></div>
              <div className="rounded-full w-60 h-60 bg-gradient-to-tr from-green-300 from-50% via-violet-600 via-20% to-blue-900 to-30%"></div>
            </div>
          </div>
        </div>

        <div className="w-full  md:w-6 mobile:flex justify-center md:p-12 flex-1 ">
          <span className="leading-10 items-center md:h-[calc(100vh-490px)] tracking-wide text-white flex align-middle">
            <p className=" mobile:text-xs md:text-base mobile:w-80 mobile:leading-5 md:w-full font-normal md:indent-10">
              I create inclusive, accessible digital products, with experience
              working with startups and enterprise products. I believe in using
              product design as a tool to elevate human interaction with
              technology that scale.
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}
