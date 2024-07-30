const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function pickRandom(){

    try{
        await prisma.games.updateMany({
            data: {
                onsale: 0
            }
        });
    }catch(error){
        console.log(error)
    }

    const allGames = await prisma.games.findMany({
        select: {id: true}
    }); //me agarra todos los IDs

    console.log("aber: ")
    console.log(allGames)

    const shuffledGames = allGames.sort(() => 0.5 - Math.random());
    console.log("shuffled:")
    console.log(shuffledGames)

    const selectedGames = shuffledGames.slice(0, 11);
    console.log("selected:")
    console.log(selectedGames)

    for(let i = 0; i < selectedGames.length; i++){
        try{
            await prisma.games.update({
                where: {
                    id: selectedGames[i].id
                },
                data: {
                    onsale: 1
                }
            });
        }catch(error){
            console.log(error)
        }finally{
            await prisma.$disconnect();
        }
    }
}

module.exports = pickRandom;