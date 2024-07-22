const express = require('express')
const router = express.Router()
const wishlistController = require('../controller/wishlist.controller')

router
    .get('/myWishlist', wishlistController.getWishlist)


module.exports = router;