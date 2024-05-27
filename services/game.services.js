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
                categories: newGame.categories
            }
        });


    }

    async getGameById(gameId){
        const prisma = new PrismaClient();
        const game = await prisma.games.findUnique({
            where: {
                id: gameId
            }
        });
        return game;
    }

    /*async getGameByName(gameSearch){
        const prisma = new PrismaClient();
        const game = await prisma.games.findMany({
            where: {
                name: {contains: gameSearch.name}
            }
        });
        return game;
    }*/

    /*async getGameByCategory(category){
        const prisma = new PrismaClient();
        const game = await prisma.games.findMany({
            where: {
                categories: category
            }
        });
        return game;
    }*/  

    async getNameByFilter(filters){
        const prisma = new PrismaClient();
        const game = await prisma.games.findMany({
            where: {
                AND: [
                    {name: {contains: filters.name}},
                    {categories: {contains: filters.category}}
                ]
            }
        });
    
        return game;
    }

    async getAllGames(){
        const prisma = new PrismaClient();
        const game = await prisma.games.findMany();
        return game;
    }

    async getPagedGames(page){
        let currentPage = page-1;
        const prisma = new PrismaClient();
        const game = await prisma.games.findMany({
            skip: 0*currentPage,
            take: 10
        });
        return game;
    }

    /*async transaction(senderId, receiverId, amount){
        const prisma = new PrismaClient.PrismaClient();
                
        try {
            const senderAcc = await prisma.users.update({
                where: {
                    id: senderId
                },
                data: {
                    funds: {
                        decrement: amount
                    }
                }
            });
            const receiverAcc = await prisma.users.update({
                where: {
                    id: receiverId
                },
                data: {
                    funds: {
                        
                        increment: amount
                    }
                }
            });
            return {
                sender: senderAcc,
                receiver: receiverAcc
            }
        } catch (error) {
            console.log(error)
        }
        
        return transaction;
    }*/

    async gameToLibrary(userId){
        const prisma = new PrismaClient();
        const library = await prisma.library.update({
            where: {
                user_id: userId
            },
            data: {
                games: {
                    connect: {
                        id: gameId
                    }
                }
            }
        });
        return library;
    }
}

module.exports = GameServices;