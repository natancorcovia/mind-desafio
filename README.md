<div align="center">

# &lt;M/&gt; TechBlog

**Plataforma moderna de publicação de artigos tecnológicos**

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## 💡 Overview

> Blog completo com tema dark/light, upload de imagens, autenticação JWT e painel de gerenciamento.

---

## ✨ Destaques do Projeto

- 🔐 **Autenticação JWT** com NextAuth v5 — login seguro com hash bcrypt
- 🖼️ **Imagens como BLOB** — banners e avatares salvos diretamente no PostgreSQL
- 🌓 **Tema Dark/Light** — alternância com persistência no localStorage
- 📊 **Dashboard completo** — estatísticas, gerenciamento de artigos e atividade recente
- 🗂️ **Filtro por categoria** — busca em tempo real + filtro por área tecnológica
- 📋 **Grid/Lista** — alternância de layout na listagem de artigos
- 🔒 **Proteção por autoria** — apenas o autor pode editar/remover seus artigos
- 🚀 **App Router + Server Components** — arquitetura moderna do Next.js 15

---

## 🏗️ Arquitetura Fullstack

Este projeto foi desenvolvido utilizando o **Next.js 15**, que atualmente atua como um framework **fullstack**, permitindo que frontend e backend coexistam no mesmo repositório de forma organizada e desacoplada.

Embora o desafio solicitasse separação entre frontend e backend, optei por utilizar a arquitetura moderna do App Router, mantendo responsabilidades claramente divididas por camadas dentro da aplicação.

### Estrutura de Responsabilidades

```bash
src/
├── app/
│   ├── (auth)/         # Fluxo de autenticação
│   ├── api/            # API Routes (backend)
│   ├── articles/       # Páginas de artigos
│   ├── dashboard/      # Painel administrativo
│   ├── settings/       # Configurações do usuário
│   ├── layout.tsx      # Layout global
│   ├── page.tsx        # Home page
│   └── globals.css     # Estilos globais
│
├── components/         # Componentes reutilizáveis
├── lib/                # Prisma, auth, helpers e regras de negócio
├── types/              # Tipagens TypeScript
```

### Separação Arquitetural

| Camada | Responsabilidade |
|--------|-----------------|
| `src/app` | Renderização da interface e rotas da aplicação |
| `src/app/api` | Endpoints REST e camada backend |
| `src/lib` | Serviços, autenticação, ORM e regras de negócio |
| `prisma/` | Schema, migrations e seed do banco |
| `components/` | Componentização e reutilização de UI |

### Benefícios da Arquitetura

- Compartilhamento seguro de tipagem entre client/server
- Menor acoplamento entre frontend e backend
- Melhor experiência de desenvolvimento
- Server Components e SSR nativos
- Estrutura escalável e moderna
- Redução de boilerplate comparado a arquiteturas separadas

> 💡 Apesar de estar em um único repositório, a aplicação mantém separação lógica entre camadas, seguindo princípios modernos de arquitetura fullstack.

### Separação de Responsabilidades

| Camada | Tecnologia | Responsabilidade |
|--------|-----------|-----------------|
| **Frontend** | Next.js + Tailwind | Interface, Server Components, Client Components |
| **Backend** | Next.js API Routes | REST API, autenticação, regras de negócio |
| **ORM** | Prisma v6 | Queries, migrations, type safety |
| **Banco** | PostgreSQL (Neon) | Persistência, incluindo BLOBs de imagens |
| **Auth** | NextAuth v5 + JWT | Sessão, proteção de rotas |

---

## 🔌 API Reference

### Artigos

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `GET` | `/api/articles` | ❌ | Lista todos os artigos |
| `POST` | `/api/articles` | ✅ | Cria um artigo |
| `GET` | `/api/articles/:id` | ❌ | Busca um artigo |
| `PATCH` | `/api/articles/:id` | ✅ autor | Edita um artigo |
| `DELETE` | `/api/articles/:id` | ✅ autor | Remove um artigo |
| `GET` | `/api/articles/:id/banner` | ❌ | Serve o banner (BLOB) |

### Autenticação

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `POST` | `/api/auth/register` | ❌ | Cadastra usuário |
| `POST` | `/api/auth/signin` | ❌ | Login (NextAuth) |

### Perfil

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `GET` | `/api/profile` | ✅ | Busca perfil |
| `PATCH` | `/api/profile` | ✅ | Atualiza perfil |
| `GET` | `/api/profile/avatar` | ✅ | Serve o avatar (BLOB) |

---

## 🛠️ Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- Conta gratuita no [Neon](https://neon.tech) (PostgreSQL serverless)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/tech-blog.git
cd tech-blog
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
# Neon PostgreSQL — Connection Pooling (runtime)
DATABASE_URL="postgresql://usuario:senha@host-pooler.neon.tech/neondb?sslmode=require"

# Neon PostgreSQL — Direct Connection (migrations)
DIRECT_URL="postgresql://usuario:senha@host.neon.tech/neondb?sslmode=require"

# NextAuth
AUTH_SECRET="gere-com-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

> 💡 Para gerar o `AUTH_SECRET`:
> ```bash
> openssl rand -base64 32
> ```

> 💡 As duas URLs do Neon são necessárias:
> - `DATABASE_URL` usa o **pooler** (com `-pooler` no hostname) — para runtime
> - `DIRECT_URL` usa a conexão **direta** (sem `-pooler`) — para migrations

### 4. Sincronize o banco de dados

```bash
npx prisma db push
```

### 5. Popule o banco com dados de exemplo

```bash
npx prisma db seed
```

Isso cria **15 artigos** com imagens reais (baixadas do Unsplash e salvas como BLOB) distribuídos entre as categorias:

| Categoria | Artigos |
|-----------|---------|
| Inteligência Artificial | 3 |
| Desenvolvimento Web | 3 |
| DevOps | 3 |
| Mobile | 3 |
| Segurança | 3 |

**Credenciais do usuário seed:**

Email: seed@techblog.com
Senha: 123456

### 6. Inicie o servidor

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) 🚀

---

## 🗄️ Modelo de Dados

```prisma
model User {
  id         String    @id @default(cuid())
  name       String
  email      String    @unique
  password   String    # bcrypt hash
  bio        String?
  avatarData Bytes?    # BLOB
  avatarMime String?
  createdAt  DateTime  @default(now())
  articles   Article[]
}

model Article {
  id             String   @id @default(cuid())
  title          String
  content        String
  category       String   @default("desenvolvimento-web")
  bannerData     Bytes?   # BLOB
  bannerMimeType String?
  publishedAt    DateTime @default(now())
  updatedAt      DateTime @updatedAt
  authorId       String
  author         User     @relation(...)
}
```

---

## 🔮 Melhorias Futuras

- [ ] **Editor rich text** com TipTap ou Quill
- [ ] **Sistema de comentários** real (atualmente mockado)
- [ ] **Curtidas** com contador real no banco
- [ ] **Contador de visualizações** por artigo
- [ ] **Paginação** na listagem de artigos
- [ ] **Busca full-text** com PostgreSQL `tsvector`
- [ ] **Tags** nos artigos com filtro
- [ ] **Newsletter** funcional com integração de e-mail
- [ ] **Notificações** em tempo real com WebSockets
- [ ] **OAuth** (Google, GitHub) via NextAuth

---

## 📄 Licença

MIT © [Natan Corcovia](https://github.com/seu-usuario)

---

<div align="center">
  Feito com ❤️ por <a href="https://github.com/natancorcovia">Natan Corcovia</a>
</div>
