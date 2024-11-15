import Item from "@/components/Item";
import { title } from "process";
import project from "@/app/radioService/projects.json";

export default function Projects() {
  const renderBrieflyText = () => {
    return (
      <>
        <div className="layout-content-container flex flex-col max-w-[768px] flex-1">
          <div className="grid grid-cols-1 tablet:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4">
            <div className="flex flex-col gap-4 pb-3">
              <div className="w-full bg-center bg-no-repeat bg-cover bg-black rounded-xl aspect-square object-cover">
                Imagem do projeto
              </div>
              <div>
                <p className=" text-base font-medium leading-normal">
                  Nome do Projeto
                </p>
                <p className="text-[#999999] text-sm font-normal leading-normal">
                  Projecto escrito em react code, para auxiliar na adaptação de
                  um sistema de...{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderProjects = () => {
    return (
      <>
        return (
        <>
          <h1 className=" flex items-center font-sans">PROJETOS</h1>

          <div className="grid grid-cols-3 gap-4 content-center">
            <Item
              link={
                "https://www.andacademy.com/resources/wp-content/uploads/2023/09/Inside8-2.webp"
              }
              alt={title}
              title="Meu primeiro projeto"
              description={"Arroz com feijão"}
              price={456}
              src="https://www.andacademy.com/resources/wp-content/uploads/2023/09/Inside8-2.webp"
            ></Item>
            <Item
              link={
                "https://www.andacademy.com/resources/wp-content/uploads/2023/09/Inside8-2.webp"
              }
              alt={title}
              title="Meu primeiro projeto"
              description={"Arroz com feijão"}
              price={456}
              src="https://www.andacademy.com/resources/wp-content/uploads/2023/09/Inside8-2.webp"
            ></Item>
            <Item
              link={
                "https://www.andacademy.com/resources/wp-content/uploads/2023/09/Inside8-2.webp"
              }
              alt={title}
              title="Meu primeiro projeto"
              description={"Arroz com feijão"}
              price={456}
              src="https://www.andacademy.com/resources/wp-content/uploads/2023/09/Inside8-2.webp"
            ></Item>
            <Item
              link={
                "https://www.andacademy.com/resources/wp-content/uploads/2023/09/Inside8-2.webp"
              }
              alt={title}
              title="Meu primeiro projeto"
              description={"Arroz com feijão"}
              price={456}
              src="https://www.andacademy.com/resources/wp-content/uploads/2023/09/Inside8-2.webp"
            ></Item>
            <Item
              link={
                "https://www.andacademy.com/resources/wp-content/uploads/2023/09/Inside8-2.webp"
              }
              alt={title}
              title="Meu primeiro projeto"
              description={"Arroz com feijão"}
              price={456}
              src="https://www.andacademy.com/resources/wp-content/uploads/2023/09/Inside8-2.webp"
            ></Item>
            <Item
              link={
                "https://www.andacademy.com/resources/wp-content/uploads/2023/09/Inside8-2.webp"
              }
              alt={title}
              title="Meu primeiro projeto"
              description={"Arroz com feijão"}
              price={456}
              src="https://www.andacademy.com/resources/wp-content/uploads/2023/09/Inside8-2.webp"
            ></Item>
          </div>
        </>
        );
      </>
    );
  };

  return !project.projects ? renderProjects() : renderBrieflyText();
}
