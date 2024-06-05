const {PrismaClient} = require('@prisma/client');

class GameServices{
    constructor(){

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

    async getGamesByFilter(filters){
        const prisma = new PrismaClient();
        console.log(filters)
        const game = await prisma.games.findMany({
            where: {
                OR: [
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

    async getGamesPaged(page){
        
        const prisma = new PrismaClient();
        const game = await prisma.games.findMany({
            skip: 1,
            take: 2
        });
        console.log("JUEGUITOS "+game)
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

    /*async gameToLibrary(userId){
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
    }*/
}

module.exports = GameServices;