const express = require('express')
const router = express.Router()
const transactionController = require('../controller/transaction.controller')

console.log("god")

router
    .post(transactionController.generateTransaction);
    

module.exports = router;