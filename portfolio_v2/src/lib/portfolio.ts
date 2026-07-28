export const PORTFOLIO_API =
  "https://portfoliohub-uzjb.onrender.com/api/public/marioafonso1997";

/**
 * Canal de contacto que não depende da API.
 * Todo o contacto do site vem do perfil — exceto no único caso em que o perfil
 * não chega: quando a API está em baixo. É precisamente aí que o estado de erro
 * precisa de ter algo para oferecer, por isso este valor é estático.
 */
export const FALLBACK_CONTACT_URL = "https://www.linkedin.com/in/mario-afonso-018107141";

export interface PortfolioUser {
  name: string;
  email: string;
  avatarUrl?: string;
  username: string;
}
export interface PortfolioProfile {
  title: string;
  summary: string;
  location: string;
  contact: { linkedin?: string; github?: string; website?: string; email?: string };
  theme?: string;
}
export interface Experience {
  _id: string;
  company: string;
  position: string;
  context?: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  technologies?: string[];
  responsibilities?: string[];
}
export interface Education {
  _id: string;
  institution: string;
  degree: string;
  description?: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  coursework?: string[];
  type?: string;
}
export interface Skill {
  _id: string;
  technology: string;
  level: number;
  category: string;
  type?: string;
}
export interface ProjectItem {
  name: string;
  description: string;
}
export interface Project {
  _id: string;
  name: string;
  description: string;
  category?: string;
  employmentType?: string;
  role?: string;
  course?: string;
  type?: string;
  technologies: string[];
  tools?: string[];
  context?: string;
  link?: string;
  items?: ProjectItem[];
  readme?: string;
  isCurrent?: boolean;
  startDate?: string;
  endDate?: string | null;
  source?: string;
}
export interface Post {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  content: string;
  imageUrl?: string;
  category?: string;
  published?: boolean;
  status?: string;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface Portfolio {
  user: PortfolioUser;
  profile: PortfolioProfile;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  languages?: { _id: string; name: string; level?: string }[];
  posts?: Post[];
}

/** Published posts, newest first. */
export function publishedPosts(portfolio?: Portfolio | null): Post[] {
  const posts = portfolio?.posts ?? [];
  return posts
    .filter((p) => p && p.published !== false && !!p.slug)
    .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());
}

export function formatPostDate(d?: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export async function fetchPortfolio(): Promise<Portfolio> {
  const res = await fetch(PORTFOLIO_API);
  if (!res.ok) throw new Error(`Portfolio API ${res.status}`);
  const json = await res.json();
  if (!json?.success) throw new Error("Portfolio API: malformed response");
  return json.data as Portfolio;
}

export const portfolioQueryOptions = () => ({
  queryKey: ["portfolio"] as const,
  queryFn: fetchPortfolio,
  staleTime: 5 * 60 * 1000,
});

export function formatRange(start?: string, end?: string | null, current?: boolean) {
  const f = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const s = start ? f(start) : "";
  const e = current ? "Present" : end ? f(end) : "";
  return [s, e].filter(Boolean).join(" — ");
}

export function sanitizeUrl(url?: string) {
  if (!url) return undefined;
  return url.replace("https://https//", "https://");
}

/** URL-friendly slug derived from a project name, e.g. for /projects/:slug routes. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findProjectBySlug(portfolio?: Portfolio | null, slug?: string) {
  if (!portfolio || !slug) return undefined;
  return portfolio.projects.find((p) => slugify(p.name) === slug);
}
