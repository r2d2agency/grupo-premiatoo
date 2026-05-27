# Garantidora Premiatto — Site institucional + CMS

Stack pronta para deploy no **EasyPanel** (ou qualquer host Docker):

- **Frontend** — TanStack Start (React 19 + Vite + Tailwind v4)
- **Backend** — Node.js + Express + Prisma + JWT + Helmet + Compression
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

## Deploy no EasyPanel (Passo a Passo)

Siga esta ordem para garantir que as comunicações funcionem:

### 1. Banco de Dados (PostgreSQL)
1. Clique em **+ Create Service** -> **Database** -> **PostgreSQL**.
2. Nome do serviço: `db-premiatto`.
3. O EasyPanel gerará credenciais automaticamente.
4. Anote a **Internal URL** (ex: `postgres://...:5432/...`).

### 2. Backend (API)
1. Clique em **+ Create Service** -> **App**.
2. **Source**: Seu repositório GitHub.
3. **Build Path**: `/backend`
4. **Dockerfile Path**: `Dockerfile` (está dentro da pasta backend)
5. **Environment Variables**:
   - `DATABASE_URL`: Cole a Internal URL do banco criado acima.
   - `JWT_SECRET`: Gere uma chave aleatória longa.
   - `ADMIN_EMAIL`: `admin@premiatto.com`
   - `ADMIN_PASSWORD`: Uma senha forte para o CMS.
   - `CORS_ORIGIN`: `https://seudominio.com` (URL final do site).
   - `PORT`: `4000`
6. **Domains**: Configure um subdomínio, ex: `api.seudominio.com`.

### 3. Frontend (Site)
1. Clique em **+ Create Service** -> **App**.
2. **Source**: Seu repositório GitHub.
3. **Build Path**: `/`
4. **Dockerfile Path**: `Dockerfile` (na raiz)
5. **Build Arguments**:
   - `VITE_API_URL`: `https://api.seudominio.com` (URL da API criada acima).
6. **Environment Variables**:
   - `VITE_API_URL`: `https://api.seudominio.com`
7. **Domains**: Configure o domínio principal, ex: `seudominio.com`.

---

## Estrutura do Projeto

```
.
├── src/                    # Frontend (TanStack Start)
│   ├── routes/
│   │   ├── index.tsx       # Home replicando o layout
│   │   ├── admin.login.tsx # Login do CMS
│   │   └── admin.index.tsx # Painel do CMS
│   └── components/site/    # Componentes modulares
├── backend/                # API Express + Prisma
│   ├── src/index.js
│   ├── prisma/schema.prisma
│   └── Dockerfile
├── Dockerfile              # Dockerfile do Frontend
└── docker-compose.yml      # Orquestração local
```

---

## CMS — O que é editável

O painel `/admin` salva tudo no Postgres (tabela `SiteContent`, JSON):

- **Hero** — Título, subtítulo, botões e imagem.
- **Estatísticas** — 4 blocos de dados.
- **Garantias** — 6 cards principais.
- **Premiatto Capital** — Seção de soluções financeiras.

---

## Dicas para Produção no EasyPanel

1. **Health Checks**:
   - No Backend, aponte para `/health` na porta `4000`.
   - No Frontend, aponte para `/` na porta `3000`.
2. **SSL**: O EasyPanel gerencia automaticamente via Let's Encrypt.
3. **Segurança**: Nunca deixe a senha padrão `premiatto123` em produção.
