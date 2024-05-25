const GameServices = require('../services/game.services');
const game = new GameServices();

const create = async (req, res) =>{
    try {
        //aca ver que pingo pongo
        console.log(req.body)
        const response = await game.createGame(req.body);
        res.json({message: 'Juego creado', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }

}

const filterCategory = async (req, res) =>{
    try {
        const response = await game.getGameByCategory(req.params.category);
        res.json({message: 'Juegos filtrados por categoria', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const filterText = async (req, res) =>{
    try {
        const response = await game.getGameByName(req.body);
        res.json({message: 'Juegos filtrados por texto', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const getAll = async (req, res) =>{
    try {
        const response = await game.getAllGames();
        res.json({message: 'Todos los juegos', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}
module.exports = {create, filterCategory, filterText, getAll};