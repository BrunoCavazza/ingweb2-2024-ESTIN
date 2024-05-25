const {PrismaClient} = require('@prisma/client');


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






}

module.exports = ProviderServices;
