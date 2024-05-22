/*const appDataSource = require("../database/appSourceDataBase");
const Users = require("../database/models/Users");

//ESTO ES DEL PROFE 
//ESTO ES DEL PROFE 
//ESTO ES DEL PROFE 
//ESTO ES DEL PROFE 
//ESTO ES DEL PROFE 

class UsersServices {

    async getUserById(id){
        //Consulta a la base de datos para buscar un usuario con id
        const user = null;
        if(user != null){
            return {id: id,
                name: 'Alejandro'
            };
        } else {
            throw new Error('No existe')
        }
    }

    async getByEmail(email){
        const usersRepository = appDataSource.getRepository(Users);
        console.log('email:',email);
        const user = usersRepository.findOne({
            where: {
                email: email
            }
        });

        return user;

    }

    async createUser(email, password){
        const usersRepository = appDataSource.getRepository(Users);
        const user = usersRepository.save({email, password});
        return user;
    }
}

module.exports = new UsersServices();*/