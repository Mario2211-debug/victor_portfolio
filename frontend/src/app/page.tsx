import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { RecentPosts } from "@/components/home/recent-posts";
import { MarketplacePreview } from "@/components/home/marketplace-preview";
import { Skills } from "@/components/home/skills";
import { CTA } from "@/components/home/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <RecentPosts />
      <MarketplacePreview />
      <Skills />
      <CTA />
    </>
  );
}
