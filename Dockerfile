# Frontend image — builds TanStack Start app and runs the Node server
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json bun.lockb* package-lock.json* ./
RUN npm install --legacy-peer-deps
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
