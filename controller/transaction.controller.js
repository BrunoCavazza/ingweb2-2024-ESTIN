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

const generateTransaction = async (req, res) => {

    try {
        const successTransac = await game.transaction(req.token.senderId, req.body.receiverId, req.body.amount);
        if (successTransac){
            const response = await game.gameToLibrary(req.body.senderId)
                if (response){
                    res.status(200).json({message: 'Transaccion realizada', data: response});
                }else{
                    res.status(401).json({message: "No se pudo realizar la adicion del juego; transaccion fallida."})
                }

        }else{
            res.status(401).json({message: "No se pudo realizar la transaccion."});
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }


}

module.exports = {buyGame, generateTransaction};