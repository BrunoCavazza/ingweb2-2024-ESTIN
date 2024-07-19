const LibraryServices = require('../services/library.services');
const library = new LibraryServices();
const jwt = require('jsonwebtoken');

const getLibrary = async (req, res) => {
    const decoded = jwt.decode(req.token);
    try {
        const response = await library.getUserLibrary(decoded);
        res.status(200).json({message: 'Libreria obtenida', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}


