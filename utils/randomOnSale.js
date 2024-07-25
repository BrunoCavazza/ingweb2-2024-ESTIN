const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const originalPrices = new Map();

async function randomOnSale(isShutdown = false){

    if(isShutdown){
        console.log("devolviendo precios")
        for(let[gameId, originalPrice] of originalPrices){
            await prisma.games.update({
                where: {
                    id: gameId
                },
                data: {
                    price: originalPrice
                }
            });
        }
        console.log("prices restored")
        return;
    }

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
        select: {id: true, price: true}
    }); //me agarra todos los IDs

    allGames.forEach(game => {
        originalPrices.set(game.id, game.price);
    });

    console.log("PRECIOS ORIGINALES")
    console.log(originalPrices)
    console.log("aber: ")
    console.log(allGames)

    const shuffledGames = allGames.sort(() => 0.5 - Math.random());
    console.log("shuffled:")
    console.log(shuffledGames)

    const selectedGames = shuffledGames.slice(0, 5);
    console.log("selected:")
    console.log(selectedGames)

    const offers = [0.90,0.75,0.50,0.25,0.10];
    for(let i = 0; i < selectedGames.length; i++){
        const discount = selectedGames[i].price * (1 - offers[i]);
        console.log(discount)
        try{
            await prisma.games.update({
                where: {
                    id: selectedGames[i].id
                },
                data: {
                    onsale: 1,
                    price: discount,
                }
            });
        }catch(error){
            console.log(error)
        }finally{
            if(!isShutdown){
                console.log("sexo3")
            }else{
                console.log("devolviendo precios")
                for(let[gameId, originalPrice] of originalPrices){
                    await prisma.games.update({
                        where: {
                            id: gameId
                        },
                        data: {
                            price: originalPrice
                        }
                    });
                }
            }
            console.log("pene2: "+isShutdown)
            console.log("pene")
            await prisma.$disconnect();
        }
    }
}

module.exports = {randomOnSale, originalPrices};