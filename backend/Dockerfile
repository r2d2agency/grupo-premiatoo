FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package.json ./
COPY prisma ./prisma
RUN npm install --omit=dev && npx prisma generate

COPY src ./src

# Create uploads directory and set permissions
RUN mkdir -p /app/uploads && chmod 777 /app/uploads

COPY start.sh ./start.sh
RUN chmod +x ./start.sh

EXPOSE 4000
CMD ["./start.sh"]
