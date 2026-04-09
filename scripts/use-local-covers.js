require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaNeon } = require('@prisma/adapter-neon');

async function main() {
  const prisma = new PrismaClient({
    adapter: new PrismaNeon({
      connectionString: process.env.DATABASE_URL,
    }),
  });

  const updates = [
    { title: 'God of War Ragnarök', cover: '/imgs/god-of-war-ragnarok.jpg' },
    { title: 'Halo Infinite', cover: '/imgs/halo-infinite.jpg' },
    { title: 'The Legend of Zelda: Tears of the Kingdom', cover: '/imgs/zelda-tears-of-the-kingdom.jpg' },
    { title: 'Elden Ring', cover: '/imgs/elden-ring.jpg' },
    { title: 'Forza Horizon 5', cover: '/imgs/forza-horizon-5.jpg' },
    { title: 'Pokémon Scarlet', cover: '/imgs/pokemon-scarlet.jpg' },
    { title: 'Spider-Man 2', cover: '/imgs/spider-man-2.jpg' },
    { title: 'Starfield', cover: '/imgs/starfield.jpg' },
    { title: 'Mario Kart 9', cover: '/imgs/mario-kart-9.jpg' },
    { title: 'Hogwarts Legacy', cover: '/imgs/hogwarts-legacy.jpg' },
  ];

  for (const { title, cover } of updates) {
    const result = await prisma.game.updateMany({
      where: { title },
      data: { cover },
    });
    console.log(`Updated ${title}: ${result.count} record(s)`);
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
