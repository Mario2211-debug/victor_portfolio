import PreSection from "../components/Home/Section";
import Projects from "./projects/page";
import Blob from "@/components/blob";

export default function Home() {
  return (
    <>
      <section>
        <PreSection />
        <div className="grid justify-center p-1 mx-5">
          <h1 className="text-3xl p-4 content-around">
            Os meus últimos projetos
          </h1>
          <div className="p-8 inline-flex ">
            {" "}
            <Projects />
          </div>
        </div>
      </section>
    </>
  );
}
