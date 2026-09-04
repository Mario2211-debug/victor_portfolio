/**
 * Metadados por rota, depois do build.
 *
 * O site é uma SPA: um único `index.html` servido em todos os endereços. Quem
 * renderiza JavaScript (o Google) acaba por ver o conteúdo certo; quem não
 * renderiza — LinkedIn, WhatsApp, Slack, X, todos os previews de partilha — lê
 * só o `<head>` do HTML servido. Sem isto, partilhar um artigo do blog mostra
 * "Mário Afonso — Software Engineer" e a mesma imagem de sempre.
 *
 * O que este passo faz é escrever um `index.html` por rota, com o mesmo bundle
 * mas o `<head>` correto. Não é pré-renderização do corpo: o conteúdo continua
 * a vir do instantâneo (`scripts/snapshot.mjs`), que já pinta na primeira
 * frame. É a metade que falta — a que os crawlers sem JS conseguem ler.
 *
 * As rotas saem todas do mesmo instantâneo, por isso a lista está sempre
 * alinhada com o que o site mostra.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const SITE = "https://victor-portfolio-sepia.vercel.app";
const AUTHOR = "Mário Afonso";
const OG_IMAGE = `${SITE}/og.png`;

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = path.join(root, "dist");

/**
 * Descrições dos ecrãs que não têm uma no instantâneo. Não são copy visível —
 * nunca aparecem na página, só no `<head>` e nos previews — por isso vivem aqui
 * e não em `src/lib/copy.ts`, que é para o texto que a pessoa lê no ecrã.
 */
const STATIC_DESCRIPTIONS = {
  home: "Fullstack engineer crafting intelligent, scalable systems across web, automation and IoT.",
  blog: "Occasional writing on engineering, design and the craft of shipping.",
};

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Primeiras ~155 letras do corpo, sem a sintaxe do markdown. */
function excerpt(markdown, limit = 155) {
  const text = String(markdown ?? "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function head({ title, description, url, type = "website", image = OG_IMAGE, jsonLd }) {
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="author" content="${esc(AUTHOR)}" />`,
    `<meta name="theme-color" content="#000000" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`,
    ``,
    `<meta property="og:type" content="${esc(type)}" />`,
    `<meta property="og:site_name" content="${esc(AUTHOR)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:alt" content="${esc(title)}" />`,
    ``,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  ];
  if (image === OG_IMAGE) {
    tags.splice(
      tags.indexOf(`<meta property="og:image:alt" content="${esc(title)}" />`),
      0,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
    );
  }
  if (jsonLd) {
    tags.push(``, `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`);
  }
  return tags.map((t) => (t ? `    ${t}` : "")).join("\n");
}

function routesFrom(data) {
  const summary = data.profile?.summary ?? STATIC_DESCRIPTIONS.home;
  const posts = (data.posts ?? []).filter((p) => p?.slug && p.published !== false);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.user?.name ?? AUTHOR,
    url: SITE,
    jobTitle: data.profile?.title,
    description: summary,
    email: data.profile?.contact?.email ? `mailto:${data.profile.contact.email}` : undefined,
    address: data.profile?.location
      ? { "@type": "PostalAddress", addressLocality: data.profile.location }
      : undefined,
    knowsAbout: (data.skills ?? []).map((s) => s.technology),
    sameAs: [data.profile?.contact?.linkedin, data.profile?.contact?.github].filter(Boolean),
  };

  const routes = [
    {
      path: "/",
      title: `${AUTHOR} — Software Engineer`,
      description: STATIC_DESCRIPTIONS.home,
      priority: "1.0",
      jsonLd: person,
    },
    {
      path: "/about",
      title: `About me — ${AUTHOR}`,
      description: summary,
      priority: "0.8",
    },
    {
      path: "/blog",
      title: `Notes and essays — ${AUTHOR}`,
      description: STATIC_DESCRIPTIONS.blog,
      priority: "0.8",
    },
  ];

  for (const post of posts) {
    const description = post.description?.trim() || excerpt(post.content);
    const image = /^https?:\/\//.test(post.imageUrl ?? "") ? post.imageUrl : OG_IMAGE;
    routes.push({
      path: `/blog/${post.slug}`,
      title: `${post.title} — ${AUTHOR}`,
      description,
      type: "article",
      image,
      priority: "0.7",
      lastmod: post.updatedAt ?? post.createdAt,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description,
        image,
        datePublished: post.createdAt,
        dateModified: post.updatedAt ?? post.createdAt,
        author: { "@type": "Person", name: AUTHOR, url: SITE },
        mainEntityOfPage: `${SITE}/blog/${post.slug}`,
      },
    });
  }

  for (const project of data.projects ?? []) {
    if (!project?.name) continue;
    routes.push({
      path: `/projects/${slugify(project.name)}`,
      title: `${project.name} — ${AUTHOR}`,
      description: project.description?.trim() || summary,
      priority: "0.6",
      lastmod: project.endDate ?? project.startDate,
    });
  }

  return routes;
}

function sitemap(routes) {
  const entries = routes
    .map((r) => {
      const lastmod = r.lastmod ? new Date(r.lastmod) : null;
      const date =
        lastmod && !Number.isNaN(lastmod.getTime())
          ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>`
          : "";
      return `  <url><loc>${esc(SITE + r.path)}</loc>${date}<priority>${r.priority}</priority></url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

async function main() {
  const template = await readFile(path.join(dist, "index.html"), "utf8");
  const marks = /( *)<!-- seo:start[\s\S]*?<!-- seo:end -->/;
  if (!marks.test(template)) {
    throw new Error(
      "postbuild: marcadores `seo:start`/`seo:end` não encontrados em dist/index.html",
    );
  }

  const data = JSON.parse(
    await readFile(path.join(root, "src/data/portfolio.snapshot.json"), "utf8"),
  );
  if (!data?.user) {
    console.warn("postbuild: instantâneo vazio — só a Home fica com metadados próprios");
  }

  const routes = routesFrom(data);
  for (const route of routes) {
    const html = template.replace(
      marks,
      head({ ...route, url: SITE + route.path }).replace(/\$/g, "$$$$"),
    );
    const dir = route.path === "/" ? dist : path.join(dist, route.path);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), html);
  }

  await writeFile(path.join(dist, "sitemap.xml"), sitemap(routes));
  console.log(`postbuild: ${routes.length} rotas com <head> próprio + sitemap`);
  for (const r of routes) console.log(`  ${r.path}`);
}

await main();
