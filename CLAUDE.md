# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

Site institucional do **Projeto Padres para a Igreja de Palmas** — iniciativa vocacional da Arquidiocese de Palmas-TO. Todo o conteúdo é em português brasileiro (pt-BR). Inclui blog com painel administrativo protegido por login social Google.

## Comandos

```bash
npm run dev        # Dev server na porta 3000
npm run build      # Build de produção (output: dist/)
npm run preview    # Preview do build de produção
npm run check      # Verificação TypeScript (astro check)
npm run format     # Formatação com Prettier
npx drizzle-kit push   # Push do schema para o banco
npx drizzle-kit studio # Interface visual do banco
```

## Stack

- **Astro 6** — SSG com opt-in SSR por rota (`export const prerender = false`)
- **Tailwind CSS v4** — via plugin Vite (`@tailwindcss/vite`), configurado com `@theme` em `src/styles/global.css`
- **TypeScript** — config strict, path alias `@/*` → `./src/*`
- **Better-Auth** — autenticação com Google OAuth
- **Drizzle ORM + PostgreSQL** — banco de dados (Neon em produção, Docker local)
- **marked** — renderização Markdown → HTML para posts do blog
- **Vercel** — deploy com adapter `@astrojs/vercel`, analytics e speed insights

## Arquitetura

### Estrutura de diretórios

- `src/pages/` — Rotas do site e API endpoints
- `src/pages/api/auth/` — Catch-all handler do Better-Auth
- `src/pages/api/posts/` — CRUD de posts (GET, POST, PUT, DELETE)
- `src/pages/admin/` — Painel admin (dashboard, criar, editar posts)
- `src/pages/blog/` — Blog público (listagem e posts individuais)
- `src/components/` — Componentes Astro (sem framework JS — interatividade via `<script>` inline)
- `src/layouts/` — `BaseLayout` → `MainLayout` (site público) e `AdminLayout` (painel admin)
- `src/db/` — Schema Drizzle (`schema.ts`) e cliente DB (`index.ts`)
- `src/lib/` — Configuração Better-Auth server (`auth.ts`) e client (`auth-client.ts`)
- `src/middleware.ts` — Sessão de auth + proteção de rotas `/admin`
- `src/consts.ts` — Constantes centralizadas
- `src/styles/global.css` — Tema Tailwind v4, fontes e utilitários (inclui `.prose` para markdown)

### Renderização

- **Páginas estáticas (prerendered):** `linktree.astro`
- **Páginas server-rendered (SSR):** homepage, blog, login, admin, API routes
- O middleware ignora rotas prerendered (array `PRERENDERED_ROUTES`)

### Autenticação e permissões

- Login via Google OAuth (Better-Auth)
- Middleware (`src/middleware.ts`) popula `Astro.locals.user` e `Astro.locals.session`
- Rotas `/admin/*` protegidas: redireciona para `/login` se não autenticado
- Apenas emails cadastrados na tabela `allowed_emails` podem acessar o admin
- Tabelas de auth: `user`, `session`, `account`, `verification` (gerenciadas pelo Better-Auth)

### Blog

- Posts armazenados na tabela `posts` do PostgreSQL (não em arquivos Markdown)
- Conteúdo escrito em Markdown, renderizado com `marked` em runtime
- Estilos de prosa definidos em `global.css` (classe `.prose`)
- Admin cria/edita posts via formulários que chamam `/api/posts` endpoints

### Banco de dados

- Schema em `src/db/schema.ts` — tabelas: `user`, `session`, `account`, `verification`, `posts`, `allowedEmails`
- Cliente em `src/db/index.ts` — usa `postgres` (postgres.js) + `drizzle-orm/postgres-js`
- Config Drizzle Kit em `drizzle.config.ts` na raiz
- Variável `DATABASE_URL` no `.env`

### Header scroll-aware

O Header detecta se é homepage via `data-is-home`. Na homepage, começa transparente e fica sólido ao scrollar. Nas demais páginas, começa sólido. Script envolvido em `astro:page-load` para compatibilidade com view transitions.

### Paleta de cores (Tailwind)

Cores customizadas em `global.css`: `azul`, `amarelo`, `verde`, `marrom`, `grafite`, e variantes `bg-*` para fundos de seções.

### Tipografia

- **Cinzel** (`--font-display`) — títulos e headings
- **Lato** (`--font-body`) — corpo do texto
- **Poppins** — usada apenas na página linktree

## Variáveis de ambiente

```
DATABASE_URL=postgresql://...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:3000
```

## Formatação

Prettier com: sem ponto-e-vírgula, aspas simples, 2 espaços, 100 colunas, arrow parens "avoid". Plugin para Astro e Tailwind.
