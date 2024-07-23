const TransactionServices = require('../services/transaction.services');
const transactionService = new TransactionServices();
const jwt = require('jsonwebtoken');


const buyGame = async (req, res) => {
    //console.log(token)
    /*const decodedToken = jwt.verify(req.headers.tokenauth, 'secret');
    console.log("token decodificado:")
    console.log(decodedToken)*/
    if(req.query.receiverId === req.token.id){
        return res.status(401).json({message: "No necesitas comprarte a vos mismo!"});
    }
    try {
        const successTransac = await transactionService.buyGame(req.token.id, req.query.receiverId, req.query.gameId);
                                                            //ACORDARSE DE CAMBIAR A REQ.TOKEN.SENDERID
        if(successTransac){
            res.status(200).json({message: 'Transaccion realizada', data: successTransac});

        }else{
            res.status(400).json({message: "No se pudo realizar la transaccion."})
        }

        
    } catch (error) {
        res.status(500).send({message: error.message});
    }


}

/*const generateTransaction = async (req, res) => {

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



}*/

const addFunds = async (req, res) => {
    try {
        if(req.body.amount > 0){
            const response = await transactionService.addFunds(req.token.id, req.body.amount);
            res.status(200).json({message: 'Fondos agregados', data: response});
        }else res.status(401).json({message: "No se puede agregar fondos negativos!"});
    } catch (error) {
        res.status(500).send({message: error.message});
    }

}

module.exports = {buyGame, addFunds};