const {PrismaClient} = require('@prisma/client');


class ProviderServices {

    constructor(){
        
    }

    async getProviderByUsername(username){

        const prisma = new PrismaClient();
        const provider = await prisma.provider.findUnique({
            where: {
                username: username
            }
        });
        return provider;
    }

    async createGame(body){
        console.log(body)
        const newGame = body;
        console.log("////////////////////////////////////")
        console.log(newGame)
        console.log(newGame.name)
        console.log(newGame.categories)
        const prisma = new PrismaClient();
        const game = await prisma.games.create({
            data: {
                name: newGame.name,
                description: newGame.description,
                price: newGame.price,
                owner: newGame.owner,
                mainPicture: newGame.mainPicture,
                pictures: newGame.pictures,
                categories: newGame.categories
            }
        });


    }

    async getProviderGames(ownerId){
        const prisma = new PrismaClient();
        const games = await prisma.games.findMany({
            where: {
                owner: ownerId
            }
        });
        return games;
    }



}

module.exports = ProviderServices;
