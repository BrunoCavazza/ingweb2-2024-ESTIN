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
module.exports = {createGame, getProviderGames};