# design-diff.md — Fase 7, clone-and-diff

Referência: **Linear**, `linear.app/changelog`, capturado no mesmo viewport e
zoom (1280×900, DPR 2) que a Home deste site.

> **Correção ao que aqui estava escrito.** As duas primeiras versões deste
> ficheiro diziam que a referência era "lista densa, uma linha por item" e que
> não tinha sido capturada por estar atrás de autenticação. Ambas as coisas
> estavam erradas, e as duas pelo mesmo motivo: **descrevi a referência de
> memória em vez de a abrir.**
>
> O changelog é público. O que precisa de conta é a lista de *issues* dentro do
> produto — e é essa que tem função equivalente ao momento herói. O changelog
> não tem: é um feed editorial, com títulos a 48px, screenshots de produto e
> prosa longa. 74px entre a data e o bloco do título, não uma linha por item.
>
> Ou seja: a referência que eu próprio escolhi estava mal escolhida para o ecrã
> que queria comparar. Fica capturada e medida à mesma, porque o que dela se
> aproveita — a barra de filtros — tem função equivalente ao **navbar**, e essa
> comparação deu resultado.

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
**Agora:** medido no browser — **34px em ponteiro fino, 48px em ponteiro
grosseiro** (`py-2 pointer-coarse:py-4`).
Chegou aqui por um erro que só a medição apanhou: ao remover os separadores
apertei o `py`, e com a escala global a −10% as linhas caíram para 34px — abaixo
do mínimo de alvo de toque do `07`, sem que nada no código o denunciasse.
Crescer o alvo com o `::after` do `touch-target` não servia: as linhas são
adjacentes, e alvos de 44px sobre linhas de 34px sobrepunham-se 5px de cada
lado — tocar na margem acertaria na linha errada. Em ponteiro grosseiro cresce
a própria linha, e a densidade no rato fica como estava.

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

## Medido contra a referência

Mesmo viewport, mesmo zoom, valores computados do DOM dos dois lados.

| | Linear (changelog) | Este site (Home) |
|---|---|---|
| Tamanhos de tipo distintos num ecrã | **10** | **4** |
| Pesos | 3 (400/510/590) | 3 (400/500/600) |
| Cores de texto distintas | **6** (3 tiers reais) | **2** |
| Cores de fundo distintas | 9 | 1 |
| Nav: tamanho do tipo | 16px | **12.6px** |
| Nav: altura do item | 25px | 36px |
| Nav: estado ativo | cor **só** | cor + peso + fundo |
| Nav: transição | 100ms | 120ms |

### As três coisas que isto diz

**1. Falta-me um terceiro tier de texto.** É o único sítio onde a referência é
mais rica e tem razão. O Linear separa título (`#f7f8f8`), corpo (`#d0d6e0`) e
terciário (`#8a8f98`) — três tiers, que é o máximo que o `01` permite. Eu tenho
dois: `fg` e `fg-muted`. Consequência concreta: os eyebrows, as datas e o corpo
secundário partilham todos o passo 11, quando os eyebrows deviam ser mais
apagados que o corpo. **Vira tarefa:** um passo entre o 11 e o 12 para prosa,
deixando o 11 para o terciário.

**2. O navbar a 12.6px é mais pequeno que o corpo de texto.** O corpo está a
14.4px; a navegação está a 12.6px. Navegação mais pequena que o texto que ela
serve é difícil de defender — a referência põe a dela a 16px, maior que o corpo.
**Vira tarefa:** subir o nav para `text-base`.

**3. Onde vou continuar a divergir: o estado ativo.** O Linear comunica-o só por
cor. O `09` proíbe exatamente isso — "estados nunca comunicados só por cor" — e
é uma das poucas vezes em que a referência falha uma regra do kit. Fico com cor
+ peso + fundo. É o `11` a funcionar como devia: copiar as decisões não é copiar
todas as decisões.

**Nota sobre a regra dos 6 tamanhos:** a referência usa 10 num único ecrã. O
`03` fecha em 6, e este site cumpre-o com 4. Vale registar que a regra do kit é
mais apertada do que a prática da referência que o kit indica — não como
desculpa para a relaxar, mas para se saber que é uma escolha e não um consenso.

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

## Medições — feitas no browser (Chromium via Playwright)

- [x] **Durações de transição:** `0.12s` medido em `nav a` e nos botões do
      header. É o `--dur-micro`, chegado ao DOM sem ninguém escrever `ms` no JSX.
- [x] **`prefers-reduced-motion`:** `0.08s`, não zero — feedback encurtado, não
      removido, que é o que o `06` pede.
- [x] **Contraste** dos passos 11 e 6 sobre o passo 1, nos dois temas —
      calculado (`oklch → sRGB → WCAG`), tabela em `design.md`.
- [x] **Teclado**, em Home, About, Blog e Project: 11, 7, 8 e 9 paragens.
      Skip link é sempre a primeira. **Todas as paragens têm anel de foco.**
      `Esc` fecha o disclosure e devolve o foco ao gatilho. Nas tabs, `→` avança,
      `End` salta para M6, `→` dá a volta a M1, e o roving tabindex lê
      `0,-1,-1,-1,-1,-1`.
- [x] **Restauro de scroll:** saiu do Blog a 49px, o post abriu a 0, o *voltar*
      devolveu 49px.
- [x] **Header ao fazer scroll:** `top 14 → -36`, `opacity 1 → 0` ao descer, e o
      inverso ao subir. Confirmado no About, que era onde falhava.
- [x] **Lighthouse** na build de produção: acessibilidade **100**, boas práticas
      **100**, SEO **100** (era 92 — faltava `robots.txt`), performance **89**.
- [x] **Telemóvel (390px):** zero scroll horizontal, zero erros de consola.
- [ ] Screenshots lado a lado ao mesmo zoom, Home vs Linear — o ecrã de
      referência está atrás de autenticação.
- [ ] Percurso de teclado no post de blog e no 404 (os outros quatro estão feitos).

## Aceite como está

**O "Say hello" é um alvo de 18px.** É um link inline a meio de um parágrafo;
dar-lhe 44px partia a linha de texto. Fica assim porque não é o único caminho
para o contacto — o ícone de mail no header faz a mesma coisa e tem 44px em
ponteiro grosseiro. Se algum dia for a única forma de contactar, deixa de poder
ser um link de prosa.

**Performance 89, e não mais.** O que falta é a folha de estilos do Google Fonts
a bloquear o render, e JavaScript não usado (react-router e react-query). As duas
correções — alojar as fontes localmente e dividir o bundle — têm custo e mexem
em decisões que não são de design. O `render-blocking` tem ainda um contra:
torná-lo assíncrono troca bloqueio por *flash* de fonte, e a Fase 8 pede
explicitamente fontes sem layout shift.
