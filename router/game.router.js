const express = require('express')
const router = express.Router()
const gameController = require('../controller/game.controller')
const provider = require ("../router/provider.router.js")

router
    .get('/search', gameController.getGamesByPage)
    .get('/game/:name', gameController.gameScreen)    
    .get('/home', gameController.getHomePage)


    router.use(provider);

module.exports = router;
