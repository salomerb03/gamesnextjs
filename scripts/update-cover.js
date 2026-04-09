require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaNeon } = require('@prisma/adapter-neon');

async function main() {
  const prisma = new PrismaClient({
    adapter: new PrismaNeon({
      connectionString: process.env.DATABASE_URL,
    }),
  });

  const result = await prisma.game.updateMany({
    where: { cover: { endsWith: '.png' } },
    data: { cover: '/imgs/no-cover.svg' },
  });

  console.log('updated', result.count, 'games');
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
