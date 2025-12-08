import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { RecentPosts } from "@/components/home/recent-posts";
import { MarketplacePreview } from "@/components/home/marketplace-preview";
import { Skills } from "@/components/home/skills";
import { CTA } from "@/components/home/cta";
import { projectsAPIPublic } from "@/lib/api-public";

export default async function Home() {
  // Buscar projetos no servidor
  let featuredProjects = [];
  try {
    featuredProjects = await projectsAPIPublic.getAll({ limit: 3 });
  } catch (error) {
    console.error("Error fetching featured projects:", error);
  }

  return (
    <>
      <Hero />
      <FeaturedProjects projects={featuredProjects} />
      <RecentPosts />
      <MarketplacePreview />
      <Skills />
      <CTA />
    </>
  );
}
