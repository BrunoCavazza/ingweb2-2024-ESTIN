const {PrismaClient} = require('@prisma/client');

class WishlistServices{
    constructor(){

    }

    async getUserWishlist(userId){
        const prisma = new PrismaClient();
        const wishlist = await prisma.wishlist.findMany({
            where: {
                user_id: userId,
                include: {
                    games: true
                }
            }
        });

        return wishlist;
    }

    async addGameToWishlist(userId, gameId){
        const prisma = new PrismaClient();

        const wishlist = await prisma.wishlist.create({
            data: {
                user_id: userId,
                game_id: gameId
            }
        });

        return wishlist;
    }

    async removeGameFromWishlist(userId, gameId){
        const prisma = new PrismaClient();
        const wishlist = await prisma.wishlist.delete({
            where: {
                user_id: userId,
                game_id: gameId
            }
        });

        return wishlist;
    }
}


module.exports = WishlistServices;