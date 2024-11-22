import Item from "@/components/Item";
import { title } from "process";
import project from "@/app/api/projects.json";

export default function Projects() {
  const renderBrieflyText = () => {
    return (
      <>
        <div className="block font-sans">
          <span className=" inline text-center ">
            <h1 className="text-6xl">Brevemente</h1>
            <p>Os meu projetos aparecerão aqui</p>
          </span>
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
