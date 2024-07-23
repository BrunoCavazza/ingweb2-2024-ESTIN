const ProviderServices = require('../services/provider.services');
const providerService = new ProviderServices();

const createGame = async (req, res) =>{
    try {
        //aca ver que pingo pongo
        console.log(req.body)
        console.log("token?")
        console.log(req.token)
        const response = await providerService.createGame(req.body, req.token.id);
        if (response === 1){
            return res.status(401).json({message: "El nombre de juego ya esta en uso!"});
        }
        res.status(200).json({message: 'Juego creado', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }

}

const getProviderGames = async (req, res) => {
    try {
        const response = await providerService.getProviderGames(req.token.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const deleteGame = async (req, res) =>{
    try {
        const response = await providerService.deleteGame(parseInt(req.query.gameId), req.token.username);
        if(response === 1){
            return res.status(401).json({message: "Usted no esta autorizado a borrar este juego."});
        }
        res.status(200).json({message: 'Juego eliminado', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const updateGame = async (req, res) =>{
    try {
        const response = await providerService.updateGame(parseInt(req.query.gameId), req.body, req.token.username);
        if(response === 1){
            return res.status(401).json({message: "Usted no esta autorizado a actualizar este juego."});
        }
        res.status(200).json({message: 'Juego actualizado', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

module.exports = {createGame, getProviderGames, deleteGame, updateGame};