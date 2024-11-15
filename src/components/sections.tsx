import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ArrowSmRightIcon, BookOpenIcon, ArrowUpIcon } from "@heroicons/react/outline";
import Post from "@/components/Blog/Post";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import axios from "axios";
import data from "@/app/radioService/data.json";
import projectData from '@/app/radioService/projects.json'
import { InformationCircleIcon } from "@heroicons/react/solid";


interface Post {
    _id: string;
    title?: string;
    content?: string;
    description?: string;
    imageUrl?: string;
    category?: string;
    date?: Date | string;
    readers?: string;
    className?: string;
    imgclassName?: string;
    src: StaticImageData | string;
    alt: string;
}

interface OfflineData {
    posts: Post[][];
}

// Variantes de animação compartilhadas
const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 }
    }
};

const cardHoverVariants = {
    hover: {
        scale: 1.02,
        opacity: 0.95,
        filter: "brightness(1.1)",
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    }
};

export const About = () => {
    const { theme } = useTheme()

    return (
        <>
            <>
                <section className="flex flex-col items-center">
                    <div className="grid gap-4 justify-center w-[350px] mobile:w-[400px] max-h-[425px]  overflow-y-auto transition-all duration-1000 ease-in-out hide-scrollbar">
                        <motion.div
                            className="p-4 place-self-center justify-between blur-cover"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            whileHover={{
                                opacity: 0.9,
                                filter: `${theme === 'light' ? 'brightness(-2.75)' : 'brightness(2.75)'}`,
                                x: 1,
                                //rotate: 0.5,
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)"
                            }}
                        >
                            {/* About Me Content */}
                            <div className="w-fit text-justify tracking-wide whitespace-normal track">
                                <div className="gap-2">
                                    <p className="text-sm tracking-wide leading-6 end pb-2 [text-align-last:end] ">
                                        Desenvolvedor Full Stack com experiência em projetos web baseados em React e NodeJS, automação de processos e integração de sistemas.
                                        Familiarizado com ferramentas e tecnologias como Next.js, Node.js, MongoDB e MySQL, Tailwind CSS e React.
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="py-1 flex px-2 home-element items-center h-0 text-[0.65rem]">
                                            <a href="/about">
                                                <InformationCircleIcon className={`w-5 h-5 animate-pulse rounded-full ${theme === "light" ? 'text-neutral-600' : 'text-white'}`} />

                                            </a>
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 float-right">
                                        <span className="py-1 px-2 home-element  text-[0.65rem] text-gray-500">Developer</span>
                                        <span className="py-1 px-2 home-element  text-[0.65rem] text-gray-500">Database</span>
                                        <span className="py-1 px-2 home-element  text-[0.65rem] text-gray-500">UI/UX</span>
                                        <span className="py-1 px-2 home-element  text-[0.65rem] text-gray-500">APIs</span>

                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </>

        </>
    )
}

export const Projects = () => {
    const { theme } = useTheme()

    const gradientBorder = theme === "light"
        ? "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
        : "bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950";

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="grid gap-4 justify-center w-[350px] md:w-[400px] desktop:h-[400px] h-[55vh] overflow-y-auto transition-all duration-1000 ease-in-out hide-scrollbar pb-16 relative">
                    {projectData.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="p-4 place-self-center justify-between blur-cover"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{
                                opacity: 0.9,
                                rotate: 0.5,
                            }}
                        >
                            <div className="w-fit">
                                <div className="gap-2">
                                    <span className="flex justify-between">
                                        <p className="text-gray-400 text-[0.65rem] tracking-wide">{project.timeframe}</p>
                                        {project.type && (
                                            <a href={project.link}>
                                                <p className="text-[0.65rem] tracking-wide flex text-gray-400">
                                                    {project.type}
                                                    <motion.button
                                                        whileHover={{ rotate: 0 }}
                                                        initial={{ rotate: -45 }}
                                                        className=""
                                                    >
                                                        <ArrowSmRightIcon className="h-3.5 w-3.5 transition-transform" />
                                                    </motion.button>
                                                </p>
                                            </a>
                                        )}
                                    </span>
                                    <h2 className="pt-2 text-md project-element font-semibold">{project.name}</h2>
                                </div>
                                <p className="text-xs w-fit flex text-gray-400">
                                    {project.role} at {project.company}
                                </p>
                                <p className="project-element text-sm text-justify font-thin tracking-wide py-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2 float-right">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span key={techIndex} className="p-1 home-element text-[0.65rem]">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                {/* Gradiente de desvanecimento no final para suavizar a rolagem */}
                <div className="absolute bottom-0 left-0 w-full h-16 backdrop-blur-sm"></div>

            </div>

        </>
    )
}

export const Contacts = () => {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log("Fetching posts...");
                const res = await axios.get<Post[]>(
                    `${process.env.NEXT_PUBLIC_API_URL}/blog`
                );
                const sortedPosts = res.data.sort((a: Post, b: Post) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                });
                console.log("Posts fetched:", res.data);
                setPosts(sortedPosts);
            } catch (error) {
                console.error("Erro ao buscar posts: ", error);
                // Fallback to offline data if API call fails
                const offlinePostArray = (data as OfflineData).posts.flat();
                setPosts(offlinePostArray);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="">
            <div className="flex w-[350px] md:w-[400px] flex-col gap-4 ">
                {posts.map((blog) => (
                    <motion.div
                        key={blog._id}
                        className="flex items-center justify-between border blur-cover p-2 "
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{
                            opacity: 0.9,
                            //background: "linear-gradient(135deg, rgba(255, 92, 88, 0.8), rgba(88, 185, 255, 0.8), rgba(88, 255, 163, 0.8))",
                            //filter: "blur(4px)",
                            // x: 2, 
                            filter: "brightness(2.75)",
                            rotate: -0.5,
                            //y: -2,
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)"
                        }}>

                        <Link legacyBehavior href={`blog/${blog._id}`} passHref>

                            <a className="text-base font-medium flex items-center gap-3">
                                <BookOpenIcon className="h-5 w-5  text-gray-400 group-hover:text-blue-400" />
                                <span className="">  {blog.title}</span>
                            </a>
                        </Link>
                        <ArrowSmRightIcon className="w-5 h-5 text-gray-500 hover:text-blue-500 hover:-rotate-1" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}