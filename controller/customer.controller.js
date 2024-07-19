const customerService = require('../services/customer.services');
const customer = new customerService();
const jwt = require('jsonwebtoken');

const getCustomerLibrary = async (req, res) => {
    console.log("el request token chetao: ");
    console.log(req.token);

    decoded = jwt.verify(req.token, process.env.JWT_SECRET);
    console.log("ah pero si ahora lo decodifico: "+ decoded);
    try {
        const response = await customer.getCustomerLibrary(decoded.id);
        res.status(200).json({message: 'Biblioteca del usuario', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

module.exports = {getCustomerLibrary};