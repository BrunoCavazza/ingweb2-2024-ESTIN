const {PrismaClient} = require('@prisma/client');

class LibraryServices{
    constructor(){

    }

    async getUserLibrary(userId){
        const prisma = new PrismaClient();
        const library = await prisma.library.findUnique({
            where: {
                user_id: userId
            }
        });
        return library;
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

    async generateLibrary(userId){
        const prisma = new PrismaClient();
        const library = await prisma.library.create({
            data: {
                user_id: userId
            }
        });
        return library;
    }

    async addGameToLibrary(userId, gameId){
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

module.exports = LibraryServices;