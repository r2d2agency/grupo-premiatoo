# Frontend image — builds TanStack Start app and runs the Nitro node server
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json bun.lock* ./
RUN npm install --legacy-peer-deps

COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Nitro node-server preset outputs a self-contained server at .output/
COPY --from=builder /app/.output ./.output

EXPOSE 3000
ENV PORT=3000
CMD ["node", ".output/server/index.mjs"]
