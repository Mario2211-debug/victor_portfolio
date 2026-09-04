/**
 * Instantâneo de build da API do portfólio.
 *
 * O conteúdo do site vive numa API em free tier que adormece. Sem isto, um
 * arranque a frio é 30s de skeleton — ou, se a API estiver em baixo, um erro em
 * todos os ecrãs ao mesmo tempo. Com isto, o build guarda a última resposta boa
 * dentro do bundle (26 KB), a app pinta instantaneamente a partir dela, e a API
 * passa a ser revalidação em segundo plano em vez de caminho crítico.
 *
 * Falhar aqui nunca parte o build: o instantâneo anterior fica commitado no
 * repositório e é ele que segue para produção. É por isso que o ficheiro JSON
 * é versionado — é o fallback, não um artefacto gerado.
 */
import { writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const API = "https://portfoliohub-uzjb.onrender.com/api/public/marioafonso1997";
const OUT = fileURLToPath(new URL("../src/data/portfolio.snapshot.json", import.meta.url));

/** Um arranque a frio no Render leva até ~60s: o timeout tem de lhe dar espaço. */
const TIMEOUT_MS = 90_000;
const ATTEMPTS = 3;

async function fetchOnce() {
  const res = await fetch(API, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!json?.success || !json.data?.user || !json.data?.profile) {
    throw new Error("resposta malformada");
  }
  return json.data;
}

async function main() {
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const data = await fetchOnce();
      await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
      const counts = ["projects", "posts", "experiences", "skills"]
        .map((k) => `${data[k]?.length ?? 0} ${k}`)
        .join(", ");
      console.log(`snapshot: atualizado (${counts})`);
      return;
    } catch (err) {
      console.warn(`snapshot: tentativa ${attempt}/${ATTEMPTS} falhou — ${err.message}`);
      if (attempt < ATTEMPTS) await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }

  // Sem rede não há atualização, mas há sempre o instantâneo commitado.
  try {
    const existing = JSON.parse(await readFile(OUT, "utf8"));
    if (!existing?.user) throw new Error("vazio");
    console.warn("snapshot: API inacessível — segue o instantâneo commitado");
  } catch {
    console.warn("snapshot: API inacessível e não há instantâneo anterior — a app arranca em loading");
    await writeFile(OUT, "{}\n");
  }
}

await main();
