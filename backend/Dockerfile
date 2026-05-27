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
CMD sh -c "npx prisma migrate deploy && node prisma/seed.js || true && node src/index.js"
