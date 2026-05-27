# Garantidora Premiatto — Site institucional + CMS

Stack pronta para deploy no **EasyPanel** (ou qualquer host Docker):

- **Frontend** — TanStack Start (React 19 + Vite + Tailwind v4)
- **Backend** — Node.js + Express + Prisma + JWT
- **Banco** — PostgreSQL
- **CMS** — painel `/admin` para editar hero, estatísticas, garantias e Premiatto Capital

---

## Rodar local

```bash
docker compose up --build
```

- Site: <http://localhost:3000>
- API: <http://localhost:4000/health>
- Painel CMS: <http://localhost:3000/admin/login>
  - **Login:** `admin@premiatto.com`
  - **Senha:** `premiatto123` (defina via `ADMIN_PASSWORD`)

---

## Deploy no EasyPanel

Crie **3 serviços** no mesmo projeto:

### 1. PostgreSQL
- Template oficial **Postgres 16**
- Anote `DATABASE_URL` gerada

### 2. Backend (`/backend`)
- **App type:** Dockerfile
- **Build path:** `backend/`
- **Porta:** `4000`
- **Variáveis de ambiente:**
  ```
  DATABASE_URL=postgresql://USER:PASS@HOST:5432/DB
  JWT_SECRET=uma-chave-longa-aleatoria
  ADMIN_EMAIL=admin@premiatto.com
  ADMIN_PASSWORD=uma-senha-forte
  CORS_ORIGIN=https://seudominio.com
  PORT=4000
  ```
- O container roda automaticamente `prisma migrate deploy` + seed no boot.
- Habilite um **domínio público**, ex: `api.seudominio.com`.

### 3. Frontend (raiz do repositório)
- **App type:** Dockerfile
- **Build path:** `/`
- **Porta:** `3000`
- **Build argument:**
  ```
  VITE_API_URL=https://api.seudominio.com
  ```
- Domínio público: `seudominio.com`.

> **Importante:** atualize `CORS_ORIGIN` no backend com o domínio do frontend após o deploy.

---

## Estrutura

```
.
├── src/                    # Frontend (TanStack Start)
│   ├── routes/
│   │   ├── index.tsx       # Home replicando o layout
│   │   ├── admin.login.tsx # Login do CMS
│   │   └── admin.index.tsx # Painel do CMS
│   └── components/site/    # Header, Hero, BrandCards, Stats, etc.
├── backend/                # API Express + Prisma
│   ├── src/index.js
│   ├── prisma/schema.prisma
│   └── Dockerfile
├── Dockerfile              # Frontend
└── docker-compose.yml      # Stack completa local
```

---

## CMS — o que dá pra editar

O painel `/admin` salva tudo no Postgres (tabela `SiteContent`, coluna JSON):

- **Hero** — título, subtítulo, CTAs, imagem
- **Estatísticas** — 4 blocos (valor + legenda)
- **Garantias** — 6 cards (título + ícone)
- **Premiatto Capital** — título + 5 itens (título, descrição, ícone)

O frontend faz `GET /api/content` ao carregar e usa o conteúdo retornado. Se a API estiver fora do ar, ele cai para os valores padrão embutidos.

---

## Segurança em produção

1. Troque `JWT_SECRET` e `ADMIN_PASSWORD`.
2. Restrinja `CORS_ORIGIN` ao domínio do site.
3. Use HTTPS (EasyPanel + Let's Encrypt automático).
4. Backup periódico do volume do Postgres pelo EasyPanel.
