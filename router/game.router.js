const express = require('express')
const router = express.Router()
const gameController = require('../controller/game.controller')
const verifyToken = require("../utils/verifyToken.middleware.js");
const provider = require ("../router/provider.router.js")

router
    .get('/', gameController.getGamesByPage)
    .get('/:id', gameController.gameScreen)
    .delete(gameController.deleteGame)

router.use(verifyToken.verifyProvider, provider);

module.exports = router;
    