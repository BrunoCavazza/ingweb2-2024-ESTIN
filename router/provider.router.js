const express = require('express')
const router = express.Router()
const verifyToken = require("../utils/verifyToken.middleware.js");

const providerController = require('../controller/provider.controller')

router
    .post('/createGame', verifyToken.verifyProvider, providerController.createGame )
    .get('/getGames',providerController.getProviderGames)
    .delete('/deleteGame',providerController.deleteGame)
    .post('/updateGame',providerController.updateGame)    

module.exports = router;