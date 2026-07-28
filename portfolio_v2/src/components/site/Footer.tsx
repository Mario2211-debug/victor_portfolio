import { useQuery } from "@tanstack/react-query";
import { portfolioQueryOptions, sanitizeUrl } from "@/lib/portfolio";
import { copy } from "@/lib/copy";

export function Footer() {
  const { data } = useQuery(portfolioQueryOptions());
  const linkedin = sanitizeUrl(data?.profile.contact?.linkedin);
  const github = sanitizeUrl(data?.profile.contact?.github);

  return (
    <footer className="px-6 pt-4 pb-8">
      <div className="mx-auto flex w-full max-w-measure flex-col items-center gap-2">
        {(github || linkedin) && (
          <div className="flex items-center justify-center gap-1 text-xs">
            {github && <FooterLink href={github}>{copy.footer.github}</FooterLink>}
            {linkedin && <FooterLink href={linkedin}>{copy.footer.linkedin}</FooterLink>}
          </div>
        )}
        <span className="mt-4 font-script text-xl leading-none text-fg">Mário Afonso</span>
        <span className="numeric text-xs text-fg-muted">
          {copy.footer.rights(new Date().getFullYear())}
        </span>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="interactive touch-target motion-micro rounded-md px-3 py-2 text-fg-muted hover:bg-surface hover:text-fg"
    >
      {children}
    </a>
  );
}
