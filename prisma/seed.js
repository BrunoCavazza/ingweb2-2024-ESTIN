const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const hash = require('../utils/hasherandverifier')

async function main(){
    console.log("ola")
    const categories = await prisma.categories.createMany({
        data: [
            {name: "Action"},
            {name: "Adventure"},
            {name: "Casual"},
            {name: "Indie"},
            {name: "Multiplayer"},
            {name: "Racing"},
            {name: "RPG"},
            {name: "Simulation"},
            {name: "Shooter"},
            {name: "Sports"},
            {name: "Strategy"},
            {name: "MOBA"},
            {name: "MMORPG"},
            {name: "Battle Royale"},
            {name: "Souls-like"},
            {name: "Sandbox"},
            {name: "Roguelike"},
            {name: "Singleplayer"},
            {name: "Fantasy"},
            {name: "Horror"},
            {name: "PVP"},
            {name: "PVE"},
            {name: "CO-OP"},
            {name: "Realistic"},
            {name: "Logic"},
            {name: "Survival"},
            {name: "Romance"},
            {name: "Mature"},
            {name: "Platformer"},
            {name: "Fighting"},
            {name: "Puzzle"},
            {name: "Music"},
            {name: "Educational"},
            {name: "VR"},
            {name: "Anime"},
            {name: "Sci-fi"},
            {name: "Cyberpunk"},
            {name: "Post-apocalyptic"},
            {name: "Historical"},
            {name: "Medieval"},
            {name: "Futuristic"},
            {name: "Western"},
            {name: "Military"},
            {name: "Gacha"},
            {name: "Open World"},
            {name: "Zombies"},
            {name: "RNG"},
            {name: "3D"}
        ],
        skipDuplicates: true
    })

    
    console.log(categories)

    const users = await prisma.users.createMany({
        data: [
            {email: "elpepe@hotmail.com", password: hash.hashPassword("Jijijija_23123").toString(), username: "elpepe", role: "owner", status: 1, funds: 0, wallet_id: 1},
            {email: "pandulc@hotmail.com", password: hash.hashPassword("3487-asd").toString(), username: "pandulce", role: "user", status: 1, funds: 0, wallet_id: 2},
            {email: "michibebe@hotmail.com", password: hash.hashPassword("amo_a_mi_michi01").toString(), username: "michi", role: "owner", status: 1, funds: 500, wallet_id: 3},
            {email: "choroslayer@hotmail.com", password: hash.hashPassword("qcypassdelchoro_01").toString(), username: "choroslayer", role: "user", status: 1, funds: 0, wallet_id: 4}
        ],
        skipDuplicates: true
    })

    const games = await prisma.games.createMany({
        data: [
            {name: "The Witcher 3: Wild Hunt", description: "The Witcher 3: Wild Hunt is a story-driven open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences. In The Witcher, you play as professional monster hunter Geralt of Rivia tasked with finding a child of prophecy in a vast open world rich with merchant cities, pirate islands, dangerous mountain passes, and forgotten caverns to explore.", price: 30, mainPicture: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/capsule_616x353.jpg", owner: "elpepe", categories: {connect: {id: 7}}, pictures: "aslkjda"},
            {name: "Cyberpunk 2077", description: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.", price: 60, mainPicture: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg", owner: "elpepe", categories: {connect: {id: 36}}, pictures: "aslkjda"},
            {name: "Red Dead Redemption 2", description: "America, 1899. The end of the wild west era has begun as lawmen hunt down the last remaining outlaw gangs. Those who will not surrender or succumb are killed. After a robbery goes badly wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him.", price: 59.99, mainPicture: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg", owner: "michi", categories: {connect: {id: 1}}, pictures: "aslkjda"},
            {name: "Grand Theft Auto V", description: "When a young street hustler, a retired bank robber and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, the U.S. government and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody, least of all each other.", price: 30, mainPicture: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/capsule_616x353.jpg", owner: "elpepe", categories: {connect: {id: 1}}, pictures: "aslkjda"},
            {name: "Sonic Riders: Zero Gravity", description: "In Sonic Riders, Dr. Eggman challenges Sonic and his friends to a Worldwide Grand Prix, and the prize for coming out on top is an ultra-rare Chaos Emerald! Gliding on air boards – which are performance-oriented for each playable character – gamers will experience a heightened sense of Extreme sports-style racing tension as Sonic and his pals perform tricks and stunts over treacherous wide-open terrain.", price: 10, mainPicture: "https://cdn.cloudflare.steamstatic.com/steam/apps/71250/capsule_616x353.jpg", owner: "michi", categories: {connect: {id: 6}}, pictures: "aslkjda"},
            {name: "Dragon Ball Z: Budokai Tenkaichi 3", description: "Dragon Ball Z: Budokai Tenkaichi 3 delivers an extreme 3D fighting experience, improving upon last year’s game with over 150 playable characters, enhanced fighting techniques, beautifully refined effects and shading techniques, making each character’s effects more realistic, and over 20 battle stages. This is the ultimate chapter in Budokai Tenkaichi series with over 20 new characters that have never been seen in any other DBZ video games such as Nail, King Cold and King Vegeta and battle stages that take the DBZ fighter in an open field to fight in.", price: 20, mainPicture: "https://cdn.cloudflare.steamstatic.com/steam/apps/1250/capsule_616x353.jpg", owner: "michi", categories: {connect: {id: 1}}, pictures: "aslkjda"},
            {name: "The Legend of Zelda: Breath of the Wild", description: "Forget everything you know about The Legend of Zelda games. Step into a world of discovery, exploration, and adventure in The Legend of Zelda: Breath of the Wild, a boundary-breaking new game in the acclaimed series. Travel across vast fields, through forests, and to mountain peaks as you discover what has become of the kingdom of Hyrule in this stunning Open-Air Adventure. Now on Nintendo Switch, your journey is freer and more open than ever. Take your system anywhere, and adventure as Link any way you like.", price: 60, mainPicture: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg", owner: "michi", categories: {connect: {id: 2}}, pictures: "aslkjda"},
            {name: "Super Mario Odyssey", description: "Join Mario on a massive, globe-trotting 3D adventure and use his incredible new abilities to collect Moons so you can power up your airship, the Odyssey, and rescue Princess Peach from Bowser’s wedding plans! This sandbox-style 3D Mario adventure—the first since 1996’s beloved Super Mario 64 and 2002’s Nintendo GameCube classic Super Mario Sunshine—is packed with secrets and surprises, and with Mario’s new moves like cap throw, cap jump, and capture, you’ll have fun and exciting gameplay experiences unlike anything you’ve enjoyed in a Mario game before. Get ready to be whisked away to strange and amazing places far from the Mushroom Kingdom!", price: 60, mainPicture: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg", owner: "elpepe", categories: {connect: {id: 2}}, pictures: "aslkjda"},
            {name: "Super Smash Bros. Ultimate", description: "Gaming icons clash in the ultimate brawl you can play anytime, anywhere! Smash rivals off the stage as new characters Simon Belmont and King K. Rool join Inkling, Ridley, and every fighter in Super Smash Bros. history. Enjoy enhanced speed and combat at new stages based on the Castlevania series, Super Mario Odyssey, and more!", price: 60, mainPicture: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg", owner: "elpepe", categories: {connect: {id: 1}}, pictures: "aslkjda"},
            {name: "Baldur's Gate 3", description: "Gather your party, and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power. Mysterious abilities are awakening inside you, drawn from a Mind Flayer parasite planted in your brain. Resist, and turn darkness against itself. Or embrace corruption...", price: 60, mainPicture: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg", owner: "michi", categories: {connect: {id: 7}}, pictures: "aslkjda"},
            {name: "World of Warcraft", description: "Join thousands of mighty heroes in Azeroth, a world of magic and limitless adventure. World of Warcraft is a massively multiplayer online role-playing game released in 2004 by Blizzard Entertainment. Set in the Warcraft fantasy universe, World of Warcraft takes place within the world of Azeroth. Powerful enemies await in Dungeons and Raids; take on your class, and face the challenges.", price: 15, mainPicture: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg", owner: "michi", categories: {connect: {id: 7}}, pictures: "aslkjda"},
        ],
        skipDuplicates: true
    })
    console.log(games)
    console.log(users)

} 

main()
.then(async () => {
    console.log("hola")

    await prisma.$disconnect()
})
.catch(async (e) => {
console.error(e)
await prisma.$disconnect()
process.exit(1)
})