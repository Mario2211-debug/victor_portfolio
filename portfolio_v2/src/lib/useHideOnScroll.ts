import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/** Abaixo disto o gesto é tremura de trackpad, não intenção. */
const JITTER = 4;
/** Junto ao topo a barra está sempre presente, independentemente da direção. */
const TOP_ZONE = 24;

/**
 * Esconde ao descer, revela ao subir.
 *
 * Blur não resolve o problema: a barra continua por cima do texto. Esconder
 * devolve o ecrã inteiro a quem lê, e o gesto de subir traz a barra de volta
 * no momento exato em que volta a ser pedida.
 *
 * O `scroll` é `passive` e o estado só é lido dentro de um frame — ler
 * `scrollY` a cada evento força o browser a recalcular layout durante o scroll,
 * que é precisamente quando ele não tem tempo para isso.
 *
 * O efeito depende de `key` de propósito. Numa navegação, o scroll é movido por
 * código (`useScrollRestoration`) e não por gesto; refazer o efeito volta a ler
 * a posição de partida **depois** desse salto, e mostra a barra na página nova.
 * É isto que substitui a heurística que aqui esteve antes: uma guarda que
 * ignorava deslocamentos acima de 200px por frame, na ideia de que só um salto
 * programático seria assim tão grande. Não é — `PageDown`, a barra de scroll
 * arrastada e uma roda de rato configurada com passos largos passam disso num
 * único frame. Em páginas longas, lidas exatamente assim, a barra deixava de
 * se esconder. A ordem das chamadas no `Shell` importa: `useScrollRestoration`
 * primeiro, para que a posição já esteja corrigida quando este efeito a lê.
 */
export function useHideOnScroll() {
  const { key } = useLocation();
  const [hidden, setHidden] = useState(false);
  const [lastKey, setLastKey] = useState(key);

  // Ajustar estado durante o render quando uma entrada muda, em vez de o fazer
  // dentro do efeito: a barra aparece na página nova sem um render intermédio
  // em que ainda estava escondida.
  if (lastKey !== key) {
    setLastKey(key);
    setHidden(false);
  }

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    function read() {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;

      if (y <= TOP_ZONE) {
        last = y;
        setHidden(false);
        return;
      }
      // Sem `last = y` aqui: as tremuras acumulam até valerem um gesto.
      if (Math.abs(delta) < JITTER) return;

      last = y;
      setHidden(delta > 0);
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(read);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key]);

  return hidden;
}
