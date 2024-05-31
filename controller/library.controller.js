const LibraryServices = require('../services/library.services');
const library = new LibraryServices();

const getUserLibrary = async (req, res) => {
    try {
        const response = await library.getUserLibrary(req.token.id);
        res.status(200).json({message: 'Biblioteca del usuario', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const getProviderGames = async (req, res) => {
    try {
        const response = await library.getProviderGames(req.token.id);
        res.status(200).json({message: 'Lista de juegos del proveedor', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

module.exports = {getUserLibrary};