const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function generateToken(user, role){
    let token = jwt.sign({ id: user.id, username: user.username, role: role}, JWT_SECRET, {expiresIn: '1h'});
    console.log("ACA ESTA EL TOKEN CHETO: ")
    console.log(token);
    return token;
}

const verifyProvider = (req, res, next) => {
    const token = req.headers.tokenAuth;
    console.log("token de header verifyProv: "+token)
    console.log("token de header decodificado verifyProv: "+jwt.decode(token, JWT_SECRET))
    if(!token){
        return res.status(403).json({message: "NO AUTORIZADO"})
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.role === 'provider'){
            req.token = decoded;
            console.log("TOKEN DECODIFICADO EN VERIFY")
            console.log(req.token)
            next();
        }else{
            return res.status(403).json({message: "Usuario no autorizado."})
        }

    } catch (error) {
        return res.status(403).json({message: "Usuario no autorizado."})

    }
}

const verifyCustomer = (req, res, next) => {
    const token = req.headers.tokenAuth;
    console.log("token de header verifyCust: "+token)
    console.log("token de header decodificado verifyCust: "+jwt.decode(token, JWT_SECRET))
    
    if(!token){
        return res.status(403).json({message: "NO AUTORIZADO"})
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(decoded.role === 'customer'){
            req.token = decoded;
            console.log("TOKEN DECODIFICADO EN VERIFY")
            console.log(req.token)
            next();
        }else{
            return res.status(403).json({message: "Usuario no autorizado."})
        }

    } catch (error) {
        return res.status(403).json({message: "Usuario no autorizado."})

    }
}

module.exports = {generateToken, verifyCustomer, verifyProvider};