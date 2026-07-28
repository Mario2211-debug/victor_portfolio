import { Link } from "react-router-dom";
import { Page } from "@/components/site/Page";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { useTitle } from "@/lib/useTitle";
import { copy } from "@/lib/copy";

export default function NotFound() {
  useTitle(`${copy.notFound.title} — Mário Afonso`);
  return (
    <Page>
      {/* O "404" é o eyebrow, não o título: o código não é a mensagem (10).
          E deixa de ser o maior texto do produto, o que fechava a escala de
          tipo num tamanho que mais nada usava (03). */}
      <p className="numeric text-xs tracking-wide text-fg-muted uppercase">
        {copy.notFound.eyebrow}
      </p>
      <h1 className="mt-4 text-2xl font-medium tracking-tight text-fg">{copy.notFound.title}</h1>
      <p className="mt-4 text-base text-fg-muted">{copy.notFound.body}</p>
      <div className="mt-8">
        <Link to="/" className={buttonVariants()}>
          {copy.notFound.action}
        </Link>
      </div>
    </Page>
  );
}
