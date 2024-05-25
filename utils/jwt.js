const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret';

function generateToken(user, role){
    return jwt.sign({ id: user.id, username: user.username, role: role}, JWT_SECRET, {expiresIn: '1h'});
}

module.expports = {generateToken};