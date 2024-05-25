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


}

module.exports = CustomerServices;
