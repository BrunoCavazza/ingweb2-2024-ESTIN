const PrismaClient = require('@prisma/client');

class TransactionServices{
    constructor(){
    }

    async transaction(senderId, receiverId, amount){
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
    }


}

module.exports = TransactionServices;