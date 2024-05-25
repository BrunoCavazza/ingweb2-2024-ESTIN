const {PrismaClient} = require('@prisma/client');

class GameServices{
    constructor(){

    }

    async createGame(body){
        console.log(body)
        const newGame = body;
        console.log("////////////////////////////////////")
        console.log(newGame)
        console.log(newGame.name)
        const prisma = new PrismaClient();
        const game = await prisma.games.create({
            data: {
                name: newGame.name,
                description: newGame.description,
                price: newGame.price,
                owner: newGame.owner,
                mainPicture: newGame.mainPicture,
                pictures: newGame.pictures,
                categories: newGame.categoryies
            }
        });


    }

    async getGameByName(gameSearch){
        const prisma = new PrismaClient();
        const game = await prisma.games.findMany({
            where: {
                name: {contains: gameSearch.name}
            }
        });
        return game;
    }

    async getGameByCategory(category){
        const prisma = new PrismaClient();
        const game = await prisma.games.findMany({
            where: {
                categories: category
            }
        });
        return game;
    }

    async getAllGames(){
        const prisma = new PrismaClient();
        const game = await prisma.games.findMany();
        return game;
    }
}

module.exports = GameServices;