const express = require('express')
const router = express.Router()
const loginController = require('../controller/login.controller')

router
    .post(loginController.authentication);
    

module.exports = router;

