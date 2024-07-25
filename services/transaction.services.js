const PrismaClient = require('@prisma/client');

class TransactionServices{
    constructor(){
    }

    async buyGame(senderId, receiverName, gameId){
        const prisma = new PrismaClient.PrismaClient();

        try {

            let gameCheck = await prisma.transaction.findFirst({
                where:{
                    user_id: senderId,
                    game_id: gameId
                }
            })
            if(gameCheck){
                return 1;
            }
            let userCheck = await prisma.users.findUnique({
                where:{
                    id: senderId
                },
                select:
                {
                    username: true
                }
            })

            if(userCheck.username === receiverName){
                return 3;
            }
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
            if(userFunds.funds < amount.price){
                return 2;
            }
            
            console.log(amount)
            console.log(userFunds)

            const result = await prisma.$transaction([
                prisma.users.update({
                    where: {
                        id: senderId
                    },
                    data: {
                        funds: {
                            decrement: amount.price
                        }
                    }
                }),
                
                prisma.users.update({
                    where: {
                        username: receiverName
                    },
                    data: {
                        funds: {
                            increment: amount.price
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
                const wishlistCheck = await prisma.users.findUnique({
                    where:{
                        id: senderId
                    },
                    select:{
                        wishlist: {
                            where:{
                                id: gameId
                            }
                        }
                    }
                })
                if(wishlistCheck){
                    await prisma.users.update({
                        where: {
                            id: senderId
                        },
                        data: {
                            wishlist: {
                                disconnect: {
                                    id: gameId
                                }
                            }
                        }
                    })
                }
            }

            return {
                sender: result[0],
                receiver: result[1],
                library: result[2]
            };

        } catch (error) {
            console.log(error)
        }
    }


    async refundGame(senderId, receiverId, gameId){
        const prisma = new PrismaClient.PrismaClient();

        let amount = await prisma.games.findUnique({
            where: {
                id: gameId
            },
            select: {
                price: true
            }
        })
        try {
            const result = await prisma.$transaction([
                prisma.users.update({
                    where: {
                        id: senderId
                    },
                    data: {
                        funds: {
                            increment: amount.price
                        }
                    }
                }),
                
                prisma.users.update({
                    where: {
                        username: receiverName
                    },
                    data: {
                        funds: {
                            decrement: amount.price
                        }
                    }
                }),
                prisma.transaction.delete({
                    where:{
                        user_id: senderId,
                        game_id: gameId,
                    }
                }),
                
            ]);

            return {
                sender: result[0],
                receiver: result[1],
                removed: result[2]
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