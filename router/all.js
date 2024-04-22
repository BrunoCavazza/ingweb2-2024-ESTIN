var express = require('express');
var router = express.Router();
const authServices = require('../services/authServices');

router.post('/login', function (req, res, next) {
    try {
        console.log('req:',req.body)
        const {username, password } = req.body
        const user = authServices.login(username, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


module.exports = router;