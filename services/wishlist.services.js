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

    async addWish(userId, gameId){
        const prisma = new PrismaClient();
        
        console.log("userId: " + userId);
        console.log("gameId: " + gameId);

        const transactionCheck = await prisma.transaction.findFirst({
            where: {
                user_id: userId,
                game_id: gameId
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
                        id: gameId
                    }
                }
            }
        });

        return wishlist;
    }

    async deleteWish(userId, gameId){
        const prisma = new PrismaClient();
        const wishlist = await prisma.users.update({
            where: {
                id: userId
            },
            data: {
                wishlist: {
                    disconnect: {
                        id: gameId
                    }
                }
            }
        });
    
        return wishlist;
    }
}


module.exports = WishlistServices;