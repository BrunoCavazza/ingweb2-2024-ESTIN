const GameServices = require('../services/game.services');
const game = new GameServices();


/*const filterCategory = async (req, res) =>{
    try {
        const response = await game.getGameByCategory(req.params.category);
        res.json({message: 'Juegos filtrados por categoria', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}*/

const filter = async (req, res) =>{
    try {
        const response = await game.getGameByFilter(req.params);
        res.json({message: 'Juegos filtrados por texto', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const getAll = async (req, res) =>{
    try {
        const response = await game.getAllGames();
        res.status(200).json({message: 'Todos los juegos', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const getGamesPaged = async (req, res) =>{
    try {
        const response = await game.getGamesPaged(req.params.page);
        res.status(200).json({message: 'Juegos paginados', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}



const gameScreen = async (req, res) =>{
    try {
        const response = await game.getGameById(req.params.id);
        res.status(200).json({message: 'Juego encontrado', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}


module.exports = {filter, getAll, getGamesPaged, gameScreen};