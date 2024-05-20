const RegisterServices = require("../services/register.services");
const registerService = new RegisterServices();
const {generateToken} = require("../utils/jwt");
const {hashPassword, verifyPassword} = require("../utils/hasherandverifier");

const accountCreation = async (req, res) =>{
    console.log("username cheto: " + req.body.username);
    try {
        const createdResponse = registerService.createUser(req.body);
        if (createdResponse){
            return res.status(200).json({message: "Se creo el nuevo usuario: " + req.body.username +"."});
        }else{
            return res.status(401).json({message: "El usuario " + req.body.username + " ya existe."});
        }
    } catch (error) {
        res.status(500).json({message: "Error al crear el usuario"});
    }
        
    
};

module.exports = {accountCreation};