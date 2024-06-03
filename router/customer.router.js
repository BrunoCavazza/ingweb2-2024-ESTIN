const express = require('express')
const router = express.Router()
const customerController = require('../controller/customer.controller')

router
    .get('/:username', customerController.getCustomerLibrary)

module.exports = router;