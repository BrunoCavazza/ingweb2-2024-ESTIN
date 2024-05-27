const TransactionServices = require('../services/transaction.services');
const transaction = new TransactionServices();

const buyGame = async (req, res) => {
    console.log(token)

    try {
        const successTransac = await transaction.buyGame(req.token.senderId, req.body.receiverId, req.body.amount);
        res.json({message: 'Transaccion realizada', data: response});
        
    } catch (error) {
        res.status(500).send({message: error.message});
    }


}

module.exports = {buyGame};