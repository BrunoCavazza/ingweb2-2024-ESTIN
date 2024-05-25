const TransactionServices = require('../services/transaction.services');
const transaction = new TransactionServices();

const generateTransaction = async (req, res) => {
    try {
        const response = await transaction.transaction(req.token.senderId, req.body.receiverId, req.body.amount);

        res.json({message: 'Transaccion realizada', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}