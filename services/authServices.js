const usersServices = require("./usersServices");



class AuthServices{

    async login(username, password){
        try {
            console.log('username:', username);
            console.log('password:', password);

            const user = await usersServices.getByEmail(username)
            console.log('user:', user);
            if (user == null){
                throw new Error();
            }
            
            if (user.password == password){
                return {
                    user: {
                        id: user.id,
                        name: user.name,
                    },
                    token: "<FaltaImplementar>"
                }
            }else{
                throw new Error('Usuario o contraseña incorrecto');
            }

            //TODO Implementar conexión con BBDD y validar username y password

            
        } catch (error) {
            throw new Error('Usuario o contraseña incorrecto');
        }
    }

}

module.exports = new AuthServices();