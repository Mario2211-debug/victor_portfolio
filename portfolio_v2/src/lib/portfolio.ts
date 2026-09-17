import { PORTFOLIO_SNAPSHOT } from "@/data/snapshot";
import { copy } from "@/lib/copy";

export const PORTFOLIO_API =
  "https://portfoliohub-uzjb.onrender.com/api/public/marioafonso1997";

/**
 * Canal de contacto que não depende da API.
 * Todo o contacto do site vem do perfil — exceto no único caso em que o perfil
 * não chega: quando a API está em baixo. É precisamente aí que o estado de erro
 * precisa de ter algo para oferecer, por isso este valor é estático.
 */
export const FALLBACK_CONTACT_URL = "https://www.linkedin.com/in/mario-afonso-018107141";

/**
 * Foto de perfil servida pelo próprio site, não pela API (o `avatarUrl` de lá
 * está vazio). É um recorte quadrado da cara a 180px — 3× os 60px do avatar —
 * tirado de `public/profile.jpg`: poucos KB em vez de 209 KB para uma imagem de 60px.
 */
export const PROFILE_PHOTO_URL = "/profile-avatar.jpg";

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
  company?: string | null;
  course?: string | null;
  type?: string;
  technologies: string[];
  tools?: string[];
  context?: string;
  link?: string;
  githubUrl?: string;
  items?: (ProjectItem | string)[];
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
  /**
   * O instantâneo do build entra como dados iniciais: a primeira frame já tem
   * conteúdo real, mesmo que a API esteja a arrancar a frio ou em baixo.
   *
   * `initialDataUpdatedAt: 0` marca-o como vencido à nascença — sem isto o
   * react-query dá-lo-ia por fresco durante o `staleTime` e o site ficaria cinco
   * minutos a mostrar o build em vez do que a API tem agora. Assim pinta do
   * instantâneo e revalida em segundo plano na mesma montagem.
   */
  initialData: PORTFOLIO_SNAPSHOT,
  initialDataUpdatedAt: 0,
});

export function formatRange(start?: string, end?: string | null, current?: boolean) {
  const f = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const s = start ? f(start) : "";
  const e = current ? copy.present : end ? f(end) : "";
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

/**
 * O schema da API guarda `items` como strings ("Título — descrição"); os
 * projetos mais antigos têm objetos. O site lê os dois da mesma forma.
 */
export function projectItems(project: Project): ProjectItem[] {
  return (project.items ?? []).map((it) => {
    if (typeof it !== "string") return it;
    const [name, ...rest] = it.split(" — ");
    return { name, description: rest.join(" — ") };
  });
}

export type ProjectGroupKind = "clients" | "products" | "academic";
export interface ProjectGroup {
  key: string;
  kind: ProjectGroupKind;
  /** Só nos grupos académicos: o nome do curso, que vem da API. */
  label?: string;
  projects: Project[];
}

const CLIENT_TYPES = new Set(["FREELANCE", "FULL TIME", "PART TIME"]);
const KIND_ORDER: ProjectGroupKind[] = ["clients", "products", "academic"];

/** O contexto em que o projeto foi feito — é por ele que a Home agrupa. */
function groupOf(p: Project): Omit<ProjectGroup, "projects"> {
  const type = p.employmentType ?? "";
  if (CLIENT_TYPES.has(type)) return { key: "clients", kind: "clients" };
  // `STUDENT PROJECT` é um valor anterior ao enum da API; ainda há dados com ele.
  if (p.course || type === "ACADEMIC PROJECT" || type === "STUDENT PROJECT") {
    return { key: `course:${p.course ?? ""}`, kind: "academic", label: p.course ?? undefined };
  }
  return { key: "products", kind: "products" };
}

/** Em curso primeiro, depois o mais recente. O sort é estável: empates mantêm a ordem da API. */
function byRecency(a: Project, b: Project) {
  const current = Number(!!b.isCurrent) - Number(!!a.isCurrent);
  if (current !== 0) return current;
  return new Date(b.startDate ?? 0).getTime() - new Date(a.startDate ?? 0).getTime();
}

/**
 * Clientes, depois produtos próprios, depois um grupo por curso — os cursos
 * ordenados pelo projeto mais recente de cada um.
 */
export function groupProjects(projects: Project[]): ProjectGroup[] {
  const groups = new Map<string, ProjectGroup>();
  for (const p of projects) {
    const g = groupOf(p);
    const group = groups.get(g.key) ?? { ...g, projects: [] };
    group.projects.push(p);
    groups.set(g.key, group);
  }
  const sorted = [...groups.values()].map((g) => ({ ...g, projects: [...g.projects].sort(byRecency) }));
  return sorted.sort(
    (a, b) =>
      KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind) ||
      byRecency(a.projects[0], b.projects[0]),
  );
}

export function findProjectBySlug(portfolio?: Portfolio | null, slug?: string) {
  if (!portfolio || !slug) return undefined;
  return portfolio.projects.find((p) => slugify(p.name) === slug);
}
