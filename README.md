
# RID195440_Desafio7

API RESTful desenvolvida com NestJS, utilizando PostgreSQL e Prisma ORM, como parte do Desafio 7 da Escola DNC. Trata-se de um sistema de gerenciamento de usuários com autenticação segura via JWT e hash de senhas com Bcrypt.

## 📌 Descrição do Projeto

A aplicação permite o gerenciamento completo de usuários, incluindo:

- Criação de novos usuários com validação de dados.
- Leitura de usuários por ID e listagem geral.
- Atualização e remoção de usuários.
- Autenticação de usuários com geração de tokens JWT.
- Proteção de rotas com validação de token.
- Hash seguro de senhas usando Bcrypt.
- Arquitetura baseada em módulos e serviços do NestJS.

## ⚙️ Tecnologias Utilizadas

- **NestJS**: Framework escalável para Node.js.
- **Prisma ORM**: ORM moderno para trabalhar com PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado na aplicação.
- **Bcrypt**: Utilizado para criptografia de senhas.
- **JWT (JSON Web Token)**: Para autenticação e autorização.
- **dotenv**: Gerenciamento de variáveis de ambiente.

## 🚀 Como Executar Localmente

1. **Clone o repositório**
```bash
git clone https://github.com/LGKARD/rid195440_desafio7.git
```

2. **Acesse a pasta**
```bash
cd rid195440_desafio7
```

3. **Instale as dependências**
```bash
npm install
```

4. **Configure o banco de dados**
- Crie um banco PostgreSQL local.
- Renomeie o arquivo `.env.example` para `.env` e configure as variáveis:
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_jwt_segura"
```

5. **Rode as migrações do Prisma**
```bash
npx prisma migrate dev
```

6. **Inicie o servidor**
```bash
npm run start:dev
```

A aplicação estará disponível em:
👉 `http://localhost:3000`

## ✅ Funcionalidades

### Usuários
- **POST /users** – Criação de usuário com senha criptografada.
- **GET /users/:id** – Consulta de usuário por ID.
- **GET /users** – Listagem de todos os usuários.
- **PATCH /users/:id** – Atualização de dados do usuário.
- **DELETE /users/:id** – Exclusão de usuário.

### Autenticação
- **POST /auth/login** – Autenticação de usuário com e-mail e senha.
- Geração de **token JWT** em caso de sucesso.
- Proteção de rotas autenticadas via middleware JWT.

## 📦 Exemplo de Requisição

🔹 **Criação de Usuário (POST /usuarios)**
```json
{
    "name": "teste",
    "email": "teste@gmail.com",
    "password": "12345",
    "role": "USER"
}
```

🔹 **Login (POST /auth/login)**
```json
{
  "email": "teste@email.com",
  "password": "12345"
}
```
Retorno:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

🔹 **Requisição Autenticada**
Inclua o token no header para acessar rotas protegidas:
```
Authorization: Bearer <access_token>
```

🔹 **Forgot Password (POST /auth/forgot-password**
```json
{
    "email": "teste@gmail.com"
}
```
Retorno:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

🔹 **Reset Password (PATCH /auth/reset-password**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    "password": "123456789"
}
```
Retorno:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```



## ⚠️ Observações

- É necessário ter o PostgreSQL instalado e rodando localmente.
- Os dados são persistidos via Prisma no banco de dados configurado no `.env`.
- A estrutura do projeto segue os padrões do NestJS, com separação clara entre módulos, controllers e services.
- O sistema não inclui frontend – apenas a API backend.

## ✍️ Autor

Desenvolvido por **LG Kard** como parte do curso de Tecnologia da Escola DNC.  
🔗 [Repositório no GitHub](https://github.com/LGKARD/rid195440_desafio7)
