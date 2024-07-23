const PrismaClient = require('@prisma/client');

class TransactionServices{
    constructor(){
    }

    async buyGame(senderId, receiverId, gameId){
        const prisma = new PrismaClient.PrismaClient();

        try {
            let amount = await prisma.games.findUnique({
                where: {
                    id: gameId
                },
                select: {
                    price: true
                }
            })
            let userFunds = await prisma.users.findUnique({
                where:{
                    id: senderId
                },
                select:{
                    funds: true
                }
            })
            if(userFunds < amount){
                throw new Error("No hay suficientes fondos")
            }
            
            const result = await prisma.$transaction([
                prisma.users.update({
                    where: {
                        id: senderId
                    },
                    data: {
                        funds: {
                            decrement: price
                        }
                    }
                }),
                
                prisma.users.update({
                    where: {
                        username: receiverId
                    },
                    data: {
                        funds: {
                            increment: price
                        }
                    }
                }),
                prisma.transaction.create({
                    data:{
                        user_id: senderId,
                        game_id: gameId,
                    }
                }),
                
            ]);
            if(result){
                const wishlistCheck = await prisma.wishlist.findUnique({
                    where:{
                        user_id: senderId,
                        game_id: gameId
                    }
                })
                if(wishlistCheck){
                    await prisma.wishlist.delete({
                        where:{
                            user_id: senderId,
                            game_id: gameId
                        }
                    })
                }
            }
            /*const gameOnLib = await prisma.gamesOnLibrary.create({
                data:{
                    fk_game_lib: {connect:{id: gameId}},
                    fk_lib_game: {connect:{id: result[2].id}}  
                }
            })*/
            return {
                sender: result[0],
                receiver: result[1],
                library: result[2]
            };

        } catch (error) {
            console.log(error)
        }
    }

    async addFunds(userId, amount){
        const prisma = new PrismaClient.PrismaClient();
       
        try {
            const result = await prisma.users.update({
                where: {
                    user_id: userId
                },
                data: {
                    funds: {
                        increment: amount
                    }
                }
            });
            return result;
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = TransactionServices;