import PreSection from "../components/Section";
import Projects from "./projects/id/page";
import Blob from "@/components/blob";

export default function Home() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <PreSection />
        <div className="flex justify-center p-2">
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
