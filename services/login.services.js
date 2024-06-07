const {PrismaClient} = require('@prisma/client');

class LoginServices{

    constructor(){

    }

    async getUsername(username){
        console.log("hola lindo")
        const prisma = new PrismaClient();
        console.log("prisma qcy " +prisma)
        const user = await prisma.users.findUnique({
            where: {
                username: username
            }
        });
        console.log("user qcy " +user.username)
        return user;
    }
    


}

module.exports = LoginServices;