const LibraryServices = require('../services/library.services');
const library = new LibraryServices();

const getLibrary = async (req, res) => {
    try {
        const response = await library.getUserLibrary(req.token.username);
        res.status(200).json({message: 'Libreria obtenida', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}


