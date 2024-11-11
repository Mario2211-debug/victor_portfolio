import Head from "next/head";

export default function Projects() {
  const projects = [
    {
      timeframe: "JUL 2024 - PRESENT",
      employmentType: "SELF EMPLOYER",
      role: "Junior Fullstack Developer",
      company: null,
      name: "Blog and Portfolio Website",
      type: "Web Development",
      technologies: ["Next.js", "NodeJS", "MongoDB", "Tailwind CSS", "Vercel"],
      description:
        "A personal portfolio website to showcase my projects and skills.",
    },
    {
      timeframe: "AGU 2024 - PRESENT",
      employmentType: "FULL TIME",
      role: "Junior Frontend Developer",
      company: "Rosa Cosméticos",
      name: "E-commerce Platform",
      type: "Full-Stack Development",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      description:
        "An online platform for buying and selling beauty products with integrated payment gateways.",
    },
    {
      timeframe: "SEP 2023 - OCT 2023",
      employmentType: "FULL TIME",
      role: "Junior Frontend Developer",
      company: "Sysnovare",
      name: "Mobile Banking App",
      type: "Mobile Development",
      technologies: ["Flutter", "Firebase", "Dart"],
      description:
        "A secure mobile banking application for managing transactions and checking balances.",
    },
    {
      timeframe: "OCT 2020 - SEP 2023",
      employmentType: "FULL TIME",
      role: "Junior Frontend Developer",
      company: "CISP",
      name: "AI Chatbot",
      type: "Machine Learning",
      technologies: ["Python", "TensorFlow", "NLP"],
      description: "An AI-driven chatbot for customer service automation.",
    },
    {
      timeframe: "OCT 2019 - SEP 2020",
      employmentType: "FULL TIME",
      role: "Junior Frontend Developer",
      company: "Sacutombi",
      name: "Task Management Tool",
      type: "Productivity Tool",
      technologies: ["Vue.js", "Node.js", "MySQL"],
      description:
        "A tool to manage tasks, set deadlines, and track progress for teams.",
    },
  ];

  return (
    <div className="min-h-screen text-white">
      <header className="py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold project-element">Projects</h1>
          <p className="mt-2 text-lg text-gray-400">
            A showcase of my work and contributions
          </p>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {projects.map((project, index) => (
              <div
                key={index}
                className="flex p-8 flex-col md:flex-row justify-between blur-cover"
              >
                {/* Timeframe and Employment Type */}
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <p className="text-gray-400">{project.timeframe}</p>
                  <p className="text-sm text-gray-500 uppercase">
                    {project.employmentType}
                  </p>
                </div>

                {/* Project Details */}
                <div className="md:w-3/4">
                  <h2 className="text-2xl project-element font-semibold mb-1">
                    {project.name} {/* Display the project name */}
                  </h2>
                  <p className="text-lg text-gray-400 mb-2">
                    {project.role} at {project.company}
                  </p>{" "}
                  {/* Display the role and company */}
                  <div className="flex flex-wrap gap-2 my-4">
                    {project.technologies &&
                      project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="p-2 home-element blur-cover text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                  <p className="project-element">{project.description}</p>
                  {project.type && (
                    <p className="mt-2 text-gray-400">{project.type}</p>
                  )}{" "}
                  {/* Display the project type if available */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
