const express = require('express')
const router = express.Router()

const providerController = require('../controller/provider.controller')

router
    .post(providerController.createGame)
    .get(providerController.getProviderGames)

module.exports = router;