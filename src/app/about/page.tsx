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
     Full Stack Developer with experience in React and NodeJS-based web projects, process automation and 
      systems integration. Familiar with tools and technologies such as Next.js, Node.js, MongoDB and MySQL, 
      Tailwind CSS and React to develop functional, scalable and user-oriented applications.  
    `,
    WorkExperience: [
      {
        position: "Fullstack Developer",
        company: "Blog and Portfolio Website",
        period: "JUL 2024 – Presente",
        responsibilities: [
          "Responsible for designing and building Front-End and Back-End, using Next.js, NodeJS and MongoDB. Its purpose is to showcase my skills, projects, and technical articles",
          " The Front project is hosted and maintained on Vercel and the Back is hosted on Cloudflare as it better adapts to the needs of the project itself"
        ]
      },

      {
        position: "Front End Developer",
        company: "Simple Radio Web App",
        period: "OCT 2024 – Presente",
        responsibilities: [
          "A simple Web application to listen to and follow more than 6000 stream  radio stations around the world. "]
      },

      {
        position: "Fullstack Developer",
        company: "Rosa Cosméticos",
        period: "AUG 2024 – Presente",
        responsibilities: [
          "Project currently under development, where I am responsible for developing a complete booking platform for beauty services using React, Node.js and MySQL.",
          "Integrated with Google authentication system and its own Back-End"]
      },
      // Adicione mais experiências conforme necessário
    ],
    Education: [
      {
        institution: "UNIVERSIDADE PORTUCALENSE",
        degree: "Master's Degree in Computer Engineering and Computing",
        period: "2024 — Current"
      },
      {
        institution: "ISTITUTO SUPERIOR KALANDULA DE ANGOLA",
        degree: "Bachelor's Degree in Computer Engineering",
        period: "2016 — 2021"
      },
      {
        institution: "COLÉGIO MUNDO NOVO (ALDA LARA)",
        degree: "Intermediate Computer Technician",
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
      "React Components"
    ]
  };

  return (
    <div ref={targetRef} className="justify-self-center max-w-full flex-1">
      <div className="container block">
        <div className="gap-6 px-4 py-20 md:gap-8 lg:flex-row">
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
              <h1 className="text-[22px] font-bold px-4 pb-3 pt-5">About</h1>
              <p className="cv-element m-3 text-justify text-sm font-normal leading-loose">
                {Person.Profile}
              </p>
            </div>

            {/* Work Experience */}
            <div className="flex-[3]">
              <h1 className="text-[22px] font-bold px-4 pb-3 pt-5">Practical Experience</h1>
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

      </div>
    </div>
  );
}
