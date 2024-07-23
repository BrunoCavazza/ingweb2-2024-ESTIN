const wishlistServices = require('../services/wishlist.services');
const wishlistService = new wishlistServices();

const getWishlist = async (req, res) => {
    try {
        const response = await wishlistService.getUserWishlist(req.token.id);
        res.status(200).json({message: 'Wishlist del usuario', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const addGameToWishlist = async (req, res) => {
    try {
        const response = await wishlistService.addGameToWishlist(req.token.id, req.query.gameId);
        res.status(200).json({message: 'Juego agregado a la wishlist', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const removeGameFromWishlist = async (req, res) => {
    try {
        const response = await wishlistService.removeGameFromWishlist(req.token.id, req.query.gameId);
        res.status(200).json({message: 'Juego eliminado de la wishlist', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

module.exports = {getWishlist, addGameToWishlist, removeGameFromWishlist};