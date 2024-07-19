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
        const prisma = new PrismaClient();
        const library = prisma.transaction.findMany({
            where: {
                user_id: userId,
                include: {
                    games: true
                }
            }
        });
        return library;
    }

}

module.exports = CustomerServices;
