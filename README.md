<h1 align="center">Hi 👋, I'm Mário Afonso / Ólá chamo-me Mário Afonso</h1>
<h3 align="center">from Angola to the World</h3>

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

<li>ReactQuill:</li> <p>Biblioteca para implementar o rich text nos posts.</p>

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

## Local Development

Para rodar o projeto localmente siga os passos abaixo:

### Prerequisites

Você vai precisar dos seguintes softwares instalados:

- npm
- Git
- Node.js

### Installation

1. Crie um arquivo .env.local na raiz do projeto frontend e adicione a URL da sua API:
   NEXT_PUBLIC_API_URL=https://sua-api-do-blog.railway.app

2. Install all client-side NPM packages.
   ```sh
   cd Client
   npm install
   ```

<!-- CONTRIBUTING -->

## Contributing

Contribuições são bem vindas!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/MyFeature`)
3. Commit your Changes (`git commit -m 'Add my feature'`)
4. Push to the Branch (`git push origin feature/MyFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Acknowledgements

- Glow Labs
- [ReactQuill](https://www.npmjs.com/package/react-quill)
- [next-theme from UI.org](https://nextui.org/docs/customization/dark-mode)
