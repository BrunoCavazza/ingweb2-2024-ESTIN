const {PrismaClient} = require('@prisma/client');

class CustomerServices {

    constructor(){

    }
    async getCustomerByUsername(username){
        const prisma = new PrismaClient();
        const customer = await prisma.users.findUnique({
            where: {
                username: username
            }
        });
        return customer;
    }

    async getCustomerLibrary(userId){
        console.log("savdbjkvnskdjnvjlnasfkls hola");
        const prisma = new PrismaClient();
        console.log(userId);
        const library = await prisma.transaction.findMany({
            where: {
                user_id: userId 
            },  
             include: {
                    game: true
                }
                
                
            }
        );
        console.log(library);
        const games = library.map(game => game.game);
        return games;

    }

}

module.exports = CustomerServices;
