const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret';

function generateToken(user, role){
    return jwt.sign({ id: user.id, email: user.email, role: role}, JWT_SECRET, {expiresIn: '1h'});
}

module.expports = {generateToken};