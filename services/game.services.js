const {PrismaClient} = require('@prisma/client');

class GameServices{
    constructor(){

    }

    
    /*async getGameById(gameId){
        const prisma = new PrismaClient();
        const game = await prisma.games.findUnique({
            where: {
                id: gameId
            }
        });
        return game;
    }*/

    /*async getGameByName(gameSearch){
        const prisma = new PrismaClient();
        const game = await prisma.games.findMany({
            where: {
                name: {contains: gameSearch.name}
            }
        });
        return game;
    }*/

    /*async getGameByCategory(category){
        const prisma = new PrismaClient();
        const game = await prisma.games.findMany({
            where: {
                categories: category
            }
        });
        return game;
    }*/  

    async getGamesByPage(categoriesFilter, nameFilter, page){
        const prisma = new PrismaClient();
        console.log(nameFilter)
        console.log("page")
        console.log(page)
        const search = [];

        if(nameFilter && nameFilter.name != (undefined || "") ){ //ESTO GUARDA EL NOMBRE EN EL ARRAY DE BUSQUEDA FINAL
            search.push({
                name: {contains: nameFilter.name, mode: "insensitive"}
            })
        }
        console.log("SEARCH1")
        console.log(search)

        console.log(categoriesFilter)

        if(categoriesFilter && categoriesFilter.length > 0){ //ESTO GUARDA LAS CATEGORIAS EN EL ARRAY DE BUSQUEDA FINAL  
            console.log("pene")
            search.push({
                categories: {
                    some: {
                        name: {in: categoriesFilter, mode: "insensitive"}
                    }
                }
            })  
        }

        console.log("SEARCH2")
        console.log(search)

        const where = search.length > 0 ? {AND: search} : {};
        console.log("where:")
        console.log(where)

        const pageSize = parseInt(10)
        const skip = parseInt((page-1) * pageSize)


        console.log("page size: "+pageSize)
        console.log("skip: "+skip)


        const game = await prisma.games.findMany({
            where: where,
            include: {
                categories: true
            },
            skip: skip,
            take: pageSize 

        });
        console.log("QUE PORONGA SE CREA ACA")
        console.log(game)
        return game;
    }

    async getHomePage(){
        const prisma = new PrismaClient();
        const game = await prisma.games.findMany({
            where: {
                onsale: 1
            }
        });
        return game;
    }

    async getGameByName(name){
        console.log("nombre de juego: " +name)
        const prisma = new PrismaClient();
        const game = await prisma.games.findUnique({
            where: {
                name: name
            }
        });
        console.log("jueguito:")
        console.log(game)
        return game;
    }

    /*async getAllGames(){
        const prisma = new PrismaClient();
        const game = await prisma.games.findMany();
        return game;
    }

    async getGamesPaged(page){
        console.log("pagina:"+page)
        
        
        const prisma = new PrismaClient();
        

        const pageSize = parseInt(10)
        const skip = parseInt(page * pageSize)


        console.log("page size: "+pageSize)
        console.log("skip: "+skip)


        const game = await prisma.games.findMany({
            skip: skip,
            take: pageSize 
        });


        console.log("JUEGUITOS")
        console.log(game)
        return game;
    }*/

    /*async transaction(senderId, receiverId, amount){
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
    }*/

    /*async gameToLibrary(userId){
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
    }*/
}

module.exports = GameServices;