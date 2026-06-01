# Backend image — Node 20 alpine, runs migrations + seed + server
FROM node:20-alpine

WORKDIR /app

# OpenSSL needed by Prisma on alpine
RUN apk add --no-cache openssl

COPY package.json ./
COPY prisma ./prisma
RUN npm install --omit=dev && npx prisma generate

COPY src ./src

ENV NODE_ENV=production
EXPOSE 4000

# Run migrations + seed (idempotent) + start
# Clear schema public CASCADE then push tables + seed + start
CMD sh -c "node -e \"const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma['\$executeRawUnsafe']('DROP SCHEMA public CASCADE; CREATE SCHEMA public;').finally(() => prisma['\$disconnect']());\" && npx prisma db push --force-reset && npx prisma db seed && node src/index.js"
