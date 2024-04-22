const appDataSource = require("../database/appSourceDataBase");
const Users = require("../database/models/Users");

class UsersServices {

    getUserById(id){
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

    async createUser(email, password){

        const usersRepository = appDataSource.getRepository(Users)
        usersRepository.save({email, password})

    }
}

module.exports = new UsersServices();