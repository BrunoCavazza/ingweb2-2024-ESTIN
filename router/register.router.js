const express = require('express')
const router = express.Router()
const registerController = require('../controller/register.controller')

router
    .post("/register", registerController.accountCreation);
    

module.exports = router;

