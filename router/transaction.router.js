const express = require('express')
const router = express.Router()
const transactionController = require('../controller/transaction.controller')


router
    .post('/buyGame', transactionController.buyGame)
    .put('/addFunds', transactionController.addFunds)

module.exports = router;