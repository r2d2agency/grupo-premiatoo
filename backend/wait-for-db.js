import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function wait() {
  for (let i = 0; i < 30; i++) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log("✅ Banco de dados disponível");
      await prisma.$disconnect();
      process.exit(0);
    } catch (err) {
      console.log(`⏳ Tentativa ${i + 1}/30 — banco indisponível`);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  console.error("❌ Banco de dados não respondeu após 30 tentativas");
  await prisma.$disconnect();
  process.exit(1);
}

wait();
