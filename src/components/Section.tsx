import Brands from "../app/util/Brands";
export default function PreSection() {
  return (
    <div className="text-center">
      <div className="md:pt-56 mobile:px-2 mobile:py-20">
        <div className="inline text-center md:w-6 w-full md:flex-1">
          <span className="text-white inline-block md:w-2/3 w-full">
            <h1 className="animate-typing  md:text-3xl font-light inline-block overflow-hidden whitespace-nowrap border-r-4 border-r-white mobile:text-sm mobile:justify-center mobile:inline-block">
              Hi, I am Mário Afonso
            </h1>
          </span>
          <h1 className="text-white text mobile:text-5xl font-Bellefair p-4 md:text-7xl font-bold">
            Full Stack Dev
          </h1>
          <div className="inline-block p outline-1 outline outline-slate-700 rounded-sm bg-opacity-50 backdrop-blur-md">
            <Brands />
          </div>
        </div>
      </div>
    </div>
  );
}
