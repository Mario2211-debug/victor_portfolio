import { useQuery } from "@tanstack/react-query";
import { portfolioQueryOptions, sanitizeUrl } from "@/lib/portfolio";

export function Footer() {
  const { data } = useQuery(portfolioQueryOptions());
  const linkedin = sanitizeUrl(data?.profile.contact?.linkedin);
  const github = sanitizeUrl(data?.profile.contact?.github);

  return (
    <footer className="px-5 pb-8 pt-4">
      <div className="mx-auto w-full max-w-[600px] flex flex-col items-center gap-2">
        {(github || linkedin) && (
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            )}
          </div>
        )}
        <span
          className="text-3xl mt-4 text-foreground/90 leading-none"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Mário Afonso
        </span>
        <span className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved
        </span>
      </div>
    </footer>
  );
}
