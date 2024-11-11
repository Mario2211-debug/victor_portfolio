'use client'
import { useRef } from 'react';
import { usePDF } from 'react-to-pdf';
import { useState, useEffect } from 'react';
import { format } from "date-fns";

export default function AboutMe() {


  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
  const [time, setTime] = useState(format(new Date(), "dd/MM/yyyy"));

  useEffect(() => {
    const timer = setInterval(() => setTime(format(new Date(), "dd/MM/yyyy")), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);


  const Person = {
    PersonalData: {
      name: "Mário Victor Quarta Afonso",
      age: "", // Atualize com sua idade, se desejar
      contact: {
        email: "seuemail@email.com",
        phone: "seu telefone",
        linkedin: "https://linkedin.com/in/mario-afonso-018107141",
        github: "https://github.com/Mario2211-debug"
      }
    },
    Profile: `
      Desenvolvedor Full Stack com experiência em projetos web baseados em React e NodeJS,
      automação de processos e integração de sistemas. Familiarizado com ferramentas e tecnologias
      como Next.js, Node.js, MongoDB e MySQL, Tailwind CSS e React para desenvolver aplicações funcionais, escaláveis
      e orientadas ao usuário. 
    `,
    WorkExperience: [
      {
        position: "Junior Fullstack Developer",
        company: "Blog and Portfolio Website",
        period: "Jul 2024 – Presente",
        responsibilities: [
          "Responsável por desenhar e construir o Front-End e o Back-End, utilizando Next.js, NodeJS e MongoDB. Tem como propósito mostrar as minhas habilidades, projetos, e artigos técnicos.",
          "Algumas ferramentas importantes usadas como Tailwind CSS e Framer para melhorar o visual.",
          "O projecto Front está hospedado e mantido na Vercel e o Back está hospedado no Cloudflare por se adaptar melhor as necessidades do projeto em si."
        ]
      },
      {
        position: "Junior Fullstack Developer",
        company: "Rosa Cosméticos",
        period: "Agu 2024 – Presente",
        responsibilities: [
          "Projecto atualmente em curso, onde sou responsável por desenvolver uma plataforma de booking completa para serviços de beleza utilizando React, Node.js e MySQL.",
          "Integrado com sistema de autenticação do google e o Back-End próprio.",
          "Está em curso a segunda fase do projecto onde será desenvolvida a aplicação móvel."
        ]
      },
      // Adicione mais experiências conforme necessário
    ],
    Education: [
      {
        institution: "UNIVERSIDADE PORTUCALENSE",
        degree: "Mestrado em Engenharia Informática e Computação",
        period: "2024 — Presente"
      },
      {
        institution: "ISTITUTO SUPERIOR KALANDULA DE ANGOLA",
        degree: "Licenciado Em Engenharia Informática",
        period: "2016 — 2021"
      },
      {
        institution: "COLÉGIO MUNDO NOVO (ALDA LARA)",
        degree: "Técnico Médio de Informática",
        period: "2013 — 2015"
      }
    ],
    Goals: [
      "Obter a licenciatura",
      "Primeiro emprego na área de tecnologias",
      "Aprender um novo idioma",
      "Primeiro emprego como programador",
      "Especialização em engenharia de software"
    ],
    Articles: [
      "Artigo 1 - Título do Artigo sobre Tecnologias Web",
      "Artigo 2 - Título sobre Desenvolvimento Frontend Moderno",
      "Artigo 3 - Título sobre Integração com APIs RESTful"
    ]
  };

  return (
    <div ref={targetRef} className="justify-self-center max-w-full flex-1">
      <div className="container block">
        <div className="gap-6 px-4 py-10 md:gap-8 lg:flex-row">
          <div className=" gap-6 @[480px]:min-w-[400px] @[480px]:gap-8 @[864px]:justify-center">
            <div className=" gap-2 text-left">
              <h1 className="text-5xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl">
                {Person.PersonalData.name}
              </h1>
              <h2 className="text-sm font-normal tracking-[0.5rem] leading-loose @[480px]:text-base">
                COMPUTER ENGINEER
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className='lg:flex gap-4'>

        <div className='sm:max-w-[540px] justify-between'>
          <div className="flex flex-col" >
            {/* Profile */}
            <div className="flex-[3]">
              <h1 className="text-[22px] font-bold px-4 pb-3 pt-5">Professional Profile</h1>
              <p className="cv-element m-3 text-justify text-sm font-normal leading-loose">
                {Person.Profile}
              </p>
            </div>

            {/* Work Experience */}
            <div className="flex-[3]">
              <h1 className="text-[22px] font-bold px-4 pb-3 pt-5">Work Experience</h1>
              {Person.WorkExperience.map((job, index) => (
                <div key={index} className="p-4 text-justify">
                  <h2 className="text-base font-bold  mb-2">{job.position} | {job.company}</h2>
                  <b className='text-sm'>{job.period}</b>
                  <ul className="list-disc pl-5 text-sm leading-loose">
                    {job.responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          {/* Education */}
          <div className="flex-[1.5]">
            <h1 className="text-[22px] font-bold px-4 pb-3 pt-5">Education</h1>
            {Person.Education.map((edu, index) => (
              <div key={index} className="p-4">
                <h2 className="text-base font-bold">{edu.institution}</h2>
                <p className="text-sm leading-loose tracking-wide">{edu.degree} <br /> {edu.period}</p>
              </div>
            ))}
          </div>

          {/* Goals
          <div className="flex-[1.5]">
            <h1 className="text-[22px] font-bold px-4 pb-3 pt-5">Goals</h1>
            <ul className="list-disc pl-5 text-sm leading-loose">
              {Person.Goals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div> */}

          {/* Articles */}
          <div className="flex-[1.5]">
            <h1 className="text-[22px] font-bold px-4 pb-3 pt-5">Articles</h1>
            <ul className="list-disc pl-5 text-sm leading-loose">
              {Person.Articles.map((article, index) => (
                <li key={index}>{article}</li>
              ))}
            </ul>
          </div>

          {/* Find Me Online */}
          <div className="flex-[1.5]">
            <h1 className="text-[22px] font-bold px-4 pb-3 pt-5">Find Me Online</h1>
            <p className="text-base font-bold">
              <a href={Person.PersonalData.contact.linkedin}>LinkedIn</a> |{" "}
              <a href={Person.PersonalData.contact.github}>GitHub</a>
            </p>
          </div>
        </div>
      </div>

      <div className='flex p-4 justify-between'>
        <span>Based in porto</span>
        <span>{time}</span>
      </div>
    </div>
  );
}
