var express = require('express');
var router = express.Router();
const usersServices = require('../services/usersServices');

router.get('/user/:id', function (req, res, next) {
    try {
        const {id}= req.params
        const user = usersServices.getUserById(id);
    
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;