const customerService = require('../services/customer.services');
const customer = new customerService();

const getCustomerLibrary = async (req, res) => {
    try {
        const response = await customer.getCustomerLibrary(req.token.id);
        res.status(200).json({message: 'Biblioteca del usuario', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

module.exports = {getCustomerLibrary};