Documentação do Projeto: Portifolio e Blog Pessoal

1. Visão Geral:
   • Nome do Projeto: Portifolio e Blog Pessoal
   • Descrição: O meu portfólio online para apresentar os meus projetos, habilidades e experiência profissional.
   • Público-alvo: Potenciais empregadores, clientes e colaboradores.
   • Plataformas: Web (responsivo para diferentes dispositivos).

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
