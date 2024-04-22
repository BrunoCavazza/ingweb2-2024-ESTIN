class AuthServices{

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

}

module.exports = new AuthServices();