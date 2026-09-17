/**
 * Semeia os projetos do portfólio na API do portfolioHub.
 *
 * A Home lê os projetos da API, e a API é a fonte única — este script não
 * contorna isso, escreve nela. O conteúdo vive em `projects.seed.json`,
 * levantado a partir dos repositórios do GitHub.
 *
 * Idempotente: cada entrada casa com um projeto existente pelo nome (ou pelo
 * `githubUrl`); se casar, atualiza só os campos que mudaram; se não, cria.
 * Correr duas vezes não duplica nada.
 *
 * Uso:
 *   npm run seed:projects                     simulação — não precisa de credenciais
 *   PORTFOLIOHUB_EMAIL=… PORTFOLIOHUB_PASSWORD=… npm run seed:projects -- --apply
 *
 * A password só existe no ambiente de quem corre o script.
 */
import { readFile } from "node:fs/promises";

const BASE = process.env.PORTFOLIOHUB_API ?? "https://portfoliohub-uzjb.onrender.com/api";
const USERNAME = "marioafonso1997";
const SEED = new URL("./projects.seed.json", import.meta.url);

/** Um arranque a frio no Render leva até ~60s: o timeout tem de lhe dar espaço. */
const TIMEOUT_MS = 90_000;
const APPLY = process.argv.includes("--apply");

async function request(path, { method = "GET", token, body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body && JSON.stringify(body),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    throw new Error(`${method} ${path} → ${res.status} ${json.message ?? ""}`.trim());
  }
  return { res, json };
}

async function login() {
  const email = process.env.PORTFOLIOHUB_EMAIL;
  const password = process.env.PORTFOLIOHUB_PASSWORD;
  if (!email || !password) {
    throw new Error("--apply precisa de PORTFOLIOHUB_EMAIL e PORTFOLIOHUB_PASSWORD no ambiente");
  }
  const { res } = await request("/auth/login", { method: "POST", body: { email, password } });
  // O login não devolve o token no corpo, só no cookie `jwt`. O middleware da
  // API aceita-o de volta como Bearer.
  const cookie = res.headers.getSetCookie().find((c) => c.startsWith("jwt="));
  const token = cookie?.slice("jwt=".length).split(";")[0];
  if (!token) throw new Error("o login respondeu sem cookie jwt");
  return token;
}

/** Na simulação lê o portfólio público; ao aplicar, a lista autenticada — que inclui o que não é público. */
async function existingProjects(token) {
  if (!token) {
    const { json } = await request(`/public/${USERNAME}`);
    return json.data?.projects ?? [];
  }
  const { json } = await request("/projects", { token });
  return json.data ?? [];
}

/** As datas voltam da API como ISO completo; o seed escreve só o dia. */
function same(key, seeded, current) {
  if (key.endsWith("Date") && typeof seeded === "string" && typeof current === "string") {
    return seeded.slice(0, 10) === current.slice(0, 10);
  }
  return JSON.stringify(seeded) === JSON.stringify(current ?? null);
}

function changedFields(entry, current) {
  return Object.keys(entry).filter((k) => k !== "name" && !same(k, entry[k], current[k]));
}

async function main() {
  const { projects: seed } = JSON.parse(await readFile(SEED, "utf8"));
  const token = APPLY ? await login() : undefined;
  const existing = await existingProjects(token);

  const byName = new Map(existing.map((p) => [p.name, p]));
  const byRepo = new Map(existing.filter((p) => p.githubUrl).map((p) => [p.githubUrl, p]));

  const creates = [];
  const updates = [];
  for (const entry of seed) {
    const current = byName.get(entry.name) ?? (entry.githubUrl && byRepo.get(entry.githubUrl));
    if (!current) {
      creates.push(entry);
      continue;
    }
    const fields = changedFields(entry, current);
    if (fields.length > 0) {
      updates.push({ entry, current, fields });
    }
  }

  for (const { entry, fields } of updates) console.log(`~ atualizar  ${entry.name}  (${fields.join(", ")})`);
  for (const entry of creates) console.log(`+ criar      ${entry.name}`);
  const untouched = seed.length - creates.length - updates.length;
  console.log(`\n${creates.length} a criar, ${updates.length} a atualizar, ${untouched} sem alterações.`);

  if (!APPLY) {
    console.log("Simulação. Para escrever na API, corre com --apply.");
    return;
  }

  for (const { entry, current, fields } of updates) {
    const body = Object.fromEntries(fields.map((k) => [k, entry[k]]));
    await request(`/projects/${current._id}`, { method: "PUT", token, body });
    console.log(`atualizado  ${entry.name}`);
  }
  // A API ordena por `createdAt` descendente. Criar do fim para o início faz com
  // que, entre projetos com a mesma data, a ordem do site seja a ordem do seed.
  for (const entry of [...creates].reverse()) {
    await request("/projects", { method: "POST", token, body: entry });
    console.log(`criado      ${entry.name}`);
  }
  console.log("\nFeito. `npm run snapshot` traz os projetos novos para o instantâneo do build.");
}

main().catch((err) => {
  console.error(`seed-projects: ${err.message}`);
  process.exitCode = 1;
});
