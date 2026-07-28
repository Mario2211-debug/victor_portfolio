import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * 07 — "Ao voltar a uma lista, a posição de scroll é preservada."
 *
 * O `ScrollToTop` anterior fazia `scrollTo(0, 0)` em toda a navegação, incluindo
 * o botão *voltar* do browser: abrir o quinto post e voltar atirava a pessoa
 * para o topo do blog. Agora só uma navegação nova vai ao topo; `POP` restaura
 * a posição guardada para aquela entrada do histórico.
 */
export function useScrollRestoration() {
  const { key } = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map<string, number>());
  const previousKey = useRef(key);

  useEffect(() => {
    // Guarda a posição da entrada que estamos a deixar, antes de a substituir.
    positions.current.set(previousKey.current, window.scrollY);
    previousKey.current = key;

    if (navigationType === "POP") {
      window.scrollTo(0, positions.current.get(key) ?? 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [key, navigationType]);

  // A posição da entrada atual tem de estar guardada antes de sair da página.
  useEffect(() => {
    function save() {
      positions.current.set(previousKey.current, window.scrollY);
    }
    window.addEventListener("pagehide", save);
    return () => {
      save();
      window.removeEventListener("pagehide", save);
    };
  }, []);
}
