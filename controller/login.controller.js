const ProviderServices = require("../services/provider.services");
const providerService = new ProviderServices();
const CustomerServices = require ("../services/customer.services");
const customerService = new CustomerServices();

const LoginServices = require("../services/login.services"); 
const loginService = new LoginServices();

const {generateToken} = require("../utils/verifyToken.middleware");
const {hashPassword, verifyPassword} = require("../utils/hasherandverifier");

const authentication = async (req, res) =>{

    try {
        const username = req.body.username;
        const password = req.body.password;
        console.log(req.body)
        const user = await loginService.getUsername(username);
        console.log(user)
        if (!user){
            return res.status(401).json({message: "Usuario " + req.body.username + " no encontrado"});
        }
        const verifier = await verifyPassword(user.password, password);
        if(!verifier){
            return res.status(401).json({message: "Contraseña incorrecta"});
        }

        const token = generateToken(user, user.role);
        console.log("rol cheto: "+ token.role)
        return res.status(200).json({message: token.role + " autentificado", token: token});
        

        /*const verifier = await verifyPassword(provider.password, password);
        console.log("soy ese")

        if(!verifier){
            console.log("soy ese")

            return res.status(401).json({message: "Contraseña incorrecta"});
        }
        console.log("soy ese")*/


    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error al autentificar usuario"});
    }
};

module.exports = {authentication};