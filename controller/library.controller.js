const LibraryServices = require('../services/library.services');
const library = new LibraryServices();

const getUserLibrary = async (req, res) => {
    try {
        const response = await library.getUserLibrary(req.token.id);
        res.json({message: 'Biblioteca del usuario', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}


module.exports = {getUserLibrary};