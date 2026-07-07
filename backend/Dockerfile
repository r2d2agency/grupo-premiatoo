FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Install deps (prisma generate runs via postinstall)
COPY package.json ./
COPY prisma ./prisma
RUN npm install --omit=dev --no-audit --no-fund

# App source
COPY src ./src

# Uploads dir
RUN mkdir -p /app/uploads && chmod 777 /app/uploads

ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000

# Push schema to DB on startup (creates tables if missing), then start API
CMD ["sh", "-c", "npx prisma db push --accept-data-loss --skip-generate && node src/index.js"]
