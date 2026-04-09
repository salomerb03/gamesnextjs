import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {

    console.log('🌱 Starting seed...')

    // -----------------------------
    // 1. Clean database
    // -----------------------------

    await prisma.game.deleteMany()
    await prisma.console.deleteMany()

    console.log('🧹 Database cleaned')

    // -----------------------------
    // 2. Create Consoles
    // -----------------------------

    const consoles = await prisma.console.createMany({
        data: [
            {
                name: 'PlayStation 5',
                manuFacturer: 'Sony Interactive Entertainment',
                releaseDate: new Date('2020-11-12'),
                description:
                    'The PlayStation 5 (PS5) is a home video game console bringing 4K gaming at 120Hz and ray tracing support.',
            },
            {
                name: 'Xbox Series X',
                manuFacturer: 'Microsoft',
                releaseDate: new Date('2020-11-10'),
                description:
                    'The Xbox Series X is a high-performance console, featuring a custom AMD processor and 12 TFLOPS of graphical power.',
            },
            {
                name: 'Nintendo Switch OLED Model',
                manuFacturer: 'Nintendo',
                releaseDate: new Date('2021-10-08'),
                description:
                    'A hybrid console that can be used as a home console and a portable handheld device, now with a vibrant OLED screen.',
            },
            {
                name: 'Nintendo Switch 2',
                manuFacturer: 'Nintendo',
                releaseDate: new Date('2025-06-05'),
                description:
                    'The successor to the popular Nintendo Switch, featuring larger magnetic Joy-cons and enhanced performance.',
            },
            {
                name: 'Steam Deck OLED',
                manuFacturer: 'Valve',
                releaseDate: new Date('2023-11-16'),
                description:
                    'A powerful handheld gaming computer that plays PC games from your Steam library on the go.',
            },
        ],
    })

    console.log('🎮 5 consoles seeded')

    // -----------------------------
    // 3. Get consoles from DB
    // -----------------------------

    const allConsoles = await prisma.console.findMany()

    const ps5 = allConsoles.find(c => c.name === 'PlayStation 5')
    const xbox = allConsoles.find(c => c.name === 'Xbox Series X')
    const switchOLED = allConsoles.find(c => c.name === 'Nintendo Switch OLED Model')
    const switch2 = allConsoles.find(c => c.name === 'Nintendo Switch 2')
    const steamDeck = allConsoles.find(c => c.name === 'Steam Deck OLED')

    // -----------------------------
    // 4. Create Games
    // -----------------------------

    const gamesData = [
        {
            title: 'God of War Ragnarök',
            developer: 'Santa Monica Studio',
            releasedate: new Date('2022-11-09'),
            price: 69.99,
            genre: 'Action-adventure',
            description:
                'Kratos and Atreus must journey to each of the Nine Realms and find answers as the forces of Asgard prepare for a prophesied battle.',
            console_id: ps5?.id,
        },
        {
            title: 'Halo Infinite',
            developer: '343 Industries',
            releasedate: new Date('2021-12-08'),
            price: 59.99,
            genre: 'First-person shooter',
            description:
                'Master Chief returns in the most expansive Halo campaign yet.',
            console_id: xbox?.id,

        },
        {
            title: 'The Legend of Zelda: Tears of the Kingdom',
            developer: 'Nintendo EPD',
            releasedate: new Date('2023-05-12'),
            price: 69.99,
            genre: 'Action-adventure',
            description:
                'Link soars through the skies and explores new areas of Hyrule.',
            console_id: switchOLED?.id,

        },
        {
            title: 'Elden Ring',
            developer: 'FromSoftware',
            releasedate: new Date('2022-02-25'),
            price: 59.99,
            genre: 'Action role-playing',
            description:
                'A fantasy action RPG adventure set within a world created by Hidetaka Miyazaki.',
            console_id: ps5?.id,

        },
        {
            title: 'Forza Horizon 5',
            developer: 'Playground Games',
            releasedate: new Date('2021-11-09'),
            price: 59.99,
            genre: 'Racing',
            description:
                'Explore the vibrant open world landscapes of Mexico.',
            console_id: xbox?.id,

        },
        {
            title: 'Pokémon Scarlet',
            developer: 'Game Freak',
            releasedate: new Date('2022-11-18'),
            price: 59.99,
            genre: 'Role-playing',
            description:
                'Embark on a new journey in the Paldea region.',
            console_id: switchOLED?.id,

        },
        {
            title: 'Spider-Man 2',
            developer: 'Insomniac Games',
            releasedate: new Date('2023-10-20'),
            price: 69.99,
            genre: 'Action-adventure',
            description:
                'Peter Parker and Miles Morales face the Symbiote threat.',
            console_id: ps5?.id,

        },
        {
            title: 'Starfield',
            developer: 'Bethesda Game Studios',
            releasedate: new Date('2023-09-06'),
            price: 69.99,
            genre: 'Role-playing',
            description:
                'Explore the vastness of space and create your own story.',
            console_id: xbox?.id,

        },
        {
            title: 'Mario Kart 9',
            developer: 'Nintendo EPD',
            releasedate: new Date('2025-12-01'),
            price: 59.99,
            genre: 'Racing',
            description:
                'The next installment in the popular Mario Kart series.',
            console_id: switch2?.id,

        },
        {
            title: 'Hogwarts Legacy',
            developer: 'Avalanche Software',
            releasedate: new Date('2023-02-10'),
            price: 59.99,
            genre: 'Action role-playing',
            description:
                'Experience a new story set in the wizarding world.',
            console_id: steamDeck?.id,

        },
        {
            title: 'The Witcher 3: Wild Hunt',
            developer: 'CD Projekt Red',
            releasedate: new Date('2015-05-19'),
            price: 39.99,
            genre: 'Action role-playing',
            description: 'Become a monster hunter in a vast open world.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Cyberpunk 2077',
            developer: 'CD Projekt Red',
            releasedate: new Date('2020-12-10'),
            price: 59.99,
            genre: 'Action role-playing',
            description: 'Explore Night City in a futuristic RPG adventure.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Dark Souls III',
            developer: 'FromSoftware',
            releasedate: new Date('2016-04-12'),
            price: 39.99,
            genre: 'Action RPG',
            description: 'A challenging dark fantasy adventure.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Sekiro: Shadows Die Twice',
            developer: 'FromSoftware',
            releasedate: new Date('2019-03-22'),
            price: 59.99,
            genre: 'Action-adventure',
            description: 'Master stealth and combat in feudal Japan.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Red Dead Redemption 2',
            developer: 'Rockstar Games',
            releasedate: new Date('2018-10-26'),
            price: 59.99,
            genre: 'Action-adventure',
            description: 'Live the life of an outlaw in the Wild West.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Grand Theft Auto V',
            developer: 'Rockstar Games',
            releasedate: new Date('2013-09-17'),
            price: 29.99,
            genre: 'Action-adventure',
            description: 'Experience crime and chaos in Los Santos.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Hades',
            developer: 'Supergiant Games',
            releasedate: new Date('2020-09-17'),
            price: 24.99,
            genre: 'Roguelike',
            description: 'Escape the underworld in this fast-paced roguelike.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Stardew Valley',
            developer: 'ConcernedApe',
            releasedate: new Date('2016-02-26'),
            price: 14.99,
            genre: 'Simulation',
            description: 'Build your farm and live a peaceful rural life.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Terraria',
            developer: 'Re-Logic',
            releasedate: new Date('2011-05-16'),
            price: 9.99,
            genre: 'Sandbox',
            description: 'Dig, fight, explore, and build in a 2D world.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Celeste',
            developer: 'Matt Makes Games',
            releasedate: new Date('2018-01-25'),
            price: 19.99,
            genre: 'Platformer',
            description: 'Climb a mountain while overcoming inner struggles.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Dead Cells',
            developer: 'Motion Twin',
            releasedate: new Date('2018-08-07'),
            price: 24.99,
            genre: 'Roguelike',
            description: 'A fast-paced roguevania action platformer.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Hollow Knight',
            developer: 'Team Cherry',
            releasedate: new Date('2017-02-24'),
            price: 14.99,
            genre: 'Metroidvania',
            description: 'Explore a vast underground kingdom.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Cuphead',
            developer: 'Studio MDHR',
            releasedate: new Date('2017-09-29'),
            price: 19.99,
            genre: 'Run and gun',
            description: 'A classic cartoon-inspired action game.',
            console_id: steamDeck?.id,
        },
        {
            title: 'DOOM Eternal',
            developer: 'id Software',
            releasedate: new Date('2020-03-20'),
            price: 59.99,
            genre: 'First-person shooter',
            description: 'Rip and tear through hordes of demons.',
            console_id: steamDeck?.id,
        },
        {
            title: 'The Elder Scrolls V: Skyrim',
            developer: 'Bethesda Game Studios',
            releasedate: new Date('2011-11-11'),
            price: 39.99,
            genre: 'Action RPG',
            description: 'Explore a vast fantasy world as the Dragonborn.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Fallout 4',
            developer: 'Bethesda Game Studios',
            releasedate: new Date('2015-11-10'),
            price: 39.99,
            genre: 'Action RPG',
            description: 'Survive in a post-apocalyptic wasteland.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Monster Hunter: World',
            developer: 'Capcom',
            releasedate: new Date('2018-01-26'),
            price: 29.99,
            genre: 'Action RPG',
            description: 'Hunt massive monsters in a living ecosystem.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Resident Evil 2',
            developer: 'Capcom',
            releasedate: new Date('2019-01-25'),
            price: 39.99,
            genre: 'Survival horror',
            description: 'Survive a zombie outbreak in Raccoon City.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Resident Evil Village',
            developer: 'Capcom',
            releasedate: new Date('2021-05-07'),
            price: 59.99,
            genre: 'Survival horror',
            description: 'Face terrifying creatures in a mysterious village.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Control',
            developer: 'Remedy Entertainment',
            releasedate: new Date('2019-08-27'),
            price: 39.99,
            genre: 'Action-adventure',
            description: 'Explore a supernatural government agency.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Alan Wake',
            developer: 'Remedy Entertainment',
            releasedate: new Date('2010-05-14'),
            price: 19.99,
            genre: 'Action-adventure',
            description: 'A writer faces dark forces in a thriller story.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Death Stranding',
            developer: 'Kojima Productions',
            releasedate: new Date('2019-11-08'),
            price: 39.99,
            genre: 'Action',
            description: 'Reconnect a fractured world.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Metal Gear Solid V: The Phantom Pain',
            developer: 'Kojima Productions',
            releasedate: new Date('2015-09-01'),
            price: 29.99,
            genre: 'Stealth',
            description: 'Tactical espionage in an open world.',
            console_id: steamDeck?.id,
        },
        {
            title: 'NieR: Automata',
            developer: 'PlatinumGames',
            releasedate: new Date('2017-03-07'),
            price: 39.99,
            genre: 'Action RPG',
            description: 'Androids battle machines in a ruined world.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Persona 5 Royal',
            developer: 'Atlus',
            releasedate: new Date('2020-03-31'),
            price: 59.99,
            genre: 'JRPG',
            description: 'Live a double life as a student and phantom thief.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Final Fantasy XV',
            developer: 'Square Enix',
            releasedate: new Date('2016-11-29'),
            price: 39.99,
            genre: 'JRPG',
            description: 'A road trip adventure with friends.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Final Fantasy VII Remake',
            developer: 'Square Enix',
            releasedate: new Date('2020-04-10'),
            price: 59.99,
            genre: 'Action RPG',
            description: 'A modern retelling of a classic story.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Dragon Age: Inquisition',
            developer: 'BioWare',
            releasedate: new Date('2014-11-18'),
            price: 29.99,
            genre: 'RPG',
            description: 'Lead a team to save the world.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Mass Effect Legendary Edition',
            developer: 'BioWare',
            releasedate: new Date('2021-05-14'),
            price: 59.99,
            genre: 'RPG',
            description: 'Experience the epic sci-fi trilogy.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Assassin’s Creed Valhalla',
            developer: 'Ubisoft',
            releasedate: new Date('2020-11-10'),
            price: 59.99,
            genre: 'Action RPG',
            description: 'Raid and conquer as a Viking warrior.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Assassin’s Creed Odyssey',
            developer: 'Ubisoft',
            releasedate: new Date('2018-10-05'),
            price: 39.99,
            genre: 'Action RPG',
            description: 'Shape your destiny in ancient Greece.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Far Cry 5',
            developer: 'Ubisoft',
            releasedate: new Date('2018-03-27'),
            price: 29.99,
            genre: 'First-person shooter',
            description: 'Fight a cult in rural America.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Far Cry 6',
            developer: 'Ubisoft',
            releasedate: new Date('2021-10-07'),
            price: 59.99,
            genre: 'First-person shooter',
            description: 'Lead a revolution in a tropical country.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Watch Dogs 2',
            developer: 'Ubisoft',
            releasedate: new Date('2016-11-15'),
            price: 29.99,
            genre: 'Action-adventure',
            description: 'Hack systems in a connected world.',
            console_id: steamDeck?.id,
        },
        {
            title: 'The Division 2',
            developer: 'Ubisoft',
            releasedate: new Date('2019-03-15'),
            price: 29.99,
            genre: 'Shooter RPG',
            description: 'Restore order in a collapsed society.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Borderlands 3',
            developer: 'Gearbox Software',
            releasedate: new Date('2019-09-13'),
            price: 59.99,
            genre: 'Looter shooter',
            description: 'Shoot and loot across the galaxy.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Bioshock Infinite',
            developer: 'Irrational Games',
            releasedate: new Date('2013-03-26'),
            price: 19.99,
            genre: 'First-person shooter',
            description: 'Explore a floating city full of mystery.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Prey',
            developer: 'Arkane Studios',
            releasedate: new Date('2017-05-05'),
            price: 29.99,
            genre: 'First-person shooter',
            description: 'Survive an alien outbreak in space.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Dishonored 2',
            developer: 'Arkane Studios',
            releasedate: new Date('2016-11-11'),
            price: 29.99,
            genre: 'Stealth',
            description: 'Use supernatural powers to seek revenge.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Hitman 3',
            developer: 'IO Interactive',
            releasedate: new Date('2021-01-20'),
            price: 59.99,
            genre: 'Stealth',
            description: 'Eliminate targets in creative ways.',
            console_id: steamDeck?.id,
        },
        {
            title: 'No Man’s Sky',
            developer: 'Hello Games',
            releasedate: new Date('2016-08-09'),
            price: 59.99,
            genre: 'Survival',
            description: 'Explore a procedurally generated universe.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Subnautica',
            developer: 'Unknown Worlds',
            releasedate: new Date('2018-01-23'),
            price: 29.99,
            genre: 'Survival',
            description: 'Survive in an alien ocean world.',
            console_id: steamDeck?.id,
        },
        {
            title: 'The Forest',
            developer: 'Endnight Games',
            releasedate: new Date('2018-04-30'),
            price: 19.99,
            genre: 'Survival horror',
            description: 'Survive cannibals on a mysterious island.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Green Hell',
            developer: 'Creepy Jar',
            releasedate: new Date('2019-09-05'),
            price: 24.99,
            genre: 'Survival',
            description: 'Survive in the Amazon jungle.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Valheim',
            developer: 'Iron Gate Studio',
            releasedate: new Date('2021-02-02'),
            price: 19.99,
            genre: 'Survival',
            description: 'Explore a Viking-inspired world.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Rust',
            developer: 'Facepunch Studios',
            releasedate: new Date('2018-02-08'),
            price: 39.99,
            genre: 'Survival',
            description: 'Survive against players and environment.',
            console_id: steamDeck?.id,
        }
    ]

    for (const game of gamesData) {
        if (!game.console_id) continue

        await prisma.game.create({
            data: game,
        })
    }

    console.log('🕹️ 10 games seeded')

    console.log('✅ Seed completed successfully')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })