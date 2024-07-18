const {PrismaClient} = require('@prisma/client');

class RegisterServices {

    constructor(){
        
    }

    async createUser(newUserJson){
        prisma = new PrismaClient();

        console.log(newUserJson)

        const userCheck = await prisma.users.findUnique({
            where: {
                username: newUserJson.username
            }
        });
        const emailCheck = await prisma.users.findUnique({
            where: {
                email: newUserJson.email
            }
        });

        if(userCheck){
            return 1;
        }else if(emailCheck){
            return 2;
        }
        const newUser = await prisma.users.create({
            
            data: {
                username: newUserJson.username,
                password: newUserJson.password,
                email: newUserJson.email,
                funds: 0,
                status: 1, //1 = ACTIVO, 0 = INACTIVO
                role: newUserJson.role, //CUSTOMER O PROVIDER (TODO MINUSCULA)
            }
        });
        
        return newUser;
    }

}

module.exports = RegisterServices;
