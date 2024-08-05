This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

<h1 align="center">Hi 👋, I'm Mário Afonso / OLÁ eu me chamo Mário Afonso</h1>
<h3 align="center">From Angola to the World</h3>

<p> live demo project: https://portfolio-desgn.vercel.app/
 </p>
- 🤝 I hope I can help you with the creation of your portfolio, in this project I used the basics, just with the front part, I was able to explore a little about image manipulation with tailwind, routes with next, and I hope you use yours imagination to give a look to your design. **Victor Portfolio**
<h3 align="center">Languages and Tools:</h3>
<p align="center"> <a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" alt="nextjs" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a>  <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>
<img src="/src/app/icons/Home.png" align="center">
Documentação do Projeto: Portifolio e Blog Pessoal

<h1>Visão Geral:</h1>    
<ul>
<li>Nome do Projeto: Portifolio e Blog Pessoal.</li>
<li>Descrição: O meu portfólio online para apresentar os meus projetos, habilidades e experiência profissional.</li>
<li>Público-alvo: Potenciais empregadores, clientes e colaboradores.</li>
<li>Plataformas: Web (responsivo para diferentes dispositivos).</li>
</ul>

2. Funcionalidades Principais (Frontend):
   • Home:
   o Apresentação geral com nome, breve descrição e foto(brevemente).
   o Destaque para projetos selecionados.
   o Links para as outras seções do portfólio (Projetos, Blog, Sobre).
   • Projetos:
   o Lista de projetos com imagens, descrições e links para demonstrações ou repositórios.
   o Filtros por categoria ou tecnologias utilizadas.
   • Blog:
   o Lista de artigos com títulos, resumos e datas de publicação.
   o Página de detalhes para cada artigo com o conteúdo completo.
   • Sobre:
   o Informações sobre experiência profissional, habilidades e interesses.
   o Links para redes sociais e contato.

3. Tecnologias Utilizadas (Frontend):
   • Next.js: Framework React para renderização do lado do servidor (SSR) e geração de sites estáticos.
   • Tailwind CSS: Framework CSS utilitário para estilização rápida e responsiva.
   • Axios: Biblioteca para fazer requisições HTTP ao backend (Blog API).
   • Next Themes: Biblioteca para implementar o modo claro/escuro (dark mode).
   • Vercel: Plataforma de hospedagem e deploy para Next.js.

4. Funcionalidades Principais (Backend - Blog API):
   • Gerenciamento de Posts:
   o Criar, ler, atualizar e deletar posts do blog.
   o Upload e gerenciamento de imagens para os posts.

5. Tecnologias Utilizadas (Backend):
   • Node.js: Ambiente de execução JavaScript para o backend.
   • Express.js: Framework web minimalista para Node.js.
   • MongoDB: Banco de dados NoSQL para armazenar os posts do blog.
   • Cloudflare: Serviço de CDN e otimização de imagens para armazenar e entregar as imagens dos posts.
   • Railway: Plataforma de hospedagem em nuvem para o backend.

6. Estrutura do Banco de Dados (MongoDB):
   • Coleção posts:
   o \_id (chave primária)
   o title (título do post)
   o content (conteúdo do post em formato HTML ou Markdown)
   o description (breve descrição do post)
   o imageUrl (URL da imagem do post armazenada no Cloudflare)
   o category (categoria do post)
   o date (data de publicação)

7. Arquitetura da API (Blog API):
   • Endpoints:
   o GET /posts: Retorna a lista de todos os posts.
   o GET /posts/:id: Retorna um post específico pelo ID.
   o POST /posts: Cria um novo post.
   o PUT /posts/:id: Atualiza um post existente.
   o DELETE /posts/:id: Exclui um post.
   o Endpoints adicionais para upload de imagens, etc.

8. Deploy:
   • Frontend: Implantado no Vercel, com integração contínua com o repositório do GitHub.
   • Backend: Hospedado no Railway.

9. Próximos Passos:
   • Funcionalidades Adicionais:
   o Seção de depoimentos ou recomendações.
   • Autenticação e Autorização (opcional):
   o Restringir o acesso a alguns endpoints da API (como criar, atualizar e excluir posts), você precisará implementar um sistema de autenticação e autorização.
   o Integração com outras APIs (por exemplo, para exibir projetos do GitHub).
   • Melhorias de Design:
   o Explorar diferentes layouts para as páginas: Blog e Artigo do blog. E diferentes estilos visuais(Fontes, PopUps, etc…).
   • Otimização de Performance:
   o Implementar técnicas de otimização de imagens e carregamento preguiçoso (lazy loading).
   o Minificar e otimizar o código CSS e JavaScript.
   • Testes:
   o Escrever testes unitários e de integração para garantir a qualidade do código e evitar regressões.

Observações:
• Se gostou ajude-me a crescer e deixe o teu feedback

<h3 align="left">Connect with me:</h3>
<p align="left"> Linkedin: www.linkedin.com/in/mario-afonso-018107141
</p>

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
