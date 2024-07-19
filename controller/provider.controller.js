const providerService = require('../services/provider.services');
const provider = new providerService();

const createGame = async (req, res) =>{
    try {
        //aca ver que pingo pongo
        console.log(req.body)
        const response = await provider.createGame(req.body);
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
        const response = await provider.getProviderGames(req.token.id);
        res.status(200).json({message: 'Lista de juegos del proveedor', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}
module.exports = {createGame, getProviderGames};