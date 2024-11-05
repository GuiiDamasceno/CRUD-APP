# Projeto de Dashboard com CRUD de Usuários e Autenticação

Este projeto é um sistema de dashboard desenvolvido com **Next.js** e **TypeScript**, que inclui autenticação, autorização e controle de permissões com **JWT** e funcionalidades CRUD (Create, Read, Update, Delete) para gerenciamento de usuários. 

### Funcionalidades Principais

1. **Autenticação e Autorização**: Utiliza JWT para autenticar usuários e gerenciar permissões de acesso a rotas protegidas.
2. **CRUD de Usuários**: Permite cadastrar, listar, editar e deletar usuários. Cada usuário tem permissões específicas.

### Tecnologias Utilizadas

- [NextJS](https://nextjs.org/): Estrutura de rotas e APIs do projeto.
- [TypeScript](https://www.typescriptlang.org/):  Para tipagem estática e melhor manutenção do código.
- [JWT (JSON Web Token)](https://jwt.io/): Autenticação segura e controle de acesso às rotas protegidas.
- [Prisma](https://www.prisma.io/): ORM para manipulação de banco de dados.
- [Axios](https://axios-http.com/ptbr/docs/intro): Biblioteca para requisições HTTP no frontend.
- [React Hook Form](https://www.react-hook-form.com/): Gerenciamento de formulários de forma otimizada.
- [ShadCN](https://ui.shadcn.com/): Biblioteca de componentes de interface para paginação e estilização.
- [Docker](https://www.docker.com/): Containerização da aplicação para facilitar o deploy e desenvolvimento.

### Estrutura do Projeto

- **Roteamento e APIs**: Localizadas em `app/api`, com rotas dedicadas para login, listagem, edição e exclusão de usuários.
- **Componentes**: Componentes de lista de usuários e formulário de edição, integrados com paginação e estilização de UI.
- **Autenticação Middleware**: Middleware de autenticação para proteger rotas e verificar o token JWT.

### Como Executar o Projeto

#### Método 1: Execução Local

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/GuiiDamasceno/CRUD-APP.git
   cd crud-app
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configuração do Ambiente**:
   - Crie um arquivo `.env.local` na raiz do projeto e configure as variáveis de ambiente, incluindo a `JWT_SECRET`.

4. **Inicie o Servidor**:
   ```bash
   npm run dev
   ```

5. **Acesse o Projeto**: Navegue até [http://localhost:3000](http://localhost:3000).

#### Método 2: Usando Docker

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Configuração do Ambiente**:
   - Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias:
     ```env
     DATABASE_URL="file:/app/prisma/dev.db"
     JWT_SECRET="sua-chave-secreta"
     ```

3. **Build e Execute com Docker Compose**:
   ```bash
   # Construir a imagem
   docker-compose build

   # Iniciar os containers
   docker-compose up
   ```

4. **Acesse o Projeto**: Navegue até [http://localhost:3000](http://localhost:3000).

### Estrutura Docker

O projeto utiliza Docker para containerização, com os seguintes componentes:

- **Dockerfile**: Configura o ambiente Node.js e as dependências do projeto
- **docker-compose.yml**: Orquestra os serviços necessários para a aplicação
- **Volumes**: Persiste o banco de dados SQLite e permite desenvolvimento em tempo real

### Melhorias Futuras

- **Filtros e busca avançada** na lista de usuários.
- **Funcionalidade de exportação de dados**.
- **Notificações e logs de auditoria** para operações CRUD.
- **Páginação** para uma experiência de usuário mais organizada.
- **Containerização multi-stage** para otimização do build em produção.

Este projeto é uma base para sistemas administrativos, fornecendo segurança e facilidade de uso em uma estrutura moderna e escalável.

---
  <p align="center">
    Desenvolvido por: Guilherme Damasceno
  </p>
