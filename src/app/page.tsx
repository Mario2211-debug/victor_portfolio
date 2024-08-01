import PreSection from "../components/Home/Section";
import Projects from "./projects/page";
import Blob from "@/components/blob";

export default function Home() {
  return (
    <>
      <section>
        <PreSection />
        <div className="flex justify-center p-1">
          <span className="absolute w-3/4 border-t border-gray-500"></span>
        </div>
        <Blob />

        <Projects />
        <div className="flex justify-center p-4">
          <span className="absolute w-3/4 border-t border-gray-500"></span>
        </div>
      </section>
    </>
  );
}
