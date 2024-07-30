const express = require('express')
const router = express.Router()
const customerController = require('../controller/customer.controller')

router
    .get("/myLibrary", customerController.getCustomerLibrary)

module.exports = router;