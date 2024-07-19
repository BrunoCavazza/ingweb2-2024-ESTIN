const {PrismaClient} = require('@prisma/client');
const {hashPassword, verifyPassword} = require("../utils/hasherandverifier");

class RegisterServices {

    constructor(){
        
    }

    async createUser(newUserJson){
        console.log("SEXO")
        const prisma = new PrismaClient();
        console.log("el jotason")
        console.log(newUserJson)

        const userCheck = await prisma.users.findUnique({
            where: {
                username: newUserJson.username
            }
        });
        /*console.log("aber esto")
        console.log(userCheck)*/
        const emailCheck = await prisma.users.findUnique({
            where: {
                email: newUserJson.email
            }
        });
        /*console.log("aber esto otro")
        console.log(emailCheck)*/
        if(userCheck){
            return 1;
        }else if(emailCheck){
            return 2;
        }
        const hashedPassword = await hashPassword(newUserJson.password);
        console.log("SEXO5")

        const newUser = await prisma.users.create({
            
            data: {
                username: newUserJson.username,
                password: hashedPassword,
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
