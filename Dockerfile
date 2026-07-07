# Frontend image — builds TanStack Start app and runs the Nitro node-server output
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
ENV PORT=3000
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# TanStack Start (Nitro node-server preset) emits the entire runnable server
# under .output/ — it is self-contained and does not need node_modules.
COPY --from=builder /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
