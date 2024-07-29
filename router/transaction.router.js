const express = require('express')
const router = express.Router()
const transactionController = require('../controller/transaction.controller');
const verifyToken = require("../utils/verifyToken.middleware.js");


router
    .post('/buyGame',verifyToken.verifyCustomer, transactionController.buyGame)
    .put('/addFunds', transactionController.addFunds)
    .delete('/refundGame', transactionController.refundGame)

module.exports = router;