const PrismaClient = require('@prisma/client');

class TransactionServices{
    constructor(){
    }

    async buyGame(senderId, receiver, gameId){
        const prisma = new PrismaClient.PrismaClient();
                
        const senderLibCheck = await prisma.users.findUnique({ 
            where: { 
                id: senderId
            },
            include: {
                libraries: true
            }
        });

        console.log("LIB")
        console.log(senderLibCheck)


        let senderLib = 0;
        if(!senderLibCheck.libraries){
            senderLib = await prisma.libraries.create({
                data: {
                    user_id: senderId,
                    tmp_game_id: 0
                }
            });

        }else{
            senderLib = await prisma.libraries.findUnique({
                where: {
                    user_id: senderId
                }
            })
        }

        const libraryGod = await prisma.libraries.findUnique({
            where:{
                user_id: senderId
            }
        })
        console.log(libraryGod)

        try {
            let amount = await prisma.games.findUnique({
                where: {
                    id: gameId
                }
            })
            let balanceCheck = await prisma.users.findUnique({
                where:{
                    id: senderId
                }
            })
            if(balanceCheck.funds < amount.price){
                throw new Error("No hay suficientes fondos")
            }
            
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
                        username: receiver
                    },
                    data: {
                        funds: {
                            increment: amount.price
                        }
                    }
                }),
                prisma.libraries.update({
                    where: {
                        user_id: senderId
                    },
                    data: {
                        tmp_game_id: gameId
                    }
                }),
                
            ]);
            console.log("EPA")
            console.log(result[2].id)
            const gameOnLib = await prisma.gamesOnLibrary.create({
                data:{
                    fk_game_lib: {connect:{id: gameId}},
                    fk_lib_game: {connect:{id: result[2].id}}  
                }
            })
            console.log(gameOnLib)
            return {
                sender: result[0],
                receiver: result[1],
                library: result[2],
                gameOnLib: gameOnLib
            };

        } catch (error) {
            console.log(error)
        }
    }

    async addFunds(user, amount){
        const prisma = new PrismaClient.PrismaClient();
       
        try {
            const result = await prisma.users.update({
                where: {
                    username: user
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