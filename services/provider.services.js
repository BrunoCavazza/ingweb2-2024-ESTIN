const {PrismaClient} = require('@prisma/client');


class ProviderServices {

    constructor(){
        
    }

    async getProviderByUsername(username){
        console.log("hola lindo")
        const prisma = new PrismaClient();
        console.log("prisma qcy " +prisma)
        const provider = await prisma.users.findUnique({
            where: {
                username: username
            }
        });
        console.log("provider qcy " +provider.username)
        return provider;
    }

    async createGame(body, ownerId){
        console.log("EL ID DEL OWNER: "+ ownerId)
        console.log(body)
        const newGame = body;
        console.log("////////////////////////////////////")
        console.log(newGame)
        console.log(newGame.name)
        console.log(newGame.categories)
        const prisma = new PrismaClient();

        const categoriesData = newGame.categories.map(category => ({ name: category }));
        console.log("valores de categorias:")
        console.log(categoriesData)
        
        console.log("SEXO")
        const gameCheck = await prisma.games.findUnique({
            where: {
                name: newGame.name
            }
        });
        if(gameCheck){
            return 1;
        }
        console.log("SEXO2")
        const user = await prisma.users.findUnique({
            where: {
                id: ownerId
            }   
        });
        const game = await prisma.games.create({
            data: {
                name: newGame.name,
                description: newGame.description,
                price: newGame.price,
                owner: user.username,
                mainPicture: newGame.mainPicture,
                pictures: newGame.pictures,
                categories: {
                    connectOrCreate: newGame.categories.map( (category) => {
                        return {
                            where: {name: category},
                            create: {name: category}
                        } 
                        
                    }
                )
                }     
            },
        });
        console.log("aber " +game.id)

    }

    async deleteGame(gameId, username){
        const prisma = new PrismaClient();
        const ownerCheck = await prisma.games.findUnique({
            where: {
                id: gameId
            },
            select: {
                owner: true
            }

        });
        console.log(ownerCheck.owner)
        console.log(username)
        if(username===ownerCheck.owner){
            console.log("acceso permitido")
            const game = await prisma.games.delete({
                where: {
                    id: gameId
                }
            });
            return game;
        }else{
            console.log("que haces pibe esto no es tuyo")
            return 1;
        }
    }

    async getProviderGames(username){
        const prisma = new PrismaClient();
        const games = await prisma.games.findMany({
            where: {
                owner: username
            }
        });
        

        return games;
    }

    async updateGame(gameId, update, username){
        console.log(update)
        const prisma = new PrismaClient();

        const ownerCheck = await prisma.games.findUnique({
            where: {
                id: gameId
            },
            select: {
                owner: true
            }

        });
        console.log(ownerCheck.owner)
        console.log(username)
        if(username===ownerCheck.owner){
            console.log("acceso permitido")
            const game = await prisma.games.update({
                where: {
                    id: gameId
                },
                data: {
                    name: update.name,
                    description: update.description,
                    price: update.price,
                    mainPicture: update.mainPicture,
                    pictures: update.pictures,
                    categories: {
                        connectOrCreate: update.categories ? update.categories.map( (category) => {
                            return {
                                where: {name: category},
                                create: {name: category}
                            } 
                        
                        }) : []
                    }
                }
            });
            return game;
        }else{
            console.log("que haces pibe esto no es tuyo")
            return 1;
        }
    }


}

module.exports = ProviderServices;
