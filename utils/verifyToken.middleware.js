const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret';

function generateToken(user, role){
    return jwt.sign({ id: user.id, username: user.username, role: role}, JWT_SECRET, {expiresIn: '1h'});
}

const verifyProvider = (req, res, next) => {
    const token = req.headers.tokenAuth;
    if(!token){
        return res.status(403).json({message: "NO AUTORIZADO"})
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.role === 'provider'){
            req.token = decoded;
            next();
        }else{
            return res.status(403).json({message: "Usuario no autorizado."})
        }

    } catch (error) {
        
    }
}

const verifyCustomer = (req, res, next) => {
    const token = req.headers.tokenAuth;
    if(!token){
        return res.status(403).json({message: "NO AUTORIZADO"})
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.role === 'customer'){
            req.token = decoded;
            next();
        }else{
            return res.status(403).json({message: "Usuario no autorizado."})
        }

    } catch (error) {
        
    }
}

module.exports = {generateToken, verifyCustomer, verifyProvider};