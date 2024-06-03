const argon2 = require('argon2');



async function hashPassword(password){
    console.log("ACA ESTAS DENTRO DEL ARGON2 FACHERO")
    try{
        const hash = await argon2.hash(password);
        console.log("HOLA MIRA ACA : "+hash)
        console.log("Y AHORA ESTE: "+hash.toString())
        return hash.toString();
    }catch(error){
        console.log("ERROR DE ARGON: "+ error)
        return null;
    }

}

async function verifyPassword(hash, password){
    try{
        const validate = await argon2.verify(hash, password);
        return validate;
    } catch(error){
        //return false;
    }
}

module.exports = {hashPassword, verifyPassword};