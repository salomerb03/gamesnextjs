require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaNeon } = require('@prisma/adapter-neon');

async function main() {
  const prisma = new PrismaClient({
    adapter: new PrismaNeon({
      connectionString: process.env.DATABASE_URL,
    }),
  });

  const games = await prisma.game.findMany();
  console.log('games:', games.map((g) => ({ title: g.title, cover: g.cover })));

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
