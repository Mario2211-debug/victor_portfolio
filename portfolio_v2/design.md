# design.md — portfolio_v2

Registo da passagem pelo `pipeline.md`. Uma superfície: `portfolio_v2`.
O `frontend/` (Next.js) é a versão anterior e fica fora de âmbito.

---

## FASE 0 — Definição

**1. O que é isto, em uma linha**
O portfólio de um engenheiro: quem sou, onde trabalho, o que construí — lido em
menos de um minuto, sem scroll infinito e sem storytelling.

**2. Ecrã principal**
`/` (Home). É o único ecrã que a maioria das pessoas vê. Tudo o resto — About,
Blog, páginas de projeto — é profundidade opcional para quem já decidiu ficar.

**3. Momento herói**
A **lista de trabalho recente**. Não é uma grelha de cartões com screenshots:
é uma lista densa, de uma linha por projeto, que se percorre inteira com o
teclado. Cada linha responde antes de a pessoa acabar de carregar, a seta
inclina-se para fora, e o destino abre direto. O que faz parar não é uma imagem
— é a sensação de que a lista é um índice de comandos, não uma galeria.

Consequência: o resto do ecrã existe para não competir com esta lista.

**4. Densidade: denso** (Linear, não Stripe).
Coluna estreita, tipo pequeno, linhas próximas, ar entre grupos e não dentro
deles. Sem exceções nas outras páginas.

**Gate Fase 0:** passa — o ponto 3 está escrito e é uma coisa só.

---

## Auditoria do estado inicial

O que estava, antes da passagem. Registado para se poder medir o antes/depois.

| Fase | Estado inicial | Falha |
|---|---|---|
| 1 | `--card` / `--popover` brancos com foreground escuro, herdados de um tema claro que nunca existiu. `.dark` declarado como variante mas nunca aplicado. Sem tokens de movimento, sem elevação, 7 raios. | Gate falhado: não há light/dark. `::selection` com cor literal fora dos tokens. |
| 1 | 11 tamanhos de tipo distintos (`10 11 12 13 14 15 16 24 30 48 72` px, três deles em `clamp`). 4 pesos (400/500/600/700). | 03: máx. 6 tamanhos, 3 pesos. |
| 2 | Nenhum primitivo. Botões, tags e o *disclosure* estilizados inline em cada sítio. | Estados definidos no local de uso, não no componente. |
| 3 | Três larguras de coluna no mesmo produto: Home 500px, About/Blog/Footer 600px, Post/Project 640px. `pt-30` fora de escala. | 01: densidade misturada. |
| 4 | Loading = um ponto a pulsar (spinner, não skeleton). Vazio do Blog = "No posts published yet." sem ação. Erro mostrava `Portfolio API 500` cru. **Zero `focus-visible` em toda a app.** Home sem `<h1>`. `hover:border-b` a somar 1px e a empurrar o layout. | Gate mais importante do pipeline, falhado. |
| 4 | *Previous roles* sem `aria-expanded`/`aria-controls`. Milestones M1–M6 como botões soltos, estado só por cor, sem setas. | 09: estado só por cor; 04: teclado incompleto. |
| 5 | `transition-colors` sem tokens, sem `prefers-reduced-motion`. | 06. |
| 7 | Sem alvos de 44px, sem `user-select`, ícones arrastáveis, imagem do post sem dimensões reservadas, `ScrollToTop` a destruir a posição de scroll no botão *voltar*. | 07. |
| 8 | Sem `og:image`, sem canonical, folha de estilos de fontes a bloquear o render. | — |

---

## FASE 1 — Tokens

Fonte única: `src/index.css`. Nenhum valor de cor, tipo, raio, elevação ou
duração vive fora dele.

- **Cor** — modelo de 12 passos do Radix com papéis fixos, exposto como aliases
  semânticos (`bg`, `surface`, `border`, `solid`, `fg-muted`, `fg`, `accent`…).
  Cinzento frio (hue 250) escolhido pela temperatura do accent ciano (hue 215).
  Dark é o tema por defeito e mantém o preto puro no passo 1. Light troca a
  escala, não inverte valores.
- **Tipo** — 6 tamanhos (`12 · 14 · 16 · 20 · 24 · 32`), 3 pesos (`400/500/600`).
  Os namespaces `--text-*` e `--font-weight-*` do Tailwind são limpos com
  `initial` antes de serem redefinidos: um sétimo tamanho deixa de compilar.
- **Espaço** — escala fechada `1 2 3 4 6 8 12 16`.
  *Desvio assumido face ao pipeline:* o `01` fecha em `2 3 4 6 8 12 16`; ficou
  o `1` (4px) para a distância entre uma linha e a sua legenda imediata, onde
  8px já lê como separação de grupo nesta densidade.
- **Elevação** — 3 níveis, em camadas. É a lacuna assumida do kit; os valores
  aqui são uma escolha, não uma destilação de fonte.
- **Raios** — 2: `md` (8px) e `full`.
- **Movimento** — `--dur-micro 120ms`, `--dur-enter 180ms`, `--dur-overlay 240ms`,
  `--ease-out`, `--ease-in`.

**Gate:** light/dark alterna sem tocar em nenhum componente. Zero literais de cor
fora de `index.css`.

---

## FASE 5 — As quatro partes, para as 3 ações principais

Escritas antes do código, como manda o `05`.

### 1. Abrir um projeto a partir da lista de trabalho recente *(momento herói)*
- **Gatilho:** `pointerdown` no rato, `Enter` no teclado, ou toque.
- **Regras:** projeto com link externo abre em separador novo; sem link, navega
  para `/projects/:slug`. Nunca ambos. A linha inteira é o alvo, não o texto.
- **Feedback:** abaixo dos 100ms — a linha ganha superfície, o texto sobe ao
  passo 12 e a seta desloca-se 2px na diagonal. O deslocamento diz a direção
  do destino.
- **Ciclos:** à décima vez a pessoa está a percorrer a lista com o teclado. Por
  isso o feedback é contínuo (segue o foco) e não celebratório. Sem stagger no
  regresso à lista — só na primeira montagem.

### 2. Expandir os cargos anteriores
- **Gatilho:** clique ou `Enter`/`Space` no botão. `Esc` fecha.
- **Regras:** só existe se houver mais do que um cargo. O contador diz quantos
  antes de abrir — a pessoa decide sem pagar a abertura.
- **Feedback:** o chevron roda 180°, a lista entra com fade + 4px. `aria-expanded`
  muda no mesmo frame.
- **Ciclos:** o estado não persiste entre visitas; é uma consulta, não uma
  preferência.

### 3. Recuperar de uma falha da API
- **Gatilho:** o fetch falha, ou a pessoa carrega em *Try again*.
- **Regras:** enquanto tenta, o botão mantém a largura e fica desativado. O
  detalhe técnico fica visível mas em terciário, para o caso de alguém o
  reportar.
- **Feedback:** o estado muda para *Retrying…* imediatamente; a região é
  `aria-live="polite"`.
- **Ciclos:** à terceira falha a mensagem deixa de sugerir tentar outra vez e
  passa a oferecer o contacto direto por email — a rede não vai melhorar.

---

## Ciclo por ecrã

| Ecrã | 4 estados | Teclado | Movimento | Copy | Detalhe |
|---|---|---|---|---|---|
| Home | ✅ | ✅ | ✅ | ✅ | ✅ |
| About | ✅ | ✅ | ✅ | ✅ | ✅ |
| Blog | ✅ | ✅ | ✅ | ✅ | ✅ |
| Blog post | ✅ | ✅ | ✅ | ✅ | ✅ |
| Project | ✅ | ✅ | ✅ | ✅ | ✅ |
| 404 | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## FASE 7 — Clone-and-diff

Referência escolhida: **Linear — changelog / lista de issues**, pela função
equivalente (lista densa, navegável a teclado, uma linha por item). As 10
diferenças e o que foi feito com cada uma estão em `design-diff.md`.

A parte do exercício que exige screenshots lado a lado não foi feita — foi
corrido sem browser disponível. O `design-diff.md` marca o que ficou por medir.

---

## FASE 8 — Envio

- `public/og.png` (1200×630) gerado a partir de `assets/og.svg`, que é a fonte
  editável. Para regerar depois de mexer no SVG basta rasterizá-lo a 1200×630.
- `og:image` / `twitter:image` com `summary_large_image`, `og:url`, `og:site_name`
  e `canonical`.
- Fontes: `preconnect` + `preload` da folha, `display=swap`, e menos pesos
  pedidos (400/500/600 — os únicos que a escala usa). A família de fallback está
  declarada em `--font-sans`, por isso a troca é de família e não de layout.
- Tema resolvido por script inline antes da primeira pintura: sem flash.
- 404 reescrito: o código passou a eyebrow e deixou de ser o maior texto do site.

**Por fazer, precisa de browser:** Lighthouse, e a auditoria de teclado nos seis
ecrãs.

---

## Revisão pós-passagem

Três ajustes pedidos depois de ver o resultado. Todos foram feitos no sistema,
não nos ecrãs — que é o teste de saber se as Fases 1–3 valeram a pena.

**1. Tudo 10% mais pequeno.** Um único token, `--ui-scale: 0.9`, aplicado a
`html { font-size: calc(100% * var(--ui-scale)) }`. Como a escala de tipo, o
espaçamento, os raios e a medida da coluna estão todos em `rem`, encolhe tudo
exatamente o mesmo e nenhuma proporção do sistema se altera. Reduzir os seis
tamanhos de tipo à mão teria deixado as alturas e o espaço a 100% — isso seria
mudar o desenho, não encolhê-lo.
Fica em percentagem e não em px para partir da preferência de tamanho de letra
da pessoa em vez de a substituir. O que está em px de propósito não encolhe:
os 44px de alvo de toque e a espessura das linhas são mínimos absolutos.
Efeito: corpo a 14.4px, coluna a 540px ≈ 68 caracteres — ainda dentro dos 45–75
do `03`.

**2. Linhas internas fora; as que ficam são um fio.** Saíram a régua que se
estendia a partir de cada `SectionLabel`, os `divide-y` das listas da Home e do
Blog, e a linha acima do corpo do post. O separador passou a ser o espaço, que
é o teste que o `01` manda fazer: retira a borda — ainda se percebe o grupo?
Percebe-se, logo a borda era ruído. Com as linhas fora, as linhas de lista
apertaram um passo (`py-3` → `py-2`), porque já não há um traço a fazer o
trabalho da separação.
Restaram duas réguas, ambas em prosa: o `<hr>` do markdown, agora com
`--hairline: 0.5px`, e a barra da citação, de 2px para 1px.

**3. O navbar deixou de ser uma pílula.** Passou de `rounded-full` para
`rounded-md` — o outro raio do sistema, sem inventar um terceiro. Uma barra
fixa é uma superfície, não um controlo; o raio de pílula fazia-a ler como um
botão gigante. Os dois botões de ícone ao lado acompanham, porque pertencem ao
mesmo grupo. Os botões de ação pelo resto do produto mantêm-se em pílula: aí o
raio significa mesmo "isto é um controlo".

**4. A barra de navegação ficou sem contentor.**
Foi em dois passos. Primeiro saíram a borda e o `backdrop-blur`, e o fundo
passou a `bg-surface` — o mesmo material do cartão de trabalho, um só mecanismo
de separação (01). Depois saiu também o fundo: os links assentam direto na
página, e **a única superfície da barra é o item ativo**.

É o `01` levado até ao fim — o melhor separador é o espaço vazio — e é o que
transforma o estado ativo em destaque, em vez de mais um degrau numa pilha de
fundos. O hover deixou de ter superfície própria de propósito: seria a mesma do
ativo, e passar o rato passaria a parecer "estás aqui". Sobe o texto do passo 11
ao 12 e mais nada.

Isto só é seguro por causa do ponto 5: sem fundo por baixo, uma barra sobreposta
a texto seria ilegível — e esta nunca chega a sobrepor-se, porque se esconde ao
descer. As duas decisões sustentam-se uma à outra.

Os dois botões de ícone ao lado ficaram na variante `surface` (passos 3/4/5 da
escala, o papel que o `02` reserva para fundo de componente e que até aqui
nenhuma variante usava). São controlos, não navegação, e é o fundo que os
distingue dos links — mas são agora a única outra coisa preenchida no header.

**5. A barra sai de cena ao descer e volta ao subir.**
Entre as duas hipóteses — blur ou desaparecer — desaparecer é a que resolve o
problema. O blur não retira a barra de cima do texto; deixa-a lá, desfocada.
Esconder devolve o ecrã inteiro a quem lê, e o gesto de subir traz a barra de
volta no instante em que volta a ser pedida.
Detalhes que a fazem não irritar: junto ao topo está sempre presente; ignora
deslocamentos abaixo de 4px (tremura de trackpad) e acima de 200px (saltos de
restauro de scroll, que não são gestos e dos quais não se infere direção); lê o
`scrollY` dentro de um `requestAnimationFrame`, porque lê-lo a cada evento força
recálculo de layout precisamente quando o browser não tem tempo; e `focus-within`
traz a barra de volta assim que o `Tab` lhe chega — escondida por scroll continua
alcançável a teclado.
*Desvio assumido:* desloca a própria altura, e não os 4–8px do `06`. Essa regra
é para elementos que **entram** em cena; um header que se retira é o movimento
de um drawer, e a meio caminho continuaria a tapar texto.

**6. Mais ar entre a barra e o conteúdo.**
`--spacing-page-top` de 6rem para 9rem: a distância entre o fundo da barra e a
primeira linha passa de ~36px para ~80px. Para não empurrar tudo para baixo, o
fundo da página encolheu de `pb-16` para `pb-12`. Saldo em altura de página:
**+29px** — pouco o suficiente para não transformar um ecrã que cabia num ecrã
que passa a ter scroll. Nos ecrãs curtos não há risco nenhum: o `min-h-dvh` com
`flex-1` no conteúdo faz a página esticar até à altura exata da janela.

**7. A escala clara estava comprimida.**
O passo 1 do dark é preto puro, o que dá ao passo 3 um salto de **0.19** de
lightness. A primeira versão da escala clara tinha o passo 1 em branco puro e o
3 a 0.955: um salto de **0.045**, quatro vezes menor. Era por isso que o cartão
de trabalho, as etiquetas do About e o item ativo da barra desapareciam no tema
claro — não era um problema dos componentes, era o passo 3 estar demasiado perto
do passo 1.

O passo 1 saiu do branco puro (0.995) e os passos 3–5 desceram; o salto passa a
**0.070**. Uma alteração, catorze sítios corrigidos — é literalmente o gate da
Fase 1 a pagar-se.

*Continua assimétrico, e não pode deixar de ser:* para tirar 0.19 do branco o
passo 3 teria de ser cinzento médio, e deixava de ser uma superfície subtil.
Se ainda ler plano no claro, a alavanca é uma só linha, `--gray-3`.

Contrastes calculados nos dois temas (script em `oklch → sRGB → WCAG`), agora
praticamente iguais um ao outro:

| | dark | light |
|---|---|---|
| `fg` sobre `bg` | 19.3:1 | 18.2:1 |
| `fg-muted` sobre `bg` | 6.0:1 | 6.4:1 |
| `fg-muted` sobre `surface` | 5.3:1 | 5.2:1 |
| `on-solid` sobre `solid` | 18.5:1 | 16.0:1 |

**8. Os controlos do header perderam o fundo.**
`ContactBubble` e `ThemeToggle` passaram para `ghost`, que deixou de ter fundo
mesmo em hover — só o ícone sobe do passo 11 ao 12. Com a barra sem contentor, um
botão preenchido ao lado competia com a única superfície que devia restar ali: o
item ativo. A variante `surface`, criada duas revisões antes exatamente para
estes dois botões, ficou sem uso e foi removida.

**9. A barra não se escondia em páginas longas.**
Não era do About — era da heurística que ignorava deslocamentos acima de 200px
por frame, escrita a assumir que só um salto programático seria assim tão
grande. Não é: `PageDown`, a barra de scroll arrastada e uma roda de rato com
passos largos passam disso num único frame. Em páginas longas, lidas exatamente
assim, a barra nunca chegava a esconder-se.

A guarda saiu. O caso que ela tentava cobrir — o restauro de scroll ao navegar —
resolve-se pela raiz: o efeito depende agora do `key` da rota, por isso volta a
ler a posição de partida **depois** do salto programático. A ordem no `Shell`
importa e está garantida: `useScrollRestoration` antes de `useHideOnScroll`.

**10. A cor de marca passou a laranja.**
`#db6930` → `oklch(0.649 0.159 44.5)`. **Substituiu** o ciano, não se somou a
ele: o `02` fecha em um cinzento mais *uma* cor de marca, e o ciano não estava
a aparecer em lado nenhum — vivia só no anel de foco e na seleção de texto,
porque nenhum componente chegou a usar `accent-*`. A troca não teve custo.

O cinzento fica em hue 250. Frio contra um accent quente é um par melhor do que
era contra o ciano, que competia com ele na mesma metade do círculo.

Onde o laranja se vê, e mais nada:
- **Um ponto de 6px no cargo atual.** É o único laranja de toda a página. Tem
  significado — *isto é o presente* — em vez de ser decoração, e reutiliza o
  `isCurrent` que os dados já traziam. É `aria-hidden`: o intervalo de datas já
  diz "Present", por isso o ponto reforça, não informa. Um estado nunca pode
  depender só de cor (09).
- **O anel de foco** e **a seleção de texto**.

Contraste: o `#db6930` tal e qual dá **6.07:1** sobre o preto — passa até como
texto. Sobre o branco dá só **3.41:1**, que chega para um ponto ou um anel
(3:1) mas não para texto; por isso o passo 11 do tema claro desce a `0.52`
(5.79:1). É a mesma lógica que corrigiu a escala cinzenta: os papéis mantêm-se,
os valores é que mudam de tema para tema.

*Clarificação da escala de espaço, que este ponto obrigou a escrever:* o `size-1.5`
do ponto está fora da escala fechada, tal como o `size-10` do avatar e o `h-10`
do nav sempre estiveram. A escala `1 2 3 4 6 8 12 16` governa **ritmo** —
margens, padding, gaps. Dimensões de componente (um avatar, uma altura de barra,
o diâmetro de um ponto) são decisões ópticas e vivem fora dela. O `gap-2` entre
o ponto e o texto, esse, está na escala.

---

## Validação no browser

Corrida em Chromium (Playwright), contra o dev server e contra a build de
produção. Os números estão em `design-diff.md`. O que interessa reter:

**Confirmado.** Anel de foco em todas as paragens de `Tab`, nos quatro ecrãs
percorridos. `Esc` fecha o disclosure e devolve o foco. As tabs respondem a
setas, `Home`/`End` e dão a volta. O scroll restaura-se ao voltar. O header
esconde-se ao descer e volta ao subir — incluindo no About, que era onde
falhava. As transições saem a 120ms, e a 80ms com `prefers-reduced-motion`.
Lighthouse: acessibilidade **100**, boas práticas **100**.

**Duas coisas que só a medição apanhou.**

1. **As linhas do trabalho recente estavam em 34px em ecrã de toque.** Ao
   remover os separadores apertei o `py`, e com a escala global a −10% caíram
   abaixo do mínimo de 44px do `07`. Nada no código o denunciava. Corrigido com
   `pointer-coarse:py-4`: 48px no dedo, 34px no rato — a densidade que a Fase 0
   pediu mantém-se onde faz sentido.

   *A lição:* uma regra em px dentro de um sistema em `rem` não se move com o
   sistema. Sempre que a escala global mudar, os mínimos absolutos têm de ser
   remedidos — não há gate que os proteja.

2. **SEO em 92, por falta de `robots.txt`.** Faltava mesmo, e não estava na
   checklist da Fase 8 do kit. Adicionados `robots.txt` e `sitemap.xml`;
   SEO passou a **100**.

**O que continua por fazer:** os screenshots lado a lado com o Linear — a
referência está atrás de autenticação — e o percurso de teclado no post de blog
e no 404.

---

## Regras que ficam

1. Uma largura de coluna: `--measure` (600px). Nenhuma página inventa a sua.
2. Nenhum valor de cor, tamanho, raio ou duração fora de `index.css`.
3. Todo o elemento interativo passa por um primitivo de `components/ui/`.
   Se precisa de estados, não é uma `div`.
4. Toda a string visível vive em `src/lib/copy.ts`. JSX não escreve texto.
5. Um ecrã novo não entra sem os quatro estados e sem passar a teclado.
