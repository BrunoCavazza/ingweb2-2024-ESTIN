const express = require('express')
const router = express.Router()
const loginController = require('../controller/login.controller')

router
    .get("/login", loginController.authentication);
    

module.exports = router;

