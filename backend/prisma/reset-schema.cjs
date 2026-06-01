const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function resetSchema() {
  console.log('Resetting public schema before Prisma db push...');

  await prisma.$executeRawUnsafe('DROP SCHEMA IF EXISTS public CASCADE');
  await prisma.$executeRawUnsafe('CREATE SCHEMA public');
  await prisma.$executeRawUnsafe('GRANT ALL ON SCHEMA public TO public');

  console.log('Public schema reset complete.');
}

resetSchema()
  .catch((error) => {
    console.error('Public schema reset failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });