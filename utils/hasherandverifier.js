const argon2 = require('argon2');


async function hashPassword(password){
    try{
        const hash = await argon2.hash('password');
        return hash;
    }catch(error){
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