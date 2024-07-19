const RegisterServices = require("../services/register.services");
const registerService = new RegisterServices();
const {generateToken} = require("../utils/verifyToken.middleware");
const {hashPassword, verifyPassword} = require("../utils/hasherandverifier");

const accountCreation = async (req, res) =>{
    console.log("username cheto: " + req.body.username);
    try {
        const createdResponse = await registerService.createUser(req.body);
        console.log("REGISTER - RESPONSE: ");
        console.log(createdResponse);
        if (createdResponse === 1){
            return res.status(401).json({message: "El nombre de usuario " + req.body.username + " ya existe."});
        }else if (createdResponse === 2){
            return res.status(401).json({message: "El email " + req.body.email + " ya existe."});
        }else if (createdResponse){
            return res.status(200).json({message: "Se creo el nuevo usuario: " + req.body.username +"."});
        }
    } catch (error) {
        res.status(500).json({message: "Error al crear el usuario"});
    }
        
    
};

module.exports = {accountCreation};