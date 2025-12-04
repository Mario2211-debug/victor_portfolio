"use client";

import Head from "next/head";
import { useState } from "react";
export default function Projects() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };
  const projects = [
    {
      name: "Portfolio Website",
      type: "Web Development",
      technologies: ["Next.js", "Tailwind CSS", "Vercel"],
      description:
        "A personal portfolio website to showcase my projects and skills.",
    },
    {
      name: "E-commerce Platform",
      type: "Full-Stack Development",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      description:
        "An online platform for buying and selling products with integrated payment gateways.",
    },
    {
      name: "Mobile Banking App",
      type: "Mobile Development",
      technologies: ["Flutter", "Firebase", "Dart"],
      description:
        "A secure mobile banking application for managing transactions and checking balances.",
    },
    {
      name: "AI Chatbot",
      type: "Machine Learning",
      technologies: ["Python", "TensorFlow", "NLP"],
      description: "An AI-driven chatbot for customer service automation.",
    },
    {
      name: "Task Management Tool",
      type: "Productivity Tool",
      technologies: ["Vue.js", "Node.js", "MySQL"],
      description:
        "A tool to manage tasks, set deadlines, and track progress for teams.",
    },
  ];

  return (
    <>
      <Head>
        <title>Projects | Mário Victor Quarta Afonso</title>
      </Head>

      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-lg">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left px-6 py-4 font-semibold text-xl bg-gray-700 hover:bg-gray-600 rounded-t-lg focus:outline-none"
              >
                {project.name}
              </button>
              {openAccordion === index && (
                <div className="px-6 py-4">
                  <p className="text-gray-400 mb-2">
                    <strong>Type:</strong> {project.type}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-300">{project.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
