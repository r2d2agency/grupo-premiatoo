# Frontend image — builds TanStack Start app and runs the Nitro node server
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json bun.lock* ./
RUN npm install --legacy-peer-deps

COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN unset DEV_SERVER__PROJECT_PATH LOVABLE_SANDBOX && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Nitro node-server output is fully self-contained under .output/
COPY --from=builder /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
