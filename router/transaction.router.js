const express = require('express')
const router = express.Router()
const transactionController = require('../controller/transaction.controller')

console.log("god")

router
    .post('/buyGame', transactionController.buyGame)
    .put('/addFunds', transactionController.addFunds)

module.exports = router;