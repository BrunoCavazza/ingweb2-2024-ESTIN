const ProviderServices = require("../services/provider.services");
const providerService = new ProviderServices();
const CustomerServices = require ("../services/customer.services");
const customerService = new CustomerServices();
const {generateToken} = require("../utils/jwt");
const {hashPassword, verifyPassword} = require("../utils/hasherandverifier");

const authentication = async (req, res) =>{

    try {
        const username = req.body.username;
        const password = req.body.password;

        const provider = await providerService.getProviderByUsername(username);
        if (!provider){
            const customer = await customerService.getCustomerByUsername(username);

            if(!seller){
                //testear que error sale aca
                console.log(res);
                return res.status(401).json({message: "Usuario no encontrado"});

            }
            const verifyPassword = await customerService.verifyPassword(customer.password, password);
            if(!verifyPassword){
                return res.status(401).json({message: "Contraseña incorrecta"});
            }

            const token = generateToken(customer, "customer");
            return res.status(200).json({message: "Cliente autentificado", token: token});

        }

        const token = generateToken(provider, "provider");
        return res.status(200).json({message: "Proveedor autentificado", token: token});


    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error al autentificar usuario"});
    }
};

module.exports = {authentication};