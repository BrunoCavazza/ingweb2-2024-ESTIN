class UsersServices {

    login(username, password){
        try {
            console.log('username:', username);
            console.log('password:', password);

            //TODO Implementar conexión con BBDD y validar username y password

            return {
                user: {
                    id: 1,
                    name: "Alejandro",
                },
                token: "aksjduu812hasd"
            }
        } catch (error) {
            throw new Error('Usuario o contraseña incorrecto');
        }
    }

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