const {PrismaClient} = require('@prisma/client');

class CustomerServices {

    constructor(){

    }
    async getCustomerByUsername(username){
        const prisma = new PrismaClient();
        const customer = await prisma.customer.findUnique({
            where: {
                username: username
            }
        });
        return provider;
    }

    async getCustomerLibrary(userId){
        const prisma = new PrismaClient();
        const library = await prisma.library.findUnique({
            where: {
                user_id: userId
            }
        });
        return library;
    }

}

module.exports = CustomerServices;
