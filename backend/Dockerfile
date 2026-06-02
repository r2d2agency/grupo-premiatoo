# Backend image — Node 20 alpine
FROM node:20-alpine

WORKDIR /app

# OpenSSL needed by Prisma on alpine
RUN apk add --no-cache openssl

COPY package.json ./
COPY prisma ./prisma
RUN npm install --omit=dev --legacy-peer-deps && npx prisma generate

COPY src ./src

ENV NODE_ENV=production
EXPOSE 4000

CMD ["npm", "start"]
