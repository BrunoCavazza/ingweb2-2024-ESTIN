const PrismaClient = require('@prisma/client');

class TransactionServices{
    constructor(){
    }

    async buyGame(senderId, receiverId, amount){
        const prisma = new PrismaClient.PrismaClient();
                
        try {
            const result = await prisma.$transaction([
                prisma.users.update({
                    where: {
                        id: senderId
                    },
                    data: {
                        funds: {
                            decrement: amount
                        }
                    }
                }),
                prisma.users.update({
                    where: {
                        id: receiverId
                    },
                    data: {
                        funds: {
                            increment: amount
                        }
                    }
                }),
                prisma.library.update({
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
                })
            ]);

            return {
                sender: result[0],
                receiver: result[1],
                library: result[2]
            };

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = TransactionServices;