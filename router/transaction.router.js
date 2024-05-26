const express = require('express')
const router = express.Router()
const transactionController = require('../controller/transaction.controller')

router
    .post("/transaction", transactionController.generateTransaction);
    

module.exports = router;