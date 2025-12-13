<h1 align="center">Olá 👋, eu sou Mário Afonso / Hi, I'm Mário Afonso</h1>
<h3 align="center">de Angola para o Mundo</h3>

<p align="center">
  Demo ao vivo do projeto: <a href="https://victor-portfolio-sepia.vercel.app/">https://victor-portfolio-sepia.vercel.app/</a>
</p>

<p align="center">
  Compartilho contigo o meu portfólio criado do zero, utilizando APIs externas para dados dinâmicos.
</p>

<h3 align="center">Linguagens e Ferramentas:</h3>
<p align="center">
  <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
    <img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" alt="nextjs" width="40" height="40"/>
  </a>
  <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>
  </a>
  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/>
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/>
  </a>
</p>
<h1>Visão Geral do Projeto:</h1>
<ul>
<li><strong>Nome do Projeto:</strong> Portfólio e Blog Pessoal de Mário Afonso.</li>
<li><strong>Descrição:</strong> Um portfólio online responsivo para apresentar projetos, habilidades e experiência profissional, com integração de APIs externas para dados dinâmicos.</li>
<li><strong>Público-alvo:</strong> Potenciais empregadores, clientes e colaboradores.</li>
<li><strong>Plataformas:</strong> Web (responsivo para diferentes dispositivos).</li>
<li><strong>Arquitetura:</strong> Frontend Next.js consumindo APIs externas (PortfolioHub) para conteúdo público e uma API interna para operações administrativas.</li>
</ul>

<h1>Funcionalidades Principais (Frontend):</h1>
<ul>
<li><strong>Home:</strong>
Apresentação geral com nome, breve descrição e foto.
Destaque para projetos selecionados.
Links para as outras seções do portfólio (Projetos, Blog, Sobre).
<li><strong>Projetos:</strong>
Lista de projetos obtidos via API externa (PortfolioHub), com imagens, descrições e links para demonstrações ou repositórios.
Filtros por categoria ou tecnologias utilizadas.
<li><strong>Blog:</strong>
Lista de artigos obtidos via API externa, com títulos, resumos e datas de publicação.
Página de detalhes para cada artigo com o conteúdo completo.
<li><strong>Sobre:</strong>
Informações sobre experiência profissional, habilidades e interesses obtidas via API.
Links para redes sociais e contato.
</ul>

<h1>Tecnologias Utilizadas (Frontend):</h1>
<ul>
<li><strong>Next.js:</strong>
Framework React para renderização do lado do servidor (SSR) e geração de sites estáticos.
<li><strong>Tailwind CSS:</strong>
Framework CSS utilitário para estilização rápida e responsiva.
<li><strong>TypeScript:</strong>
Superset do JavaScript para tipagem estática e melhor desenvolvimento.
<li><strong>Axios:</strong>
Biblioteca para fazer requisições HTTP às APIs externas e internas.
<li><strong>SWR:</strong>
Biblioteca React para data fetching e cache inteligente, utilizada para consumir APIs com revalidação automática.
<li><strong>PortfolioHub API:</strong>
API externa (https://portfoliohub-y8ds.onrender.com) para obter dados públicos do portfólio (projetos, posts, perfil, etc.).
<li><strong>API Interna:</strong>
API própria para operações administrativas autenticadas (CRUD de projetos, posts, etc.).
<li><strong>Next Themes:</strong>
Biblioteca para implementar o modo claro/escuro (dark mode).
<li><strong>Vercel:</strong>
Plataforma de hospedagem e deploy para aplicações Next.js.
</ul>

<h1>Integração com APIs:</h1>
<ul>
<li><strong>PortfolioHub API (Externa):</strong>
<p>API pública disponibilizada pelo serviço PortfolioHub para dados do portfólio: https://portfoliohub-y8ds.onrender.com/api/public/marioafonso1997</p>
<p>Fornece dados para: perfil, projetos, posts do blog, experiências, educação, habilidades, idiomas.</p>
<p>Utiliza cache inteligente com SWR para otimização de performance.</p>

<h1>Deploy:</h1>
<ul>
<li><strong>Frontend:</strong>
<p>Implantado no Vercel, com integração contínua com o repositório do GitHub.</p>
<p>Variáveis de ambiente configuradas para URLs das APIs.</p>
<li><strong>API Interna:</strong>
<p>Hospedada no Railway com banco de dados MongoDB.</p>
<p>API externa PortfolioHub hospedada em serviço de render.</p>
</ul>

<h1>Próximos Passos:</h1>
<ul>
<li><strong>Funcionalidades Adicionais:</strong>
<p>Seção de depoimentos ou recomendações.</p>
<li><strong>Autenticação e Autorização:</strong>
<p>Melhorar sistema de autenticação para o painel admin.</p>
<p>Integração com mais APIs externas (GitHub, LinkedIn, etc.).</p>
<li><strong>Melhorias de Design:</strong>
<p>Explorar diferentes layouts para as páginas: Blog e Artigo do blog.</p>
<p>Diferentes estilos visuais (Fontes, PopUps, etc.).</p>
<li><strong>Otimização de Performance:</strong>
<p>Implementar técnicas de otimização de imagens e carregamento preguiçoso (lazy loading).</p>
<p>Minificar e otimizar o código CSS e JavaScript.</p>
<p>Otimizar cache das APIs com SWR.</p>
<li><strong>Testes:</strong>
<p>Escrever testes unitários e de integração para garantir a qualidade do código.</p>
<p>Testes para componentes que consomem APIs.</p>
</ul>

<h1>Observações:</h1>
<ul>
<li>Se gostou, ajude-me a crescer e deixe o seu feedback!</li>
<p align="left">
  LinkedIn: <a href="https://www.linkedin.com/in/mario-afonso-018107141">www.linkedin.com/in/mario-afonso-018107141</a>
</p>
<li><strong>Integração com APIs:</strong>
<p>O projeto demonstra integração avançada com APIs externas e internas, utilizando SWR para cache inteligente e Axios para requisições HTTP.</p>
<p>A API PortfolioHub fornece dados estruturados para todo o conteúdo público do portfólio.</p>
</ul>

## Desenvolvimento Local

Para rodar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

Você vai precisar dos seguintes softwares instalados:

- npm
- Git
- Node.js

### Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/Mario2211-debug/victor_portfolio.git
   cd victor_portfolio/frontend
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente criando um arquivo `.env.local` na raiz do projeto frontend:
   ```env
   # URL da API interna (para operações admin)
   NEXT_PUBLIC_API_URL=http://localhost:3001/api

   # Outras variáveis conforme necessário
   ```

4. Execute o projeto em modo de desenvolvimento:
   ```sh
   npm run dev
   ```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

### Funcionalidades da API

- **Dados Públicos:** Consumidos automaticamente da API PortfolioHub externa
- **Cache:** Implementado com SWR para otimização de performance

## Contributing

Contribuições são bem vindas!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/MyFeature`)
3. Commit your Changes (`git commit -m 'Add my feature'`)
4. Push to the Branch (`git push origin feature/MyFeature`)
5. Open a Pull Request

## Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [SWR](https://swr.vercel.app/) - Data fetching para React
- [Axios](https://axios-http.com/) - Cliente HTTP
- [Next Themes](https://nextui.org/docs/customization/dark-mode) - Gerenciamento de temas
- [PortfolioHub](https://portfoliohub-y8ds.onrender.com) - API externa para dados do portfólio
- [Vercel](https://vercel.com/) - Plataforma de deploy

## Licença

Distribuído sob a Licença MIT. Veja `LICENSE` para mais informações.
