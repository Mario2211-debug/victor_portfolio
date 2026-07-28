# design-diff.md — Fase 7, clone-and-diff

Referência: **Linear**, a lista de issues e o changelog. Escolhida pela função
equivalente ao momento herói definido na Fase 0 — lista densa, uma linha por
item, percorrível inteira a teclado.

> **Limite desta passagem.** O exercício do `11` pede screenshots lado a lado no
> mesmo zoom, e depois a medição. As screenshots não foram tiradas: este
> ambiente não tem browser. O que está abaixo são as **decisões** copiadas —
> que é o que o `11` diz para copiar — cada uma verificável no código. As
> medições que exigem ver os dois ecrãs ao mesmo tempo estão marcadas
> **[por medir]** e ficam para quem tiver o browser à frente.

---

## As 10 diferenças

### 1. A linha inteira é o alvo, não o texto
**Linear:** a row inteira reage; o padding horizontal estende-se para lá do
texto, e o hover pinta a largura toda da lista.
**Antes:** o `<a>` era `flex justify-between` sem padding lateral — o hover
pintava exatamente o texto e a seta, e o espaço entre eles não era clicável.
**Agora:** `-mx-2 px-2` na row. A superfície de hover ultrapassa o texto 8px de
cada lado e a linha toda é alvo. → `src/pages/Home.tsx`

### 2. O hover não pode mover nada
**Antes:** `hover:border-b` acrescentava 1px de borda ao passar o rato. Cada
linha empurrava as de baixo. É o tipo de defeito que ninguém sabe nomear mas
toda a gente sente.
**Agora:** o hover é `background`, que não ocupa espaço. Zero deslocamento.

### 3. Densidade da lista: 12px entre linhas, não 8
**Linear:** rows de ~40px de altura, com o texto a respirar mas sem ar a mais.
**Agora:** `py-3` (12px) mais 14px de texto a 1.55 → **~46px por linha**, que é
também o mínimo de alvo de toque. A densidade e a acessibilidade caíram no
mesmo número, o que costuma ser sinal de que o número está certo.
**[por medir]** confirmar contra a referência ao mesmo zoom.

### 4. Uma largura de coluna, não três
**Antes:** Home 500px, About/Blog 600px, Post/Project 640px.
**Agora:** `--container-measure: 600px`, aplicada por `<Page>`. Nenhuma página
inventa a sua. → `src/components/site/Page.tsx`

### 5. Hierarquia por cor e peso, não por tamanho
**Linear:** quase tudo é 13–14px; a hierarquia vem do contraste do cinzento.
**Antes:** 11 tamanhos de tipo, incluindo um `72px` que só o "404" usava.
**Agora:** 6 tamanhos, e a distinção entre primário e secundário faz-se com
`text-fg` vs `text-fg-muted` — passo 12 contra passo 11, nunca o 12 com
opacidade.

### 6. Um mecanismo de separação de cada vez
**Antes:** o cartão do cargo atual tinha borda **e** fundo **e** raio.
**Agora:** só fundo (`bg-surface`). Testado como manda o `01`: retirada a borda,
o grupo continua a ler-se — logo a borda era ruído.

### 7. O separador de lista é mais leve que a borda de um controlo
**Antes:** tudo usava `border-border/60`, o mesmo valor com opacidade, fosse
separador ou moldura.
**Agora:** `border-subtle` (passo 6) separa listas; `border` (passo 7) desenha
controlos; `border-hover` (passo 8) responde. Três papéis, três passos.

### 8. O estado ativo nunca é só cor
**Linear:** o item selecionado ganha fundo, não apenas texto mais claro.
**Antes:** as tabs M1–M6 distinguiam-se por cor e peso do texto.
**Agora:** `bg-surface-active` + peso + `aria-selected`. Legível sem cor e
anunciado por leitor de ecrã. → `src/components/ui/Tabs.tsx`

### 9. O teclado é interface, não conformidade
**Linear:** setas percorrem, `Esc` fecha, o foco é sempre visível.
**Antes:** zero `focus-visible` em toda a app; as tabs não respondiam a setas;
o disclosure não fechava com `Esc` nem declarava `aria-expanded`.
**Agora:** anel de foco único definido no `:focus-visible` global; roving
tabindex com setas/`Home`/`End` nas tabs; `Esc` no disclosure; skip link como
primeiro alvo do `Tab`.

### 10. Voltar atrás devolve a pessoa ao sítio onde estava
**Linear:** sair de uma issue e voltar à lista mantém a posição.
**Antes:** `ScrollToTop` fazia `scrollTo(0,0)` em **toda** a navegação,
incluindo o botão *voltar*.
**Agora:** só `PUSH` vai ao topo; `POP` restaura a posição guardada para aquela
entrada do histórico. → `src/lib/useScrollRestoration.ts`

---

## Deixado de fora, de propósito

**Atalhos de teclado para navegação (`g h`, `g b`) e palete `⌘K`.**
O `07` pede atalho para a ação principal, e o `11` mostra o Linear a fazê-lo.
Não foi feito, e a razão é o `08` — Jakob: ninguém chega a um portfólio à espera
de atalhos, e o custo de os descobrir é maior do que o de carregar em três links.
A regra do `07` sobre a palete só se aplica acima de 8 ações; aqui há quatro
destinos. Se um dia houver uma lista longa de projetos com filtros, a decisão
muda — e é aqui que fica escrito porquê.

---

## O que falta medir com o browser aberto

- [ ] Screenshots lado a lado ao mesmo zoom, Home vs lista de referência.
- [ ] Contar frames das transições gravando o ecrã (o alvo é 120ms no hover).
- [x] Contraste dos passos 11 e 6 sobre o passo 1, nos dois temas — calculado
      (`oklch → sRGB → WCAG`), tabela em `design.md`. Falta confirmar a olho.
- [ ] Lighthouse com a app servida em produção.
- [ ] Percorrer os seis ecrãs só com teclado, sem tocar no rato.
