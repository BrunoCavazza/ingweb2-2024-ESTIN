const express = require('express')
const router = express.Router()
const transactionController = require('../controller/transaction.controller')


router
    .post('/buyGame', transactionController.buyGame)
    .put('/addFunds', transactionController.addFunds)
    .delete('/refundGame', transactionController.refundGame)

module.exports = router;