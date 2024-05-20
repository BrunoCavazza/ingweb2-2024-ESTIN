const AddGameServices = require('../services/addGame.services');
const addGame = new AddGameServices();

const create = async (req, res) =>{
    try {
        //aca ver que pingo pongo
        const response = await addGame.createGame(req.body);
        res.json({message: 'Juego creado', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }

}

module.exports = {create};