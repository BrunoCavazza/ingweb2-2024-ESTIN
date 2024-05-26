/*const TransactionServices = require('../services/transaction.services');
const transaction = new TransactionServices();

const generateTransaction = async (req, res) => {
    console.log(token)

    try {
        const successTransac = await transaction.transaction(req.token.senderId, req.body.receiverId, req.body.amount);
        if (successTransac){
            const successAddition = await transaction.gameToLibrary(req.token.id)
            res.json({message: 'Transaccion realizada', data: response});

        }else{
            res.status(401).json({message: "No se pudo realizar la transaccion."});
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }


}

module.exports = {generateTransaction};*/