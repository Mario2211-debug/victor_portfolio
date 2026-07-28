import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { copy } from "@/lib/copy";

const items = [
  { to: "/", label: copy.nav.home },
  { to: "/blog", label: copy.nav.blog },
  { to: "/about", label: copy.nav.about },
] as const;

export function Nav() {
  return (
    /* Sem contentor: os links assentam direto na página. A única superfície da
       barra é o item ativo — é o `01` levado ao fim, onde o melhor separador é
       o espaço vazio. O que torna isto seguro é a barra esconder-se ao descer:
       sem fundo por baixo, sobrepor-se a texto seria ilegível, e ela nunca
       chega a sobrepor-se. */
    <nav aria-label={copy.nav.label}>
      <ul className="flex items-center">
        {items.map((i) => (
          <li key={i.to}>
            {/* NavLink já emite aria-current="page" — o estado ativo não é
                comunicado só por cor: ganha peso e superfície (09). Agora é a
                única superfície da barra, o que o torna o destaque em vez de
                mais um degrau numa pilha de fundos. */}
            <NavLink
              to={i.to}
              end
              className={({ isActive }) =>
                cn(
                  "interactive touch-target motion-micro flex h-10 items-center rounded-md px-3 text-sm",
                  isActive
                    ? "bg-surface font-medium text-fg"
                    // Sem superfície no hover: seria a mesma que a do ativo, e
                    // passar o rato passaria a parecer "estás aqui". O hover
                    // sobe o texto ao passo 12 e mais nada.
                    : "text-fg-muted hover:text-fg",
                )
              }
            >
              {i.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
