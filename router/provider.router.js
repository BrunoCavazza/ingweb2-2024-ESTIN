const express = require('express')
const router = express.Router()

const providerController = require('../controller/provider.controller')

router
    .post(providerController.createGame)
    .get('/getGames',providerController.getProviderGames)
    .delete('/deleteGame',providerController.deleteGame)
    .post('/updateGame',providerController.updateGame)    

module.exports = router;