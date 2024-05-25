const {PrismaClient} = require('@prisma/client');

class RegisterServices {

    constructor(){
        
    }

    async createUser(newUserJson){
        prisma = new PrismaClient();

        console.log(newUserJson)
        const newUser = await prisma.users.create({
            where: {
                username: newUserJson.username
            },
            defaults: {
                username: newUserJson.username,
                password: newUserJson.password,
                email: newUserJson.email,
                wallet_id: newUserJson.wallet_id,
                funds: newUserJson.funds,
                status: newUserJson.status, //1 = ACTIVO, 0 = INACTIVO
                role: newUserJson.role, //CUSTOMER O PROVIDER (TODO MINUSCULA)
                library_id: newUserJson.library_id
            }
        });
        return createResponse;
    }

}

module.exports = RegisterServices;
