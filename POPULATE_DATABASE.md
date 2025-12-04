# Como Popular o Banco de Dados

## Opção 1: Usar o script seedData.js (Recomendado)

Este script tem todos os dados hardcoded e é mais confiável:

```bash
cd backend
npm run seed
```

Este script irá:
- Conectar ao MongoDB
- Limpar dados existentes (opcional)
- Criar Profile, Projects, Skills, Education, Experience e Languages
- Mostrar resumo do que foi criado

## Opção 2: Usar o script populateDatabase.js

Este script lê o arquivo JSON consolidado:

```bash
cd backend
npm run populate
```

**Nota**: Este script precisa encontrar o arquivo `portfolioData.json` no frontend. Se não encontrar, use a Opção 1.

## Pré-requisitos

1. **MongoDB rodando e configurado**
   - Certifique-se de que o MongoDB está rodando
   - Configure a variável `MONGO_URI` no arquivo `.env`

2. **Arquivo .env configurado**
   ```env
   PORT=3001
   MONGO_URI=mongodb://localhost:27017/victor_portfolio
   # ou sua connection string do MongoDB Atlas
   JWT_SECRET=seu_secret_key_seguro
   JWT_EXPIRES_IN=7d
   ```

3. **Dependências instaladas**
   ```bash
   cd backend
   npm install
   ```

## Verificar se funcionou

Após executar o script, você pode verificar:

1. **Via API**:
   ```bash
   curl http://localhost:3001/api/projects
   curl http://localhost:3001/api/skills
   curl http://localhost:3001/api/profile
   ```

2. **Via MongoDB Compass ou CLI**:
   ```bash
   mongo
   use victor_portfolio
   db.projects.count()
   db.skills.count()
   ```

## Dados que serão criados

- **1 Profile** - Informações pessoais
- **6 Projects** - Projetos do portfólio
- **21 Skills** - Skills técnicas
- **11 Education** - Educação e certificações
- **6 Experience** - Experiências profissionais
- **2 Languages** - Idiomas

## Troubleshooting

### Erro de conexão com MongoDB
- Verifique se o MongoDB está rodando
- Verifique se a `MONGO_URI` está correta
- Teste a conexão: `mongosh "sua_connection_string"`

### Erro "Module not found"
- Execute `npm install` no diretório backend
- Verifique se está no diretório correto

### Dados não aparecem
- Verifique os logs do script
- Verifique se não há erros de validação
- Tente limpar o banco manualmente e executar novamente

