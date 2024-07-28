const {PrismaClient} = require('@prisma/client');

class WishlistServices{
    constructor(){

    }

    async getUserWishlist(userId){
        const prisma = new PrismaClient();
        const wishlist = await prisma.users.findMany({
            where: {
                id: userId
            },
            select: {
                wishlist: true
            }
        });

        return wishlist;
    }

    async addWish(userId, gameName){
        const prisma = new PrismaClient();
        
        console.log("userId: " + userId);
        console.log("gameId: " + gameId);

        const obtainedGame = await prisma.games.findUnique({
            where: {
                name: gameName
            }
        });

        const transactionCheck = await prisma.transaction.findFirst({
            where: {
                user_id: userId,
                game_id: obtainedGame.id
            }
        });
        
        if(transactionCheck){
            throw new Error("Ya tenes el juego comprado!");
        }

        

        console.log("SEXO")
        const wishlist = await prisma.users.update({
            where: {
                id: userId
            },
            data: {
                wishlist: {
                    connect: {
                        id: obtainedGame.id
                    }
                }
            }
        });

        return wishlist;
    }

    async deleteWish(userId, gameName){
        const prisma = new PrismaClient();

        const obtainedGame = await prisma.games.findUnique({
            where: {
                name: gameName
            }
        });

        const wishlist = await prisma.users.update({
            where: {
                id: userId
            },
            data: {
                wishlist: {
                    disconnect: {
                        id: obtainedGame.id
                    }
                }
            }
        });
    
        return wishlist;
    }
}


module.exports = WishlistServices;