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
}

module.exports = new UsersServices();