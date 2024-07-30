const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function generateToken(user, role){
    let token = jwt.sign({ id: user.id, username: user.username, role: role}, JWT_SECRET, {expiresIn: '1h'});
    console.log("ACA ESTA EL TOKEN CHETO: ")
    console.log(token);
    return token;
}

const verifyProvider = (req, res, next) => {
    
    const token = req.headers.tokenauth;
    console.log("token de header verifyProv: "+token)
    console.log("token de header decodificado verifyProv: "+jwt.decode(token, JWT_SECRET))
    if(!token){
        console.log("HOLA1")
        return res.status(403).json({message: "NO HAY TOKEN, NO AUTORIZADO"})
    }
    try {
        console.log("OPA ME METI EN EL TRY")
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
    console.log("req.headers")
    console.log(req.headers)
    console.log("req.headers.tokenauth")
    console.log(req.headers.tokenauth)
    const token = req.headers.tokenauth;
    console.log("token de header verifyCust: " + token);

    if (!token) {
        console.log("Token is missing from headers.");
        return res.status(403).json({ message: "NO AUTORIZADO" });
    }

    try {
        console.log("OPA ME METI EN EL TRY");
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("token de header decodificado verifyCust: " + JSON.stringify(decoded));

        if (decoded.role === 'customer') {
            req.token = decoded;
            console.log("TOKEN DECODIFICADO EN VERIFY");
            console.log(req.token);
            next();
        } else {
            return res.status(403).json({ message: "Usuario no autorizado." });
        }
    } catch (error) {
        console.error("Error decoding token:", error);
        return res.status(403).json({ message: "Usuario no autorizado." });
    }
};

module.exports = verifyCustomer;
const verifyAny = (req, res, next) => {
    const token = req.headers.tokenauth;
    console.log("token de header verifyAny: "+token)
    console.log("token de header decodificado verifyAny: "+jwt.decode(token, JWT_SECRET))
    
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

module.exports = {generateToken, verifyCustomer, verifyProvider, verifyAny};