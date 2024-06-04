const {PrismaClient} = require('@prisma/client');
const { connect } = require('http2');


class ProviderServices {

    constructor(){
        
    }

    async getProviderByUsername(username){

        const prisma = new PrismaClient();
        const provider = await prisma.provider.findUnique({
            where: {
                username: username
            }
        });
        return provider;
    }

    async createGame(body){
        console.log(body)
        const newGame = body;
        console.log("////////////////////////////////////")
        console.log(newGame)
        console.log(newGame.name)
        console.log(newGame.categories)
        const prisma = new PrismaClient();

        /*const categoriesValues = await prisma.categories.findMany({
            where: {
                name: {
                    in: newGame.categories
                }
            }
        
        });

        const gameOnCategories = await prisma.categoriesOnGames.findMany({
            where: {
                category_id: {
                    in: categoriesValues.map(category => category.id)
                }
            }

        });*/
        //console.log(gameOnCategories)
        let idArray = [];
        for (let i = 0; i < newGame.categories.length; i++) {
            const category = newGame.categories[i];
            console.log(category)
            const categoryExists = await prisma.categories.findMany({
                where: {
                    name: category
                }
            });
            console.log(categoryExists)
            console.log(categoryExists[0].id)
            idArray.push(categoryExists[0].id)
            /*if(categoryExists.length == 0){
                const newCategory = await prisma.categories.create({
                    data: {
                        name: category
                    }
                });
                console.log(newCategory)
            }*/
        }
        console.log(idArray)

        
 
        const game = await prisma.games.create({
            data: {
                name: newGame.name,
                description: newGame.description,
                price: newGame.price,
                owner: newGame.owner,
                mainPicture: newGame.mainPicture,
                pictures: newGame.pictures,
                categories: newGame.categories            
            }
        });
        console.log("aber " +game.id)
        let gameid = game.id;
        console.log(gameid)
        let gameOnCat = 0;

        for (let i = 0; i < idArray.length; i++) {
            const category = idArray[i];
            console.log(category)
            gameOnCat = await prisma.categoriesOnGames.create({
                data: {
                    fk_cat_game: {connect: {id: category}},
                    fk_game_cat: {connect: {id: gameid}}
                        
                    
                }
            });
        }
        /*gameOnCat = await prisma.categoriesOnGames.create({
            data: {
                fk_cat_game: idArray,
                fk_game_cat: gameid,
                    
                
            }
        });*/

        console.log("GAMECAT: " +gameOnCat)

        /*const game = await prisma.games.create({
            data: {
                name: newGame.name,
                description: newGame.description,
                price: newGame.price,
                owner: newGame.owner,
                mainPicture: newGame.mainPicture,
                pictures: newGame.pictures,
                categories: {
                    connect: {
                        id: newGame.categories
                    }
                
                }
            }
        });*/

    }


    async getProviderGames(ownerId){
        const prisma = new PrismaClient();
        const games = await prisma.games.findMany({
            where: {
                owner: ownerId
            }
        });
        return games;
    }



}

module.exports = ProviderServices;
