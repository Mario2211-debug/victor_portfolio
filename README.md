This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

<h1 align="center">Hi 👋, I'm Mário Afonso / Ólá chamo-me Mário Afonso</h1>
<h3 align="center">rom Angola to the World</h3>

<p> live demo project: https://victor-portfolio-sepia.vercel.app/
 </p>
- 🤝 Partilho contigo o meu portifólio criado do zero.

<h3 align="center">Languages and Tools:</h3>
<p align="center"> <a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" alt="nextjs" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a>  <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>
<img src="/src/app/icons/screenshot.png" align="center">
Documentação do Projeto: Portifolio e Blog Pessoal

<h1>Visão Geral:</h1>    
<ul>
<li>Nome do Projeto: Portifolio e Blog Pessoal.</li>
<li>Descrição: O meu portfólio online para apresentar os meus projetos, habilidades e experiência profissional.</li>
<li>Público-alvo: Potenciais empregadores, clientes e colaboradores.</li>
<li>Plataformas: Web (responsivo para diferentes dispositivos).</li>
</ul>

<h1>Funcionalidades Principais (Frontend):</h1>
<ul>
<li>Home:</li>
Apresentação geral com nome, breve descrição e foto(brevemente).
Destaque para projetos selecionados.
Links para as outras seções do portfólio (Projetos, Blog, Sobre).
<li>Projetos:</li>
Lista de projetos com imagens, descrições e links para demonstrações ou repositórios.
Filtros por categoria ou tecnologias utilizadas.
<li>Blog:</li>
Lista de artigos com títulos, resumos e datas de publicação.
   Página de detalhes para cada artigo com o conteúdo completo.
   <li>Sobre:</li>
   Informações sobre experiência profissional, habilidades e interesses.
   Links para redes sociais e contato.

</ul>

<h1> Tecnologias Utilizadas (Frontend):</h1>
  <ul>
  <li>Next.js:</li>
<p>Framework React para renderização do lado do servidor (SSR) e geração de sites estáticos.</p>

<li>Tailwind CSS:</li> 
<p>Framework CSS utilitário para estilização rápida e responsiva.</p>

<li>Axios:</li>
<p>Biblioteca para fazer requisições HTTP ao backend (Blog API).</p>

<li>Next Themes:</li> <p>Biblioteca para implementar o modo claro/escuro (dark mode).</p>
<li>Vercel:</li>
<p>Plataforma de hospedagem e deploy para Next.js.</p>
  </ul>

<h1>Funcionalidades Principais (Backend - Blog API):</h1>
<ul>
<li>Gerenciamento de Posts:</li>
   <p>Criar, ler, atualizar e deletar posts do blog.</p>
   <p>Upload e gerenciamento de imagens para os posts.</p>
</ul>

<h1>Tecnologias Utilizadas (Backend):</h1>
<ul>
<li>
Node.js:</li>
<p>Ambiente de execução JavaScript para o backend.</p>
<li>
Express.js:</li>
<p>Framework web minimalista para Node.js.</p>
<li>
MongoDB:</li>
<p>Banco de dados NoSQL para armazenar os posts do blog.</p>
<li>
Cloudflare:</li>
<p>Serviço de CDN e otimização de imagens para armazenar e entregar as imagens dos posts.</p>
<li>
Railway:</li>
<p>Plataforma de hospedagem em nuvem para o backend.</p>
<li>
</ul>

<h1>Estrutura do Banco de Dados (MongoDB):</h1>
<ul>
<li>Coleção posts:</li>
<p>_id (chave primária)</p>
<p>title (título do post)</p>
<p>content (conteúdo do post em formato HTML ou Markdown)</p>
<p>description (breve descrição do post)</p>
<p>imageUrl (URL da imagem do post armazenada no Cloudflare)</p>
<p>category (categoria do post)</p>
<p>date (data de publicação)</p>
</ul>

<h1>Arquitetura da API (Blog API):</h1>
<ul>
<li>Endpoints:</li>
<p><b>GET /posts</b>: Retorna a lista de todos os posts.</p>
<p><b> GET /posts/:id</b>: Retorna um post específico pelo ID.</p>
<p><b>POST /posts</b>: Cria um novo post.</p>
<p><b>PUT /posts/:id</b>: Atualiza um post existente.</p>
<p><b>DELETE /posts/</b>: Exclui um post.</p>

</ul>

<h1>Deploy:</h1>
<ul>
<li>Frontend</li>
<p>Implantado no Vercel, com integração contínua com o repositório do GitHub.</p>
<li>Backend</li>
<p>Hospedado no Railway</p>
</ul>

<h1>Próximos Passos:</h1>
<ul>
<li>Funcionalidades Adicionais:</li>
<p>Seção de depoimentos ou recomendações.</p>
<li>Autenticação e Autorização (opcional):</li>
<p>Restringir o acesso a alguns endpoints da API (como criar, atualizar e excluir posts), você precisará implementar um sistema de autenticação e autorização.</p>
<p>Integração com outras APIs (por exemplo, para exibir projetos do GitHub).</p>
<li>Melhorias de Design</li>
<p>Explorar diferentes layouts para as páginas: Blog e Artigo do blog. E diferentes estilos visuais(Fontes, PopUps, etc…).</p>
<li>Otimização de Performance</li>
<p>Implementar técnicas de otimização de imagens e carregamento preguiçoso (lazy loading).</p>
<p>Minificar e otimizar o código CSS e JavaScript.</p>

<li>Testes:</li>
<p>Hospedado no Railway</p>
<li>Backend</li>
<p>Escrever testes unitários e de integração para garantir a qualidade do código e evitar regressões.</p>
</ul>

<h1>Observações:</h1>
<ul>
<li>Se gostou ajude-me a crescer e deixe o teu feedback</li>
<p align="left"> Linkedin: www.linkedin.com/in/mario-afonso-018107141
</p></ul>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
