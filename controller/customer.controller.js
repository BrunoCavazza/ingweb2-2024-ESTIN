const CustomerServices = require('../services/customer.services');
const customerService = new CustomerServices();

const getCustomerLibrary = async (req, res) => {
    console.log("el request token chetao: ");
    console.log(req.token);
    try {
        const response = await customerService.getCustomerLibrary(req.token.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

module.exports = {getCustomerLibrary};